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
