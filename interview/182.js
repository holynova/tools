const log = console.log.bind(console);
function add(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 100);
}

let sumTwo = (a, b) => {
  return new Promise((resolve) => {
    add(a, b, resolve);
  });
};

function sum(...args) {
  return new Promise((resolve) => {
    let total = args.reduce((prev, cur) => {
      if (prev instanceof Promise) {
        return prev.then((res) => sumTwo(res, cur));
      }
      return sumTwo(prev, cur);
    });
    resolve(total);
  });
}

async function sum2(...args) {
  log(args);
  if (args.length === 1) {
    return args[0];
  }

  let promiseList = [];

  for (let i = 0; i < args.length - 1; i += 2) {
    promiseList.push(sumTwo(args[i], args[i + 1]));
  }

  if (args.length % 2 !== 0) {
    promiseList.push(args[args.length - 1]);
  }

  let resList = await Promise.all(promiseList);
  return sum2(...resList);
}

async function test() {
  console.time("耗时");
  let arr = new Array(10).fill(0).map((x, index) => {
    return 10 ** index;
  });
  let res = await sum2(...arr);
  console.log("final", res);
  console.timeEnd("耗时");
}

async function test2() {
  // console.log(this.name);
  console.time("耗时2");
  let arr = new Array(10).fill(0).map((x, index) => {
    return 10 ** index;
  });
  let res = await sum(...arr);
  console.log("final", res);
  console.timeEnd("耗时2");
}

test();
test2();
