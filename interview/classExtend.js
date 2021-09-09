// es6

const { log } = require("../utils/debug");

class People {
  constructor(name) {
    this.name = name;
  }
  hi() {
    log(this.name);
  }
}

class Student extends People {
  constructor(name, school) {
    super(name);
    this.school = school;
  }
  hi() {
    log(this.name + this.school);
  }
}

function Cat(name) {
  this.name = name;
}

function myExtends(father) {
  let newClass = function () {};
  newClass.prototype = new father();
  newClass.constructor = newClass;
  return newClass;
}

function StudentCat(name, school) {
  Cat.call(this, name);
  StudentCat.prototype = new Cat();
  StudentCat.constructor = StudentCat;
}
