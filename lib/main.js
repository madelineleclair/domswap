const DOMNodeCollection = require("./dom_node_collection.js");

const l = function(arg) {

  let array = [];

    if (arg instanceof HTMLElement) {
      array.push(arg);
    } else if (typeof arg === "function") { 

    } else {
      let docObj = document.querySelectorAll(arg);

      for(let prop in Object.keys(docObj)) {
        array.push(docObj[prop]);
      }
    }

  return new DOMNodeCollection(array);

};

window.$l = l;
