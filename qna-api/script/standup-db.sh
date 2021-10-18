#!/usr/bin/env node
const { exec } = require('child_process');
const url = require('url');
require('dotenv').config();

const path = __dirname
const params = url.parse(process.env.DB_URL);
const auth = params.auth.split(':');
const user = auth[0]
const password = auth[1]
const database = params.pathname.split('/')[1]
const callback = (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
      console.log(`exec error: ${error}`);
  }
}

const startScript = `bash ${path}/start-db.sh ${user} ${password} ${database} ${params.port}`
console.log('START SCRIPT', startScript)
const startup = exec(startScript, callback);

startup.on('exit', () => {
  setTimeout(() => {
    exec(`DATABASE_URL=${process.env.DB_URL} npm run db-migrate up`, callback);
  }, 4000);
});
