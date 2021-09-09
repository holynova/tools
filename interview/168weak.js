const { log } = require("../utils/debug");

function test() {
  let o1 = { a: 1 };
  let o2 = { a: 1 };
  let wm = new WeakMap();
  wm.set(o1, "one");
  wm.set(o2, "two");
  // for (let x of wm) {
  //   log(x);
  // }
  log(wm.get(o1));
  log(wm.get(o2));
  log(wm.get({ a: 1 }));
}

function test2() {
  var a = { foo: "bar" };
  var map = new WeakMap();
  // var map = new Map();
  map.set(a, "三分钟学前端");

  a = null;
  console.log(map.keys()); // MapIterator {{}}
  console.log(map.values()); // MapIterator {"三分钟学前端"}
}

test2();
