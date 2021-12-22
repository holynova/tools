// all
const log = console.log.bind(console);

Promise.prototype.myFinally = (func) => {
  // return this.then((d) => func()).catch((e) => func());
  return this.then(
    (val) => {
      return Promise.resolve(func()).then(() => val);
    },
    (e) => {
      return Promise.reject(func()).then(() => {
        throw e;
      });
    }
  );
};

Promise.myAllSettled = (arr) => {
  return new Promise((resolve, reject) => {
    let cnt = 0;
    let res = new Array(arr.length).fill(null);
    for (let i = 0; i < arr.length; i++) {
      arr[i]
        .then((data) => {
          cnt++;
          res[i] = {
            status: "resolved",
            data: data,
          };
          if (cnt === arr.length) {
            resolve(res);
          }
        })
        .catch((e) => {
          cnt++;
          res[i] = {
            status: "rejected",
            data: e,
          };
          if (cnt === arr.length) {
            resolve(res);
          }
        });
    }
  });
};

Promise.myRace = (arr) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(resolve).catch(reject);
    }
  });
};

Promise.myAll = (arr) => {
  return new Promise((resolve, reject) => {
    let resolveCnt = 0;
    let res = new Array(arr.length).fill(null);
    for (let i = 0; i < arr.length; i++) {
      arr[i]
        .then((data) => {
          resolveCnt++;
          res[i] = data;
          if (resolveCnt === arr.length) {
            resolve(res);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

function main() {
  let p1 = Promise.resolve(1);
  let p2 = Promise.resolve(2);
  let p3 = Promise.resolve(3);
  let p4 = new Promise((resolve) =>
    setTimeout(() => {
      resolve(4);
    }, 1000)
  );
  let p5 = new Promise((resolve) =>
    setTimeout(() => {
      resolve(5);
    }, 500)
  );
  let pe = Promise.reject("error1");
  let pe2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error2");
    }, 200);
  });

  console.time("time");

  Promise.myAllSettled([p1, p2, p3, p4, p5, pe2])
    .then((res) => {
      log(res);
      console.timeEnd("time");
    })
    .catch((e) => {
      log(e);
      console.timeEnd("time");
    });

  // Promise.myRace([pe2, p4, p5])
  //   .then((res) => {
  //     log(res);
  //     console.timeEnd("time");
  //   })
  //   .catch((e) => {
  //     log(e);
  //     console.timeEnd("time");
  //   });

  // Promise.myAll([p1, p2, p3, p4, p5]).then(log);
}

main();
