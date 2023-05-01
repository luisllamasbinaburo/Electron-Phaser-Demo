const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Crea la ventana del navegador.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Carga la aplicación PhaserJS.
  win.loadFile('index.html')

  // Abre las herramientas de desarrollo (solo para fines de depuración).
  win.webContents.openDevTools()
}

// Este método se llamará cuando Electron haya terminado
// la inicialización y esté listo para crear ventanas del navegador.
// Algunas API solo se pueden usar después de que este evento ocurra.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // En macOS, es común volver a crear una ventana en la aplicación cuando
    // el icono del muelle se hace clic y no hay otras ventanas abiertas.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Salir cuando todas las ventanas estén cerradas, excepto en macOS. En macOS, es común
// para aplicaciones y su barra de menú estar activas hasta que el usuario salga expresamente con Cmd + Q
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
