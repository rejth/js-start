'use strict';

class First {
  constructor() {
    this.parentMessage = 'Привет я метод родителя!';
  }

  hello() {
    console.log(this.parentMessage);
  }
}

class Second extends First {
  constructor() {
    super();
    this.childMessage = 'А я наследуемый метод!';
  }

  hello() {
    super.hello();
    console.log(this.childMessage);
  }
}

const obj = new Second();
obj.hello();