/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.elements = htmlElements;
  }

  html(string) {
    if(string) {
      this.elements.forEach((element) => {
        element.innerHTML += string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
    return this;
  }

  val(argument) {
    if(argument === undefined) {
      return this.elements[0].value;
    }
    else if (argument instanceof Array) {
      this.elements.forEach((element) => {
        if(argument.includes(element.value)) {
          element.checked = true;
        }
      });
    } else if (!(argument instanceof Function)) {
      this.elements.forEach((element) => {
        element.value = argument;
      });
    }
    return this;
  }

  empty() {
    this.elements.forEach((element) => {
      element.innerHTML = "";
    });
    return this;
  }

  append(input) {

    if(input instanceof DOMNodeCollection) {
      this.elements.forEach((el) => {
        input.elements.forEach((inputEl) => {
          el.innerHTML += inputEl.outerHTML;
        });
      });
    } else if(input instanceof HTMLElement) {
      this.elements.forEach((el) => {
        el.innerHTML += input.outerHTML;
      });
    } else {
      this.elements.forEach((el) => {
        el.innerHTML += input;
      });
    }
    return this;
  }

  attr(name, value) {

    for(let i =0; i < this.elements.length; i++) {
      let attributes = this.elements[i].attributes;
      for(let j = 0; j < attributes.length; j++) {
        if (attributes[j].name === name) {
          if(value) {
            attributes[j].value = value;
          } else {
            return attributes[j].value;
          }
        }
      }
    }
    if (value) {
      return this;
    }
  }

  hasClass(className) {
    return this.elements[0].classList.contains(className);
  }

  addClass(newClass) {

    this.elements.forEach((el) => {
      el.classList.add(newClass);
    });

    return this;
  }

  removeClass(newClass) {
    this.elements.forEach((el) => {
      el.classList.remove(newClass);
    });

    return this;
  }

  children() {

    const allChildren = [];

    this.elements.forEach((el) => {
      let children = el.children;
      let childrenArray = Array.from(children);
      childrenArray.forEach((child) => {
        allChildren.push(child);
      });
    });
    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];

    this.elements.forEach((el) => {
      let parent = el.parentNode;
      if(!allParents.includes(parent)) {
        allParents.push(parent);
      }

    });
    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    const possibleTargets = this.children();
    if (possibleTargets.elements.length === 0 ) {
      return [];
    }

    let allChildren = [];
    possibleTargets.elements.forEach((el) => {
      if(el.tagName === selector.toUpperCase()) {
        allChildren.push(el);
      }

      allChildren = allChildren.concat($l(el).find(selector));
    });

    return allChildren;
  }

  remove() {
    this.elements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
    return this;
  }

  on(action, callback) {

    this.elements.forEach((el) => {
      el.addEventListener(action, callback);
    });
    this.events = {};
    Object.defineProperty(this.events, action, {value: callback});
    return this;
  }

  off(action) {
    let callback = this.events[action];
    this.elements.forEach((el) => {
      el.removeEventListener(action, callback);
    });
    return this;
  }
}

module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

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


/***/ })
/******/ ]);