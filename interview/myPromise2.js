const log = console.log.bind(console);

class MyPromise {
  constructor(initFunc) {
    // pending、fulfilled、rejected
    this.status = "pending";
    this.data = null;
    this.reason = null;
    this.resolveArr = [];
    this.rejectArr = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";

        this.data = value;
        this.resolveArr.forEach((func) => {
          func();
        });
      }
    };

    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
      }
    };

    try {
      initFunc(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(resolve2, reject2) {
    // log("then, this", this);
    // if (this.status === "fulfilled") {
    //   resolve2(this.data);
    // } else if (this.status === "rejected") {
    //   reject2(this.reason);
    // }

    return new MyPromise((resolve3, reject3) => {
      if (this.status === "fulfilled") {
        const x = resolve2(this.data);
        if (x instanceof MyPromise) {
          x.then(resolve3);
        } else {
          resolve3(x);
        }

        // this.resolveArr.push(resolve2);
        // resolve2(this.data);
      } else if (this.status === "rejected") {
        this.rejectArr.push(reject2);
        // reject2(this.reason);
      } else if (this.status === "pending") {
      }
      // this.resolveArr.push(resolve2);
    });
  }
}

function test1() {}

function main() {
  let p1 = new MyPromise((resolve1, reject1) => {
    log(1);
    resolve1(1);
  })
    .then((v) => {
      log("then ", v + 1);
      return v + 1;
    })
    .then((v) => {
      log(v + 1);
      return v + 1;
    })
    .then((v) => {
      log(v + 1);
      return v + 1;
    });
}

main();
