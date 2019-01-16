/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 */

import {
  app,
  BrowserWindow,
  Tray,
  ipcMain,
  Menu,
  MenuItem,
  shell
} from 'electron';
import path from 'path';
import fs from 'fs';
import MiscUtil from './utils/Util';

const clipboardWatcher = require('./utils/ClipboardWatcher');

const menu = new Menu();

const utility = new MiscUtil();

const dataPath = path.join(app.getPath('appData'), '/clippy');

let mainWindow = null;
let tray = null;
let trayIcon = null;

/* ----------------------------------------------
            CHECKS BEFORE APP STARTS
 ----------------------------------------------  */

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
  fs.mkdirSync(`${dataPath}/NativeImages`);
}

if (process.env.NODE_ENV === 'production') {
  // app.dock.hide(); // Hide app inside the dock
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  /* eslint-disable */

  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};
/* ----------------------------------------------
            END CHECKS BEFORE APP STARTS
 ----------------------------------------------  */

/* ----------------------------------------------
                 CLIPBOARD WATCHER
 ----------------------------------------------  */
clipboardWatcher({
  watchDelay: 300, // milliseconds
  onImageChange: copiedImage => {
    let name = utility.generateName();
    let imagesPath = dataPath.toString() + `/NativeImages/${name}.png`;
    fs.writeFile(imagesPath, copiedImage.toPNG(), err => {
      if (err) throw err;
    });
    mainWindow.webContents.send('img-copy', 'newimage');
  },
  onTextChange: text => {
    if (text.isImage === true) {
      console.log('Is Image');
    } else {
      console.log('This ran!');
      mainWindow.webContents.send('db-ch', text.text.toString());
    }
    // console.log(`isImage: ${text.isImage}`)
  }
});

/* ----------------------------------------------
                 END CLIBOARDWATCHER
 ----------------------------------------------  */

/* ----------------------------------------------
                 WINDOW TOGGLER
 ----------------------------------------------  */

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
};

ipcMain.on('show-window', () => {
  showWindow();
});

const showWindow = () => {
  const position = getWindowPosition();

  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();
  if (process.platform !== 'darwin') {
    // Position window 500 pixels vertically above the tray icon Windows
    const y = Math.round(trayBounds.y + trayBounds.height - 500);
    // Center window horizontally below the tray icon
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    return { x: x, y: y };
  } else {
    // Position window 4 pixels vertically below the tray icon Linux And Mac
    const y = Math.round(trayBounds.y + trayBounds.height + 4);
    // Center window horizontally below the tray icon
    const x = Math.round(
      trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
    );
    return { x: x, y: y };
  }
};
/* ----------------------------------------------
                 END WINDOW TOGGLER
 ----------------------------------------------  */

/* ----------------------------------------------
                  TRAY INIT
  ----------------------------------------------  */
const createTray = () => {
  menu.append(
    new MenuItem({
      label: 'Exit',
      click() {
        app.exit();
      }
    })
  );

  if (process.platform !== 'darwin' && process.env.NODE_ENV === 'development') {
    console.log('Dev Windows ran');
    trayIcon = 'app/trayicon/airplane@32.ico';
  } else if (process.platform !== 'darwin') {
    console.log('Windows ran');
    trayIcon = path.join(
      process.resourcesPath,
      'app/trayicon/airplane@256.ico'
    );
  } else if (process.env.NODE_ENV === 'development') {
    console.log('Dev ran');

    trayIcon = 'app/trayicon/airplane@2x.png';
  } else {
    console.log('Mac ran');

    trayIcon = path.join(
      process.resourcesPath,
      '/app/trayicon/airplane@2x.png'
    );
  }

  tray = new Tray(trayIcon);

  tray.on('click', function(event) {
    toggleWindow();
  });
  tray.on('right-click', function(event) {
    menu.popup({});
  });

  tray.setToolTip('Clipboard');
};

/* ----------------------------------------------
                 END TRAY INIT
 ----------------------------------------------  */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/* ----------------------------------------------
                APP STARTS HERE
 ----------------------------------------------  */

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    skipTaskbar: true,
    resizable: false,
    show: false,
    width: 300,
    height: 465,
    frame: false,
    transparent: true
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    // mainWindow.show(); //Focus window here
    // mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // mainWindow.on('blur', () => {
  //   mainWindow.hide();
  // });

  ipcMain.on('minimize', (event, args) => {
    mainWindow.hide();
    event.returnValue = 'Minimizing window...';
  });

  ipcMain.once('get-userpath', (event, args) => {
    event.returnValue = dataPath.toString();
  });
  ipcMain.once('get-userpath2', (event, args) => {
    event.returnValue = dataPath.toString();
  });

  ipcMain.on('open-dir', (event, args) => {
    shell.openItem(dataPath.toString() + `/NativeImages`);
  });

  createTray();
});

/* ----------------------------------------------
                 END APP STARTS HERE
 ----------------------------------------------  */
