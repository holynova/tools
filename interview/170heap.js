const { log } = require("../utils/debug");

function foo() {
  let num = 1; // 创建局部变量 num 和局部函数 bar
  function bar() {
    // bar()是函数内部方法，是一个闭包
    num++;
    console.log(num); // 使用了外部函数声明的变量，内部函数可以访问外部函数的变量
  }
  bar(); // 2
  bar(); // 3
  console.dir(bar);
}

foo();

// log(bar);
