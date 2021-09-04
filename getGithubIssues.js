const { log } = require("./utils/debug");
const axios = require("axios");

function getIssus(max = 100) {
  let owner = "Advanced-Frontend";
  let repo = "Daily-Interview-Question";
  let pageSize = 100;
  let maxPage = Math.ceil(max / pageSize);
  let res = [];
  let promises = [];
  for (let i = 1; i <= maxPage; i++) {
    let p = axios({
      url: `https://api.github.com/repos/${owner}/${repo}/issues?page=${i}&per_page=${pageSize}`,
    }).then((response) => {
      response.data.map((x) => {
        res.push({
          title: x.title,
          url: x.url,
          id: Number(x.url.split("/").reverse()[0]),
        });
        // res.push(`${x.title}\n${x.url}`);
      });
      // log(arr.join("\n"));
    });
    promises.push(p);
  }
  Promise.all(promises).then(() => {
    log(`生成${res.length}条数据`);
    res.sort((a, b) => a.id - b.id);
    // log("res", res);
    log(res.map((x) => `${x.title}\n${x.url}`).join("\n"));
  });
}

function main() {
  getIssus(300);
}

main();
