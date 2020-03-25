var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var path = require('path')

var port = 8080

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})
// события connection генерируется, когда socket.io клиент подключается к серверу
io.on('connection', function (socket) {

    // отправка данных клиенту
    socket.emit('data', {
        message: 'data from server'
    })
    // подтверждения получения данных клиентом
    socket.on('response', function (data) {
        console.log(data.message)
    })
})

server.listen(port, function () {
    console.log('app runnnig on port ' + port)
})