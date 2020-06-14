let PORT = process.env.PORT || 8080;
const http = require('http');

const httpServer = http.createServer((req, res) => {
	console.log('we have received a message');
});

const WebSocket = require('ws');
// const wss = new WebSocket.Server({port: 8080});
const wss = new WebSocket.Server({ server: httpServer });

httpServer.listen(PORT, () => console.log('Listening on port 8080'));

wss.on('connection', (ws) => {
	ws.on('message', (data) => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		});
	});
});
