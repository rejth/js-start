'use strict';

const DomElement = function(name, options) {
  this.selector = name;
  this.height = options.height;
  this.width = options.width;
  this.bg = options.bg;
  this.fontSize = options.fontSize;
};

DomElement.prototype.create = function() {
  if (this.selector.charAt(0) === '.') {

    let newElement = document.createElement("div");
    newElement.classList.add(this.selector.slice(1));
    newElement.innerHTML = '<h1>Это новый div элемент на странице</h1>';

    newElement.style.cssText=`height: ${this.height};
      width: ${this.width};
      background: ${this.bg};
      font-size: ${this.fontSize};
    `;

    document.body.appendChild(newElement);

  } else if (this.selector.charAt(0) === '#') {

    let newElement = document.createElement("p");
    newElement.setAttribute('id', this.selector.slice(1));
    newElement.innerHTML = '<h1>Это новый параграф на странице</h1>';

    newElement.style.cssText=`height: ${this.height};
      width: ${this.width};
      background: ${this.bg};
      font-size: ${this.fontSize};
    `;

    document.body.appendChild(newElement);
  }
};

const element = new DomElement('#block', {height: '48px', width: '600px', bg: 'tomato', fontSize: '16px'});
element.create();