class MyPromise {
  constructor(func) {
    this.data = null;
    this.reason = null;
    this.status = "pending";

    this.resolveArr = [];
    this.rejectArr = [];

    const resolve = (val) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.data = val;
        this.resolveArr.forEach((fn) => fn(val));
      }
    };

    const reject = (val) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = val;
        this.rejectArr.forEach((fn) => fn(val));
      }
    };

    try {
      func(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(resolveOfThen, rejectOfThen) {
    const promise2 = new MyPromise((resolve2, reject2) => {
      const resolveFunc = (v) => {
        // resolveOfThen将在第一个MyPromise实例resolve后执行
        // 也就是在resolveArr.forEach的时候执行
        if (typeof resolveOfThen !== "function") {
          resolve2(v);
        }
        let x = resolveOfThen(v);
        // 以下代码将promise1和promise2关联起来,决定两者的执行顺序
        if (x instanceof MyPromise) {
          // promise1获得控制权, p1.then后让promise2执行
          x.then(resolve2, reject2);
        } else {
          // p1只返回了一个值, 没有请求执行权, x就是p1的执行结果, 所以接下来就是p2执行
          resolve2(x);
        }
      };

      const rejectFunc = (v) => {
        if (typeof rejectOfThen !== "function") {
          reject2(v);
        }

        let x = rejectOfThen(v);
        if (x instanceof MyPromise) {
          x.then(resolve2, reject2);
        } else {
          resolve2(x);
          // reject2(x);
        }
      };

      if (this.status === "pending") {
        this.resolveArr.push(resolveFunc);
        this.rejectArr.push(rejectFunc);
      } else if (this.status === "fulfilled") {
        resolveFunc(this.data);
      } else if (this.status === "rejected") {
        rejectFunc(this.reason);
      }
    });

    return promise2;
  }

  catch(catchCallBack) {
    this.then(undefined, catchCallBack);
  }

  static all(arr) {
    let cnt = 0;
  }
  static race(arr) {}
}

const log = console.log.bind(console);

function main() {
  function test1() {
    console.time("p1");
    let p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        log(1);
        resolve(1);
      }, 1000);
    })
      .then((v) => {
        log(v + 1);
        return v + 1;
      })
      .then((v) => {
        log(v + 1);
        console.timeEnd("p1");
        return v + 1;
      });
  }

  function test2() {
    let p2 = new MyPromise((resolve, reject) => {
      log(100);
      // resolve(100);
      reject(100);
    })
      .then((v) => {
        log(v + 1);
        return v + 1;
      })
      .then((v) => {
        log(v + 1);
        return v + 1;
      })
      .catch((e) => {
        log("error", e);
      });
  }

  function test3() {
    console.time("p3");
    let p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        log(1000);
        resolve(1000);
      }, 1000);
    })
      .then((v) => {
        return new MyPromise((resolve) => {
          setTimeout(() => {
            log(v + 1);
            resolve(v + 1);
          }, 1000);
        });
      })
      .then((v) => {
        log(v + 1);
        console.timeEnd("p3");
        return v + 1;
      });
  }

  test2();
}

main();
