/* eslint-disable no-console */
const isCI = require('is-ci');
const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;

const rootDir = process.env.INIT_CWD;

console.log('npm-merge-driver-install');
console.log(rootDir);

if (!fs.existsSync(path.join(rootDir, '.git'))) {
  console.log('Current working directory does not contain a .git directory, skipping install');
  process.exit(0);
}

if (isCI && typeof process.env.NPM_MERGE_DRIVER_IGNORE_CI === 'undefined') {
  console.log('CI detected, skipping install');
  process.exit(0);
}

if (typeof process.env.NPM_MERGE_DRIVER_SKIP_INSTALL !== 'undefined') {
  console.log('env variable NPM_MERGE_DRIVER_SKIP_INSTALL is set skipping install');
  process.exit(0);
}

console.log('installing npm-merge-dirver');

const result = spawnSync('npm-merge-driver', ['install'], {cwd: rootDir, stdio: 'inherit'});

process.exit(result.status);
