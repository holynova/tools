const { log } = require("../utils/debug");

function debounce(func, time = 100) {
  let timer = null;
  return function (...args) {
    let that = this;
    clearTimeout(timer);
    setTimeout(function () {
      func.apply(that, args);
    }, time);
  };
}
function debounce2(func, time = 100) {
  let timer = null;
  // 这里如果用箭头函数, 执行环境就永远丢掉了
  return function (...args) {
    clearTimeout(timer);
    setTimeout(() => {
      // this会继承, 不改变
      // 这里如果用 func(...args), this也丢掉了
      func.apply(this, args);
    }, time);
  };
}

function throttle(func, time = 100) {
  let canRun = true;
  return function (...args) {
    let that = this;
    if (canRun) {
      canRun = false;
      let timer = setTimeout(() => {
        canRun = true;
        func.apply(that, args);
      }, time);
    }
  };
}

function delaySum(a, b, cb) {
  // setTimeout(() => {
  //   cb(a + b);
  // }, 1000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

function testDebounce() {
  // delaySum(1, 2).then(log);
  // log(this);
  function myLog() {
    console.log("myLog", this);
  }
  let debounceLog = debounce(myLog);

  let o = {
    fun: debounce(myLog),
  };
  // debounceLog();
  o.fun();
}
main();
