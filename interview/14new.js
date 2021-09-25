function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    console.log({ name: this.name, age: this.age });
  };
  return this;
}

function myNew(func, ...args) {
  let obj = Object.create(func.prototype);
  let res = func.call(obj, ...args);
  if (res instanceof Object) {
    return res;
  }
  return obj;
}

function test() {
  let p = myNew(Person, "sang", 18);
  console.log(p instanceof Person);
  console.dir(p);
  p.sayHi();
}

function myBind(func, thisArg) {
  return function (...args) {
    return func.call(thisArg, ...args);
  };
}

Function.prototype.myBind = function (thisArg) {
  let that = this;
  return function (...args) {
    return that.call(thisArg, ...args);
  };
};

Function.prototype.myCall = function (thisArg, ...args) {
  thisArg.func = this;
  let res = thisArg.func(...args);
  delete thisArg.func;
  return res;
};

// function myCall(func, thisArg, ...args) {
//   thisArg.sym = func;
//   let res = thisArg.sym(...args);
//   delete thisArg.sym;
//   return res;
// }
