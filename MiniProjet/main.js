
const { app, BrowserWindow,ipcMain } = require('electron/main')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const path = require('node:path');
const { log } = require('node:console');


let win;
const createWindow = () => {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true, 
        }
  })


  win.loadFile('index.html')
}


app.whenReady().then(() => {
  createWindow()
  getPasswords()
  
  app.on('activate', () => {
    
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

ipcMain.on('save-data', async (event, data) => {
    try {
      console.log('Données à enregistrer dans la base :', data);
      const savedData = await prisma.user.create({
        data: {
          website: data.site,
          email: data.email,
          password: data.password,
        }
      });
  
      console.log('Données enregistrées dans la base :', savedData);
      event.sender.send('save-data-success', savedData);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données :', error);
      event.sender.send('save-data-error', error.message);
    }
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})  

async function getPasswords() {
    const pwds = await prisma.user.findMany();
    win.webContents.send('getPasswordData', pwds);
  }