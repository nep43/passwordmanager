const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveData: (data) => ipcRenderer.send('save-data', data),
  onSaveDataSuccess: (callback) => ipcRenderer.on('save-data-success', callback),
  onSaveDataError: (callback) => ipcRenderer.on('save-data-error', callback),
  onPasswordData: (callback) => ipcRenderer.on('getPasswordData', callback)
});