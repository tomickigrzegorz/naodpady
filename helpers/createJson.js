const { readdir, unlink, readFileSync, writeFileSync } = require('fs');
const path = require('path');

const data = readFileSync('./helpers/lista.md', 'utf-8');
const res = data.toString().split(/\r?\n/);
const resLength = res.length;

const site = [];

const zerofill = (value) => (value < 10 && value > -1 ? '0' : '') + value;

const today = new Date();
const date = `${today.getFullYear()}${zerofill(today.getMonth() + 1)}${zerofill(
  today.getDate()
)}`;
// let time = `${zerofill(today.getHours())}${zerofill(today.getMinutes())}${zerofill(today.getSeconds())}`;

const directory = 'trashlist';

const createFiles = () => {
  res.forEach((line, index) => {
    const [name, type] = line.split('|');

    const comma = index < resLength - 1 ? ',' : '';
    const pathName = `{"name":"${name.trim()}","type":${type.trim()}}${comma}`;

    site.push(pathName);

    const template = `{"segregacja":{"odpadow": [${site.join('')}]}}`;

    writeFileSync(`./trashlist/naodpady.${date}.json`, template, (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });

    const nameJSON = `TRASH_LIST = naodpady.${date}.json
TRASH_MAIL = info@naodpady.pl`;

    writeFileSync('./.env', nameJSON, (err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
  });
};

readdir(directory, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    unlink(path.join(directory, file), (error) => {
      if (error) throw error;
    });
  });
  createFiles();
});
