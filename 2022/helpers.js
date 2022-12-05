import fs from "fs";

export function parseData(path, pattern = "\n") {
  return fs.readFileSync(`./${path}`, "utf-8").split(pattern);
}
