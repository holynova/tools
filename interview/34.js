// // var name = "Tom";
// // (function () {
// //   if (typeof name == "undefined") {
// //     var name = "Jack";
// //     console.log("Goodbye " + name);
// //   } else {
// //     console.log("Hello " + name);
// //   }
// // })();

const { log } = require("../utils/debug");

// // // 相当于

// // var name = "Tom";
// // (function () {
// //   var name;
// //   if (typeof name == "undefined") {
// //     name = "Jack";
// //     console.log("Goodbye " + name);
// //   } else {
// //     console.log("Hello " + name);
// //   }
// // })();
// // console.time("t");
// // for (let i = 0; i < 100; i++) {
// //   for (let j = 0; j < 1000; j++) {
// //     for (let k = 0; k < 10000; k++) {}
// //   }
// // }
// // console.timeEnd("t");
// let i, j, k;
// var t1 = new Date().getTime();
// for (i = 0; i < 100; i++) {
//   for (j = 0; j < 1000; j++) {
//     for (k = 0; k < 10000; k++) {}
//   }
// }
// var t2 = new Date().getTime();
// console.log("first time", t2 - t1);

// for (i = 0; i < 10000; i++) {
//   for (j = 0; j < 1000; j++) {
//     for (k = 0; k < 100; k++) {}
//   }
// }
// var t3 = new Date().getTime();
// console.log("two time", t3 - t2);

function delay(data, time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      log(data);
      resolve(data);
    }, time);
  });
}

async function main() {
  // 1秒后几乎同时输出
  delay(1);
  delay(2);
  delay(3);

  // 间隔1秒输出
  await delay(10);
  await delay(20);
  await delay(30);

  // 1秒后几乎同时输出
  let x = delay(100);
  let y = delay(200);
  let z = delay(300);

  await x;
  await y;
  await z;
}

// main();
// function add(x) {
//   let sum = 0;
//   return (n) => {
//     return sum + n;
//   };
// }

// let res = 0;
// function add(x) {
//   res += x;
//   return res;
// }

// log(add(add(5)));

// log(add()(5));
// log(add()(4));

function inc(x) {
  return x + 1;
}
function double(x) {
  return x * 2;
}
function square(x) {
  return x * x;
}

log(square(double(inc(2))));
log(square(double(inc(3))));

function compose(...args) {
  return (x) => {
    return args.reduce((prev, cur) => {
      return cur(prev);
    }, x);
  };
}

log(compose(inc, double, square)(2));
log(compose(inc, double, square)(3));
