const DOMNodeCollection = require("./dom_node_collection.js");

const eventQue = [];

window.$l = function(arg) {
  let array = [];


  if (arg instanceof HTMLElement) {
    array.push(arg);
  } else if (typeof arg === "function") {
    eventQue.push(arg);
  } else {
    let docObj = document.querySelectorAll(arg);

    for(let prop in Object.keys(docObj)) {
      array.push(docObj[prop]);
    }
  }


  return new DOMNodeCollection(array);
};


$l.extend = function(...args) {
  return Object.assign(...args);
};

$l.ajax = function(object) {

 return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const defaults = {data: {}};

    defaults.success = function(returnData) {
      console.log("Success");
      console.log(returnData);
    };

    defaults.error = function(returnData) {
      console.log("Error");
      console.log(returnData);
    };

    const data = Object.assign({}, defaults, object);

    xhr.open(data.type, data.url);

    xhr.onload = () => {
    const returnData = JSON.parse(xhr.response);
      if(xhr.status === 200) {
        resolve(returnData);
        data.success(returnData);
      } else {
        reject(returnData);
        data.error(returnData);
      }
    };
      xhr.send(data.data);
  });
};


document.addEventListener("DOMContentLoaded", () => {
  eventQue.forEach((callback) => {
    callback();
  });
});
