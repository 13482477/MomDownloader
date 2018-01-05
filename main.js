const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

const request = require('request')
const cheerio = require('cheerio')


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let win

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({ width: 800, height: 600 })

    // 然后加载应用的 index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // 打开开发者工具。
    //win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
    }
    )
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

//搜索歌曲
ipcMain.on('searchMusic', async (event, arg) => {
    let requestURL = encodeURI(`http://www.chedvd.com/so.html?k=${arg}`);
    let result = "<table class='gridtable'><tr><th>歌曲名称</th><th>歌手</th><th>下载</th></tr>";
    request(requestURL, (error, response, body) => {
        // if (error) {

        // }
        // if (response.statusCode != 200) {

        // }
        const $ = cheerio.load(body);
        $('td a').map((i, element) => {
            let link = element.attribs.href;
            if (link.startsWith('/song')) {
                result = result + "<tr>"
                result = result + "<td>" + element.childNodes[0].data + "</td>";
                result = result + "<td>" + $('td a')[i + 1].childNodes[0].data + "</td>";
                result = result + `<td><button onclick="downloadMusic('${element.attribs.href}')">下载</button></td>`
                result = result + "</tr>"
            }
        });
        event.returnValue = result;
    });
});

ipcMain.on('downloadMusic', async (event, arg) => {
    let requestURL = encodeURI(`http://www.chedvd.com${arg}`);
    request(requestURL, (error, response, body) => {
        const $ = cheerio.load(body);
        let href = $('div .button a')[0].attribs.href;
        event.returnValue = `http://www.chedvd.com${href}`;
    });

})