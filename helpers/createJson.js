const { readdir, unlink, readFileSync, writeFileSync } = require('fs');
const path = require('path');

const data = readFileSync('./helpers/lista.md', 'utf-8');
const res = data.toString().split(/\r?\n/)
const resLength = res.length;

const site = [];

const zerofill = value => (value < 10 && value > -1 ? '0' : '') + value;

let today = new Date();
let date = `${today.getFullYear()}${zerofill((today.getMonth() + 1))}${zerofill(today.getDate())}`;
// let time = `${zerofill(today.getHours())}${zerofill(today.getMinutes())}${zerofill(today.getSeconds())}`;

const directory = 'trashlist';

readdir(directory, (err, files) => {
  if(err) throw err;
  for(const file of files) {
    unlink(path.join(directory, file), err => {
      if(err) throw err;
    });
  }
  createFiles();
});

function createFiles() {
  res.forEach((line, index) => {
    const [name, type] = line.split('|');
  
    let comma = index < resLength - 1 ? ',' : '';
    const path = `{"name":"${name.trim()}","type":${type.trim()}}${comma}`;
  
    site.push(path);
  
    const template = `{"segregacja":{"odpadow": [${site.join('')}]}}`;
  
    writeFileSync(`./trashlist/naodpady.${date}.json`, template, err => { });
  
    const nameJSON = `TRASH_LIST = naodpady.${date}.json`
    writeFileSync(`./.env`, nameJSON, err => { });
  });
}