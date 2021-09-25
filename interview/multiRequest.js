const log = console.log.bind(console);

function multiRequest2(urls = [], max = 3) {
  return new Promise((resolve) => {
    let cnt = 0;
    let list = [];
    function createTask() {
      if (cnt >= urls.length) {
        return Promise.allSettled(list).then(resolve);
      } else {
        cnt += 1;
        let task = request(urls[cnt - 1])
          .then((res) => {
            return { success: true, data: res };
          })
          .catch((e) => {
            return { success: false, reason: e };
          })
          .finally(() => {
            createTask();
          });
        list.push(task);
      }
    }

    while (cnt < max && cnt < urls.length) {
      createTask();
    }
  });
}

function multiRequest(urls = [], max = 3) {
  let pList = [];
  let i = 0;

  function addTask() {
    if (i >= urls.length) {
      // 全部完成
    } else {
      let task = request(urls[i]).then(() => {
        pList.push(addTask());
        i++;
      });
      return task;
    }
  }

  while (i < max) {
    addTask();
    i++;
  }
}

let res = [];
function request(url, errorRate = 0.5) {
  return new Promise((resolve, reject) => {
    let start = Date.now();
    log(`${url}开始 >>`);
    let delay = Math.floor(Math.random() * 200);
    // if (url === "url0") {
    //   reject(new Error("url0出错"));
    // }
    setTimeout(() => {
      let end = Date.now();
      res.push(url);
      log(`${url}结束 <<`, { delay, start, end });
      // console.log("请求结果", { url, delay, start, end });
      Math.random() < errorRate ? reject("错误" + url) : resolve(url);
      // resolve(url);
    }, delay);
  });
}

function test() {
  let urls = new Array(22).fill(0).map((x, i) => "url" + i);
  // multiRequest(urls, 3);
  multiRequest2(urls, 3).then((res) => {
    log("all result", res);
  });
  // console.log("总数", res.length);
}

test();
