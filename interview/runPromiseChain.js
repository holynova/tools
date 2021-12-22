function delay(data = 0, ms = 300) {
  console.time("delay");
  return new Promise((resolve) => {
    setTimeout(() => {
      log(data);
      console.timeEnd("delay");
      resolve(data + 10);
    }, ms);
  });
}

function between(min = 0, max = 100) {
  // return min + Math.random() * (max - min)
  return min + Math.floor(Math.random() * (max - min));
}

const log = console.log.bind(console);

async function run3(funcList = []) {
  let res = 5;

  for (let i = 0; i < funcList.length; i++) {
    res = await funcList[i](res);
  }
}

async function run2(funcList = []) {
  let res = 8;
  for (let f of funcList) {
    res = await f(res);
  }
}

function run(funcList = []) {
  funcList.reduce((prev, cur) => {
    return prev.then((res) => {
      return cur(res);
    });
  }, Promise.resolve(9));
}

function main() {
  let funcList = new Array(20).fill(0).map((x, index) => {
    return (res) => delay(res, between(10, 30));
  });
  run3(funcList);
}
main();
