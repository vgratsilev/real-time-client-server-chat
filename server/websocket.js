const ws = require('ws');

const wss = new ws.WebSocketServer(
    {
        port: 5005,
    },
    () => console.log(`Server started on port 5005`),
);

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        // example
        // const message = {
        //     event: 'message/connection',
        //     id: 123,
        //     date: '27.01.2023',
        //     username: 'Vadim',
        //     message: 'hi',
        // };

        message = JSON.parse(message);

        message.time = new Date().toLocaleTimeString('en-GB'); // 24 hours time format

        switch (message.event) {
            case 'message':
                broadcastMessage(message);
                break;
            case 'connection':
                broadcastMessage(message);
                break;
        }
    });
});

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    });
}
