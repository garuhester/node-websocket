var bodyParser = require('body-parser');
var ejs = require('ejs');

var express = require('express');
var app = express()

//初始化路由
var route = require('./routes/index');

//ejs
app.set('views', './views/pages'); //设置视图根目录
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//初始化静态资源
app.use(express.static('./static'));

//初始化body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

//express-ws模块
// var expressWs = require('express-ws');
// var wss = expressWs(app)
// var aWss = wss.getWss('/');
// app = wss.app;

// app.ws('/', function (ws, req) {
//     ws.onmessage = function (msg) {
//         aWss.clients.forEach(function (client) {
//             client.send(msg.data);
//         });
//     };
// });

//ws模块
var WebSocket = require('ws');
//ws模块 #1 不同端口
// var ws = new WebSocket.Server({ port: 8081, path: "/"  })

//ws模块 #2 相同端口
var http = require('http');
var server = http.createServer(app)
var ws = new WebSocket.Server({ server, path: "/" })

ws.on("connection", function (socket) {
    socket.on("message", function (msg) {
        console.log(msg.toString());
        ws.clients.forEach(function each(client) {
            client.send(msg);
        });
    })
})

server.listen(8080, function (err) {
    if (err) return err;
    console.log("http://localhost:8080");
});