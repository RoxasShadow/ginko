const { app, BrowserWindow, crashReporter } = require('electron');
const http = require('http');

crashReporter.start({
  submitURL: 'http://127.0.0.1:9999',
  companyName: 'ginko'
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let server = http.createServer((req, res) => {
  res.end(getRandomInt(1000, 9999).toString());
});

let mainWindow = null;
app.on('ready', function() {
  server.listen(9999, '127.0.0.1', function () {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false
      }
    });

    mainWindow.maximize(true);
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    // mainWindow.toggleDevTools();
  });
});
