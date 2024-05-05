
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


var socket = null;
var retrying = false;

function connect() {
    socket = new WebSocket('ws://' + location.host + '/websocket');

    socket.onopen = function(event) {
        console.log('Websocket connection opened');
    };

    // Define the function to be called when a message is received
    socket.onmessage = function(event) {
        console.log('Received: ' + event.data);

        var data = JSON.parse(event.data);
        var title = data.title;
        var text = data.text;

        showAlertModal(title, text);
    };

    socket.onclose = function(event) {
        console.log('Websocket connection closed');
        if (!retrying) {
            retrying = true;
            console.log('Reconnecting in 5 seconds');
            setTimeout(connect, 5000);
        }
    };

    socket.onerror = function(error) {
        console.log('Error: ' + error.message);
        if (!retrying) {
            retrying = true;
            console.log('Reconnecting in 5 seconds');
            setTimeout(connect, 5000);
        }
    };

    retrying = false;
}

connect();
