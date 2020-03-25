var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var path = require('path')

var port = 8080

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// пространства имен в socket.io создаются с помощью функции io.of('namespace_name)
var namespace = io.of('/namespace')
// подключение к именному пространству socket.io
namespace.on('connection', function (socket) {
    console.log('connected to namespace')

    var room = ''

    socket.on('btn_click', function (data) {
        if (data.btn == 1) {

            room = 'demo room 1'
            // подсключение к комнате 1
            socket.join(room)
            socket.emit('room_join', { roomname: 1 })
        } else if (data.btn == 2) {

            room = 'demo room 2'
            // подсключение к комнате 2
            socket.join(room)
            socket.emit('room_join', { roomname: 2 })
        }

        socket.on('get_greeting', function () {
            // метод to позволяет генерировать события, которые будут отправлены указанной комнате
            namespace.to('demo room 1').emit('greet', { message: 'Hello from room1' })
            namespace.to('demo room 2').emit('greet', { message: 'Hello from room2' })
        })
    })
})

server.listen(port, function () {
    console.log('app runnnig on port ' + port)
})