const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(arg) {
  const onLoadFunctions = [];
  let array = [];


  if (arg instanceof HTMLElement) {
    array.push(arg);
  } else if (typeof arg === "function") {
    onLoadFunctions.push(arg);
    // array.push(document);
  } else {
    let docObj = document.querySelectorAll(arg);

    for(let prop in Object.keys(docObj)) {
      array.push(docObj[prop]);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    onLoadFunctions.forEach((callback) => {
      callback();
    });
  });

  return new DOMNodeCollection(array);
};

// window.$l = l;

$l.extend = function(...args) {
  return Object.assign(...args);
};

// //this is really close but I need to use the resolve or the reject, keep playing around with it.
// $l.ajax = function(object) {
//   return new Promise((resolve, reject) => {
//     const defaults = {data: {}};
//     const xhr = new XMLHttpRequest();
//
//     defaults.success = function(returnData) {
//       console.log("Success");
//       console.log(returnData);
//     };
//
//     defaults.error = function(returnData) {
//       console.log("Error");
//       console.log(returnData);
//     };
//
//     const data = Object.assign({}, defaults, object);
//     xhr.open(data.type, data.url);
//
//
//     xhr.onload = () => {
//       const returnData = JSON.parse(xhr.response);
//
//         if(xhr.status === 200) {
//           data.success(returnData);
//         } else {
//           data.error(returnData);
//         }
//       };
//       xhr.send(data.data);
//   });
// };

// $l.ajax = function(object) {
//   return new Promise((resolve, reject) => {
//     const defaults = {data: {}};
//     const xhr = new XMLHttpRequest();
//
//     defaults.success = function(returnData) {
//       console.log("Success");
//       console.log(returnData);
//     };
//
//     defaults.error = function(returnData) {
//       console.log("Error");
//       console.log(returnData);
//     };
//
//     const data = Object.assign({}, defaults, object);
//     xhr.open(data.type, data.url);
//
//
//     xhr.onload = () => {
//       const returnData = JSON.parse(xhr.response);
//
//         if(xhr.status === 200) {
//           data.success(returnData);
//         } else {
//           data.error(returnData);
//         }
//       };
//       xhr.send(data.data);
//   });
// };

$l.ajax = function(object) {
  const defaults = {data: {}};
  const xhr = new XMLHttpRequest();

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
  xhr.onload = function() {
    const returnData = JSON.parse(xhr.response);
    if(xhr.status === 200) {
      data.success(returnData);
    } else {
      data.error(returnData);
    }
  };

  xhr.send(data.data);
};
//
// $l.ajax = function(object) {
//   const xhr = new XMLHttpRequest();
//   xhr.open(object.type, object.url);
//
//   const successCallback = function(data) {
//     console.log("Success");
//     console.log(data);
//   };
//
//   const errorCallback = function(data) {
//     console.log("Error");
//     console.log(data);
//   };
//
//   xhr.onload = function () {
//     if (xhr.status === 200) {
//       successCallback(xhr.response);
//     } else {
//       errorCallback(xhr.response);
//     }
//   };
//
//   const optionalData = object.data || {};
//   xhr.send(optionalData);
// };

//
// $.ajax({
//   type: "POST",
//   url:
//   data:
// })
