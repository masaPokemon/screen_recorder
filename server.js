const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    socket.on('startShare', () => {
        socket.broadcast.emit('offer', {
            type: 'offer',
            sdp: 'dummy-sdp'  // ここは実際にはSDPを生成する必要があります
        });
    });

    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    socket.on('disconnect', () => {
        console.log('ユーザーが切断しました');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`サーバーがポート ${PORT} で稼働中`);
});
