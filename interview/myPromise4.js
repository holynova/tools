class MyPromise {
  fulfilledStack = [];
  rejectedStack = [];

  constructor(fn) {
    const resolve = (value) => {
      for (const cb of this.fulfilledStack) {
        cb(value);
      }
    };
    const reject = (reason) => {
      for (const cb of this.rejectedStack) {
        cb(reason);
      }
    };
    fn(resolve, reject);
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      const resCb = (v) => {
        resolve(onfulfilled(v));
      };
      this.fulfilledStack.push(resCb);

      const rejCb = (r) => {
        reject(onrejected(r));
      };
      this.rejectedStack.push(rejCb);
    });
  }
}

const p0 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const p1 = p0.then((v) => {
  // cb1
  console.log(v);
  return 2;
});
const p2 = p1.then((v) => {
  // cb2
  console.log(v);
  return 3;
});
const p3 = p2.then((v) => {
  // cb3
  console.log(v);
});
