import path from 'path'
import url from 'url'
import { app, BrowserWindow } from 'electron'

app.on('ready', function () {
  var win = new BrowserWindow({
    width: 1000,
    height: 600
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }))
})

app.on('window-all-closed', function () {
  app.quit()
})
