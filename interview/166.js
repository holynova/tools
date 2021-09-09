const { log } = require("../utils/debug");

var foo1 = function (...args) {
  let func = (...moreArgs) => {
    return foo(...args, ...moreArgs);
  };

  func.getValue = () => {
    let v = args.reduce((p, c) => p + c, 0);
    log(v);
    return v;
  };
  return func;
};

function foo(...args) {
  let sum = args.reduce((p, c) => p + c, 0);

  let func = (...moreArgs) => {
    sum += moreArgs.reduce((p, c) => p + c, 0);
    return func;
  };

  func.getValue = () => {
    log(sum);
    return sum;
  };
  return func;
}

var f1 = foo(1, 2, 3);
f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2, 3);
f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4);
f3.getValue(); // 10
