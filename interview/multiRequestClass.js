// JS实现一个带并发限制的异步调度器Scheduler，
// 保证同时运行的任务最多有两个。
// 完善代码中Scheduler类，
// 使得以下程序能正确输出

class Scheduler {
  constructor() {
    this.count = 2;

    this.queue = [];
    this.run = [];

    this.i = 0;
  }

  makeTask() {
    // return new Promise((resolve) => {
    let that = this;
    if (this.i >= this.queue.length) {
      // 结束了
      // return (
      //   Promise.all(this.run)
      //     // .then((res) => resolve(res))
      //     .then(console.log)
      // );
    } else {
      let func = this.queue[this.i];
      this.i += 1;
      let p = func()
        .then((res) => {
          that.makeTask();
          return res;
        })
        .then(console.log);
      // this.run.push(p);
      return p;
    }
  }

  add(taskFunc) {
    // task 是个函数, 返回promise
    let id = this.i;
    this.queue.push(taskFunc);
    while (this.i < this.count && this.i < this.queue.length) {
      this.run.push(this.makeTask(taskFunc));
    }
    return this.run[id];
  }
}

const timeout = (time) => {
  console.log(">开始", time);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(">>>结束", time);
      resolve();
    }, time);
  });
};

const timeout2 = (time, data) => {
  console.log(">开始", data);

  return new Promise((rs) => {
    setTimeout(() => {
      // console.log(">>>结束", data);
      rs(data);
    }, time);
  });
};

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
  // scheduler.add(() => timeout2(time, order));
  // .then(() => console.log(order));
};

function test() {
  addTask(1000, "1");
  addTask(500, "2");
  addTask(300, "3");
  addTask(400, "4");

  // output: 2 3 1 4
}

test();

// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
