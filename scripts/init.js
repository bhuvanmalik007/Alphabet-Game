/* eslint-disable import/no-dynamic-require */
const fs = require('fs-extra');
const path = require('path');

module.exports = (appPath, dirName) => {
  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(
      {
        ...fs.readJSONSync(path.resolve(appPath, 'package.json')),
        name: dirName,
        devDependencies: { '@enginite/electron-starter': '0.1.1' },
        scripts: {
          ...fs.readJSONSync(path.resolve(appPath, 'package.json')).scripts,
          package: 'electron-builder build --publish never',
        },
        build: {
          productName: dirName,
          appId: `com.electronapp.${dirName}`,
          files: [
            './build/',
            'node_modules/',
            'app.html',
            'main.js',
            'menu.js',
            'package.json',
          ],
          dmg: {
            contents: [
              { x: 130, y: 220 },
              { x: 410, y: 220, type: 'link', path: '/Applications' },
            ],
          },
          win: { target: ['nsis'] },
          linux: { target: ['deb', 'AppImage'], category: 'Development' },
          directories: { buildResources: 'resources', output: 'release' },
        },
      },
      null,
      2,
    ),
  );
};
