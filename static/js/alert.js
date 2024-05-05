
$(document).ready(function () {
    $('#closeAlertModal').click(function () {
        $('#alertModal').modal('hide');
    });
});

function showAlertModal(title, content) {
    // Set the title and content of the modal
    document.getElementById('alertModalLabel').textContent = title;
    document.getElementById('alertModalContent').textContent = content;

    // Show the modal
    $('#alertModal').modal('show');
}

var socket = new WebSocket('ws://' + location.host + '/websocket');

// Define the function to be called when a message is received
socket.onmessage = function(event) {
    console.log('Received: ' + event.data);

    var data = JSON.parse(event.data);
    var title = data.title;
    var text = data.text;

    showAlertModal(title, text);
};

// Define the function to be called when the connection is opened
socket.onopen = function(event) {
    console.log('Connection opened');
};

// Define the function to be called when the connection is closed
socket.onclose = function(event) {
    console.log('Websocket connection closed');
};

// Define the function to be called when an error occurs
socket.onerror = function(error) {
    console.log('Error: ' + error.message);
};
