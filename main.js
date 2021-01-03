const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
var mainWindow = null;
var arg2 = process.argv[2];
const nativeImage = electron.nativeImage;
var icon = nativeImage.createFromPath(__dirname+'/icon.png');
icon.setTemplateImage(true);

app.on('ready', function() {
	global.file = arg2 ? arg2 : "index.htm";
	
	mainWindow = new BrowserWindow({
		width: 1280, 
		height: 720,
		webPreferences: {
			nodeIntegration: true
		}
	});
	mainWindow.loadURL('file:///' + file);
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.setIcon(icon)
	mainWindow.removeMenu();

	//Handle link click events
	mainWindow.webContents.on('new-window', function(event, url){
		event.preventDefault();
		shell.openExternal(url);
	});
	mainWindow.on('close', function(e) { 
        e.preventDefault();
        mainWindow.destroy();
    });
});
