const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

closeBtn.addEventListener('click', () => {

	ipc.send('closeApp');
});

minimizeBtn.addEventListener('click', () => {

	ipc.send('minimizeApp');
});

menuBtn.addEventListener('click', () => {

	ipc.send('menuClick');
});