import fs from "fs";
import path from "path";
import imgToPDF from "image-to-pdf";


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const log = console.log.bind(console);

async function makePdf(absolutePath) {
  try {
    let subDirList = await fs.promises.readdir(absolutePath);
    subDirList.forEach(async (dir) => {
      let currentPath = path.join(absolutePath, dir);
      let isDir = fs.lstatSync(currentPath).isDirectory();
      if (isDir) {
        let files = await (
          await fs.promises.readdir(currentPath)
        ).map((f) => path.join(currentPath, f));
        log(files)
        imgToPDF(files, "A4").pipe(
          fs.createWriteStream(path.join(__dirname, `./output/${dir}.pdf`))
        )
      }
    });
  } catch (e) {
    log(e);
  }
}
// let absolutePath = '/Users/sym/Downloads/baiduyun/电锯/电锯人_1话'
let absolutePath = "/Users/sym/Downloads/baiduyun/电锯";

makePdf(absolutePath);
