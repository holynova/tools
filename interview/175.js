const log = console.log.bind(console);
function convert(rgbStr = "rgb(123,100,32)") {
  // console.log(parseInt("255", 16));
  let arr = rgbStr.replace(/rgb|\(|\)/gi, "").split(",");

  let res = arr
    .map((x) => {
      let y = Number(x).toString(16);
      if (y.length === 1) {
        y = `0${y}`;
      }

      return y;
    })
    // .unshift("#")
    .join("");
  log(res);
  // log(arr);
  // console.log(Number("255").toString(16));
}

convert("RGB(255,255,0)");
