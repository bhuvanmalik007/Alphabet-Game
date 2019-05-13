// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

// const path = require('path');
const logger = require('../config/logger');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');

// TODO
// Warn and crash if required files are missing
fs.emptyDirSync(paths.appBuild);

new Promise((resolve, reject) => {
  logger.info('Creating an optimized production build...');
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      return reject(err);
    }
    return resolve(stats);
  });
}).then(
  stats => {
    console.log(
      stats.toString(
        { colors: true },
        true,
      ),
    );
  },
  err => {
    logger.error('Failed to compile.\n');
    console.log(err);
    process.exit(1);
  },
);
