// class LazyManClass {
//   constructor(name) {
//     this.name = name;
//     this.greeting();
//     this.p = Promise.resolve(this);
//   }

//   greeting() {
//     console.log(`Hi I am ${this.name}`);
//     return this;
//   }

//   sleep(time) {
//     this.p = this.p.then(() => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve();
//         }, time);
//       });
//     });
//     return this;
//   }

//   sleepFirst(time) {
//     return this.sleep(time);
//     // return this;
//   }

//   eat(val) {
//     this.p = this.p.then(() => {
//       console.log("I am eating " + val);
//     });
//     return this;
//   }
// }

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("等待了" + time + "秒");
      resolve();
    }, time * 1000);
  });
}

class LazyManClass {
  constructor(name) {
    this.name = name;
    console.log("I am  " + this.name);

    this.queue = [];

    setTimeout(() => {
      this.start();
    }, 0);
  }
  delay(time) {
    // console.log("this", this);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("等待了" + time + "秒");
        resolve();
      }, time * 1000);
    });
  }

  eat(val) {
    this.queue.push(() => {
      console.log("I am eating " + val);
    });
    return this;
  }

  sleep(time) {
    this.queue.push(() => this.delay(time));
    return this;
  }

  sleepFirst(time) {
    this.queue.unshift(() => this.delay(time));
    return this;
  }

  async start() {
    // console.log(this.queue);
    for (let i = 0; i < this.queue.length; i++) {
      await this.queue[i]();
    }
    // for (let cb of this.queue) {
    //   await cb();
    // }
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}

function test() {
  LazyMan("Tony");
  // Hi I am Tony

  LazyMan("Tony").sleep(10).eat("lunch");
  // Hi I am Tony
  // 等待了10秒...
  // I am eating lunch

  LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
  // Hi I am Tony
  // I am eating lunch
  // 等待了10秒...
  // I am eating diner

  LazyMan("Tony")
    .eat("lunch")
    .eat("dinner")
    .sleepFirst(5)
    .sleep(10)
    .eat("junk food");
  // Hi I am Tony
  // 等待了5秒...
  // I am eating lunch
  // I am eating dinner
  // 等待了10秒...
  // I am eating junk food
}

// LazyMan("Tony").sleep(10).eat("lunch");
// LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
