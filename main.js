// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const spawn = require('child_process').spawn;

const ipc = ipcMain;

function createWindow () {
  // Create the browser window.
  	const mainWindow = new BrowserWindow({

		width: 500,
		minWidth: 500,
		height: 600,
		minHeight: 600,
		resizable: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.js')
		}
  	})

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	ipc.on('closeApp', () => {

		console.log('closeApp');
		mainWindow.close();
	})

	ipc.on('minimizeApp', () => {

		console.log('minimizeApp');
		mainWindow.minimize();
	})

	ipc.on('menuClick', () => {

		console.log('menuClick');
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  	createWindow()

	

	let meShell = spawn('script/me.sh', [


	])

	meShell.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	meShell.on("exit", (code) => {

		console.log("Exit : ", code)

	})

	mainShell = spawn('script/wList.sh', [

	])

	connectedLogins = []
	mainShell.stdout.on('data', (data) => {

		data.toString().replace('\n', '').split('/').forEach((login) => {

			if (!connectedLogins.includes(login)) {

				connectedLogins.push(login)
				console.log(login + " connected")
			}
		})

		connectedLogins.forEach(login => {
			
			if (!data.toString().replace('\n', '').split('/').includes(login)) {

				connectedLogins.splice(connectedLogins.indexOf(login), 1)
				console.log(login + " disconnected")
			}
		});
	})

	mainShell.stderr.on('data', (data) => {

		console.log(`Error : ${data}`);
	})

	mainShell.on("exit", (code) => {

		console.log("Exit : ", code)
	})

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
