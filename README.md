# Domswap

Domswap is a lightweight implementation of jQuery. It allows to access and modify HTML elements in the browser using JavaScript. For a given argument, the library returns an instance of the DOMNodeCollection class. The DOMNodeCollection can contain a single element or multiple elements. It also has multiple features defined on it to manipulate the HTML elements in the collection.

A few features include:
  * Adding class names to elements
  ```js
  addClass(newClass) {
    this.elements.forEach((el) => {
      el.classList.add(newClass);
    });
    return this;
  }
  ```
  * Removing elements
  ```js
  remove() {
    this.elements.forEach((el) => {
      el.parentNode.removeChild(el);
    });
    return this;
  }
  ```

  * Sending Ajax requests
  ```js
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
  ```
