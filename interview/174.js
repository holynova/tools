// qq.com

// http://www.qq.com  // 通过

// http://www.qq.com.cn  // 不通过

// http://www.qq.com/a/b  // 通过

// http://www.qq.com?a=1  // 通过

// http://www.123qq.com?a=1  // 不通过
//  http://www.qq.com|http://www.qq.com.cn|http://www.qq.com/a/b|http://www.qq.com?a=1|http://www.123qq.com?a=1|

let log = console.log.bind(console);

function test() {
  let arr =
    "http://www.qq.com|http://www.qq.com.cn|http://www.qq.com/a/b|http://www.qq.com?a=1|http://www.123qq.com?a=1".split(
      "|"
    );
  arr.map((x) => {
    let reg = /^http:\/\/www\.qq\.com[^.]*$/;
    console.log(x, reg.test(x));
  });

  let reg = /\d+/g;
  "123,234,345,567".split(",").forEach((x) => {
    log(reg);
    log(x, reg.test(x));
  });
  // return reg.test();
}

test();
