let HOST = location.origin.replace(/^http/, 'ws');
const connection = new WebSocket(HOST);
// const connection = new WebSocket('ws://localhost:8080');
const button = document.querySelector('#send');

connection.onopen = (event) => {
	console.log('WebSocket is open now ... ');
};

connection.onclose = (event) => {
	console.log('WebSocket is closed now.');
};

connection.onerror = (error) => {
	console.error('WebSocket error observed: ', error);
};

connection.onmessage = (event) => {
	const chat = document.querySelector('#chat');
	chat.innerHTML += event.data;
};

button.addEventListener('click', () => {
	const name = document.querySelector('#name');
	const message = document.querySelector('#message');

	const data = `<p><span style="color: ${generateColor()}">[${name.value}]</span>: ${message.value}</p>`;
	connection.send(data);

	name.value = '';
	message.value = '';
});

function randomVals() {
	return (Math.random() * 256) | 0;
}

function generateColor() {
	return `rgb(${randomVals()}, ${randomVals()}, ${randomVals()})`;
}
