#!/usr/bin/env node
const spawnSync = require('child_process').spawnSync;
const path = require('path');
const fs = require('fs');
const logger = require('./console');

const currentVersion = process.argv[2];
const ancestorVersion = process.argv[3];
const otherVersion = process.argv[4];
const file = process.argv[5];

logger.log(`attempting to merge ${file} via npm i --package-lock-only`);
const ret = spawnSync('git', ['merge-file', '-p', currentVersion, ancestorVersion, otherVersion], {stdio: [0, 'pipe', 2]});

fs.writeFileSync(file, ret.stdout);
const install = spawnSync(
  'npm',
  ['install', '--package-lock-only', '--prefer-offline', '--no-audit', '--progress=false'],
  {cwd: path.dirname(file)}
);

if (install.status !== 0) {
  logger.log(`${file} merge failure`);
  logger.log('resolve package.json conflicts. Then run npm i --package-lock-only');
  // eslint-disable-next-line
  console.log();
  process.exit(1);
}

fs.writeFileSync(currentVersion, fs.readFileSync(file));
logger.log(`${file} merged successfully`);
