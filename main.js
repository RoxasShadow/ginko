const { app, BrowserWindow, crashReporter } = require('electron');
const http = require('http');

crashReporter.start({ submitURL: 'http://127.0.0.1:9999', companyName: 'sample' });

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var server = http.createServer(function(req, res) {
  res.end(getRandomInt(1000, 9999).toString());
});

var mainWindow = null;
app.on('ready', function() {
  server.listen(9999, '127.0.0.1', function () {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/build/index.html');
    mainWindow.toggleDevTools();
  });
});
