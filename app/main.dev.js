/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */

import { app, BrowserWindow, Tray, ipcMain } from 'electron';
import DbHandler from './clipboarddb/Handler';

// import MenuBuilder from './menu';

const clipboardWatcher = require('electron-clipboard-watcher'); // Watch clipboard for changes

const db = new DbHandler(); // Database handler
const date = new Date();

let mainWindow = null;
let tray = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
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

/*
Handler for clipboard events and
where the data is put into
the sqlite3 database
*/

clipboardWatcher({
  watchDelay: 500, // milliseconds

  onImageChange: nativeImage => {
    console.log(nativeImage);
  },
  onTextChange: text => {
    mainWindow.webContents.send('db-ch', text.toString());

    const parsedText = DbHandler.parseToSingleLine(text);
    console.log(parsedText);
    console.log(db.insertClipboardData(parsedText.toString(), date.toString()));
  }
});

// End Handler

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
  /* eslint-disable */

  const position = getWindowPosition();
  mainWindow.setPosition(position.x, position.y, false);
  mainWindow.show();
  mainWindow.focus();
};

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x: x, y: y };
};

const createTray = () => {
  tray = new Tray('./app/trayicon/tray22.png');
  /* eslint-disable */

  tray.on('click', function(event) {
    toggleWindow();
  });

  tray.setToolTip('Clipboard');
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    resizable: false,
    show: false,
    width: 200,
    height: 455,
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

  createTray();

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
