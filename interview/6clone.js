// function isObject(data) {
//   return typeof data === "object";
// }

// function isDate(data) {
//   return data instanceof Date;
// }

// function isArray(data) {
//   return Array.isArray(data);
// }

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

let map = new Map();
function deepClone(data) {
  if (map.has(data)) {
    console.log("发现循环引用 key = ", data);
    return map.get(data);
  }

  let type = getType(data);
  let clone = null;

  if (type === "Array") {
    clone = [];
    map.set(data, clone);
    clone = data.map((x) => deepClone(x));
  } else if (type === "Object") {
    clone = {};
    map.set(data, clone);
    Object.keys(data).forEach((k) => {
      clone[k] = deepClone(data[k]);
    });
  } else if (type === "Date") {
    clone = new Date(data);
  } else {
    clone = data;
  }
  return clone;
}

function deepClone2(data) {
  if (map.has(data)) {
    console.log("发现循环引用 key = ", data);
    return map.get(data);
  }

  let type = getType(data);
  let clone = null;
  if (type === "Array" || type === "Object") {
    clone = type === "Array" ? [] : {};
    Object.keys(data).forEach((k) => {
      clone[k] = deepClone(data[k]);
    });
  } else if (type === "Date") {
    clone = new Date(data);
  } else {
    clone = data;
  }
  map.set(data, clone);
  return clone;
}

function deepCloneBfs(data) {}

function test() {
  let res = [
    [1, [2, 3, { AA: 4, bb: { cc: 1 } }]],
    1,
    "a",
    new Date(),
    [1, 23],
    { a: 1 },
    null,
    undefined,
    new Map(),
  ];

  // console.log(res);
  // let a = res.reduce((pre, cur, index) => {
  //   return { ...pre, [`key${index}`]: cur };
  // }, {});

  let a = { b: 1, c: 2, foo: {} };
  a.foo.bar = a;
  console.log({ a, c: deepClone(a) });
  // console.log(JSON.stringify({ a, c: deepClone(a) }, null, 2));
}
test();
