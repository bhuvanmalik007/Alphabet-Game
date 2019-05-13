const fs = require('fs-extra');
const path = require('path');
const { spawnSync } = require('child_process');

const appPath = process.cwd();

const scriptPath = path.resolve(
  appPath,
  'node_modules',
  '@enginite',
  'electron-starter',
  'scripts',
);

const configPath = path.resolve(
  appPath,
  'node_modules',
  '@enginite',
  'electron-starter',
  'config',
);

fs.copySync(scriptPath, path.resolve(appPath, 'scripts'));

fs.copySync(configPath, path.resolve(appPath, 'config'));

const moduleDependencies = require(path.join(
  appPath,
  'node_modules',
  '@enginite',
  'electron-starter',
  'package.json',
)).dependencies;

const extraDependencies = Object.keys(moduleDependencies).map(
  x => `${x}@${moduleDependencies[x]}`,
);

fs.writeFileSync(
  path.join(appPath, 'package.json'),
  JSON.stringify(
    {
      ...require(path.join(appPath, 'package.json')),
      scripts: {
        dev: `START_HOT=1 node scripts/dev.js`,
        build: `node scripts/build.js`,
        main: `HOT=1 NODE_ENV=development electron ./app/main.js`,
        package: `yarn build && electron-builder build --publish never`,
      },
    },
    null,
    2,
  ),
);

const installDependencies = spawnSync(
  'yarn',
  ['add', '--exact', '-D', '--verbose']
    .concat(extraDependencies)
    .filter(Boolean),
  { stdio: 'inherit', cwd: path.resolve(process.cwd()) },
);

if (installDependencies.error || installDependencies.status !== 0) {
  console.log('Error while installing devDependencies, try again with yarn');
  process.exit(installDependencies.status);
}

fs.removeSync(path.resolve(appPath, 'scripts', 'eject.js'));
fs.removeSync(path.resolve(appPath, 'scripts', 'init.js'));
