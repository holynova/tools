// 1. new Promise
// 2  then()
// catch
// finally
// race
// all

const log = console.log.bind(console);
const createMacroTask = (func) => {
  setTimeout(() => {
    func;
  }, 0);
};
class MyPromise {
  constructor(func) {
    this.data = null;
    this.reason = null;
    this.queue = [];

    const resolve = (data) => {
      // createMacroTask(() => {
      //   this.data = data;
      //   this.queue.forEach((f) => f(data));
      // });
      // 连续的then都是微任务, 当所有微任务都完成后, 启动一个延时为0 setTimeout的宏任务
      setTimeout(() => {
        this.data = data;
        this.queue.forEach((f) => f(data));
      }, 0);
    };

    const reject = (reason) => {
      setTimeout(() => {
        this.reason = reason;
        // ??
      }, 0);
    };
    func(resolve, reject);
    // this
    // resolve, reject;
  }
  then(resolve, reject) {
    return new MyPromise((resolveFunc, rejectFunc) => {
      this.queue.push((data) => {
        let res = resolve(this.data);
        if (res instanceof MyPromise) {
          res.then(resolveFunc);
        } else {
          resolveFunc(res);
        }
      });
    });
  }
}

function main() {
  // let p = new MyPromise((resolve, reject) => {
  //   log(1);
  //   setTimeout(() => {
  //     log(2);
  //     resolve(2);
  //   }, 500);
  // }).then((rs) => {
  //   setTimeout(() => {
  //     rs(3);
  //   }, 500);
  // });

  let p2 = new MyPromise((rs) => {
    log(11);
    setTimeout(() => {
      log(22);
      rs(22);
    }, 1000);
  }).then((data) => {
    return new MyPromise(() => {
      setTimeout(() => {
        let newData = data + 11;
        log(newData);
        return newData;
      }, 1000);
    });
  });
}

main();
