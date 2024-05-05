
$(document).ready(function () {
    $('#closeAlertModal').click(function () {
        $('#alertModal').modal('hide');
    });
});

var socket = new WebSocket('ws://' + location.host + '/websocket');

// Define the function to be called when a message is received
socket.onmessage = function(event) {
    console.log('Received: ' + event.data);
};

// Define the function to be called when the connection is opened
socket.onopen = function(event) {
    console.log('Connection opened');
};

// Define the function to be called when the connection is closed
socket.onclose = function(event) {
    console.log('Websocket connection closed');
    socket = new WebSocket('ws://' + location.host + '/websocket');
};

// Define the function to be called when an error occurs
socket.onerror = function(error) {
    console.log('Error: ' + error.message);
};
