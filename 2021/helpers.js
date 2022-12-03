import fs from 'fs';

export function parseData(path) {
  return fs.readFileSync(`./${path}`, 'utf-8').split("\n");
}
