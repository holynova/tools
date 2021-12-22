// 将markdown文件里面的日期进行格式化
const log = console.log.bind(console);

import dayjs from "dayjs";
import fs from "fs";

function convertDate(dateStr = "") {
  let input = dateStr
    .substring(2)
    .split(/\s+/)[0]
    .replace(/[年月日]/g, "-")
    .replace(/-$/g, "");

  if (!input.startsWith("2021")) {
    input = `2021-${input}`;
  }
  let moment = dayjs(input);
  let output = dateStr;
  if (moment.isValid()) {
    output =
      dayjs(input).format("# YYYY年MM月DD日 星期") +
      "日一二三四五六".charAt(moment.day());
  }
  // log({ dateStr, input, output });
  return output;
}

function formatAndGetLines(data) {
  const cleanData = data.replace(/\r/g, "").replace(/^\s+||\s+$/g, "");
  const lines = cleanData.split(/\n{1,}/g);
  return lines;
}

function main() {
  fs.promises.readFile("./input_diary.txt", "utf-8").then((data) => {
    let all = formatAndGetLines(data).map((line) => {
      if (line.startsWith("#")) {
        return convertDate(line);
      }
      return line;
    });

    log(all.join("\n"));
  });
}

main();
