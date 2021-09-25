let o = { a: 1, b: 2 };
let o2 = { a: 1, b: 2 };
const log = console.log.bind(console);

Object.defineProperty(o, "a", {
  get: () => {
    log("get", this.v);
    return this.v;
  },
  set: (newValue) => {
    log("set", this.v, newValue);
    this.v = newValue;
  },
});
// Object.defineProperties(o);

// o.a;
// o.a = 999;
// o.a;
// o.a = 10000;
// o.a;

let o2 = { a: 1, b: 2 };

let p = new Proxy(o2, {
  get(target, prop) {
    if (prop in target) {
      log("get", target[prop]);
      return target[prop];
    } else {
      log("get", undefined);
      return undefined;
    }
  },

  set(target, prop, newValue) {
    log("set", { newValue });
    target[prop] = newValue;
  },
});

p.a;
p.a = 999;
p.a;
p.a = 10000;
p.a;
p.c;
p.c = 123;
p.c;
