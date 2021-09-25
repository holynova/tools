function test() {
  Promise.myAllSettled = (arr = []) => {
    return new Promise((resolve, reject) => {
      let res = [];
      arr.forEach(async (p, i) => {
        try {
          let pp = await p;
          res.splice(i, 0, { status: "resolve", value: pp });
          if (res.length === arr.length) {
            resolve(res);
          }
        } catch (e) {
          res.splice(i, 0, { status: "rejected", reason: e });
          resolve(res);
          if (res.length === arr.length) {
            resolve(res);
          }
        }
      });
    });
  };

  let p1 = Promise.resolve(1);
  let p2 = Promise.reject(2);
  let p3 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });

  // Promise.myAllSettled([p1, p2, p3]).then((res) => {
  //   console.log(res);
  // });

  Promise.allSettled([p1, p2, p3]).then((res) => {
    console.log(res);
  });
}

function testSplice() {
  let res = [];
  res.splice(2, 0, "c");
  res.splice(0, 0, "a");
  res.splice(1, 0, "b");

  console.log(res);
}

testSplice();
