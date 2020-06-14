const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

// const httpServer = http.createServer((req, res) => {
// 	console.log('we have received a message');
// });
// const wss = new WebSocket.Server({port: 8080});

const server = http.Server(app);
app.use(express.static('client'));
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});
