import fs from 'fs';

export function parseData(path) {
  fs.readFileSync
  return fs.readFileSync(`./${path}`, 'utf-8').split("\n");
}
