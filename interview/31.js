// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// for (var i = 0; i < 5; i++) {
//   let clone = i;
//   setTimeout(() => {
//     console.log(clone);
//   }, 1000 * i);
// }

function flat(arr) {
  // return arr.map((x) => {
  //   if (Array.isArray(x)) {
  //     return flat(x);
  //   }
  //   return [x];
  // });
  let res = [];
  for (let x of arr) {
    if (Array.isArray(x)) {
      res = res.concat(...flat(x));
    } else {
      res.push(x);
    }
  }
  return res;
}

function flat2(arr) {
  while (arr.some((x) => Array.isArray(x))) {
    arr = [].concat(...arr);
    // arr = [].concat(...arr.map((y) => (Array.isArray(y) ? y : [y])));
  }
  return arr;
}

function test() {
  let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
  console.log(flat2(arr));
  console.log(...arr);
}
// test();

function test2() {
  var a = { num: 0 };
  a.valueOf = function () {
    this.num += 1;
    return this.num;
  };

  if (a == 1 && a == 2 && a == 3) {
    console.log(1);
  }
}

function test3() {
  function sleep(time = 1000) {
    let start = Date.now();
    while (Date.now() - start < time) {}
  }
  console.log("start");
  sleep(1000);
  console.log("end");
}

function test4() {
  // (5).add(3).minus(2);
  Number.prototype.add = function (num) {
    return this + num;
  };
  Number.prototype.minus = function (num) {
    return this - num;
  };
  let res = (5).add(3).minus(2);
  console.log(res);
}

function test5() {
  let o = { 1: 222, 2: 123, 5: 888 };
  let res = new Array(12).fill(null).map((x, i) => {
    if (`${i + 1}` in o) {
      return o[i + 1];
    }
    return null;
  });
  console.log(res);
}

test5();
