/* eslint-disable no-console */
module.exports = {
  log: (...args) => args.unshift('npm-merge-driver-install:') && console.log.apply(console, args),
  error: (...args) => args.unshift('npm-merge-driver-install:') && console.error.apply(console, args)
};
