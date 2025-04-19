'use strict';

var usernamePage = document.getElementById('username-page'); // Login page container
var chatPage = document.querySelector('#chat-page'); // Chat room container
var usernameForm = document.querySelector('#usernameForm'); // Form for entering username
var messageForm = document.querySelector('#messageForm'); // Form for sending messages
var messageInput = document.querySelector('#message'); // Input for message text
var messageArea = document.querySelector('#messageArea'); // UL element to display chat messages
var connectingElement = document.querySelector('.connecting'); // Shows "Connecting..." message

// STOMP client and user state
var stompClient = null;
var username = null;

// List of avatar colors
var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0' // <-- fixed missing closing quote
];

// Called when the username form is submitted
function connect(event){
    username = document.querySelector('#messagingUsername').value.trim(); // Get username value from input

    if(username){
        usernamePage.classList.add('hidden'); // Hide login page
        chatPage.classList.remove('hidden'); // Show chat page

        // Create a SockJS connection to "/ws"
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket); // Initialize STOMP client over the socket

        // Connect and register callbacks
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault(); // Prevent form submission from reloading the page
}

// Called when connection to server is successful
function onConnected() {
    // Subscribe to the public topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Notify server of user joining
    stompClient.send("/app/chat.addUser", {}, JSON.stringify({
        sender: username,
        type: 'JOIN'
    }));

    connectingElement.classList.add('hidden'); // Hide the "Connecting..." message
}

// Called if there's an error while connecting
function onError() {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again.';
    connectingElement.style.color = 'red';
}

// Called when a new message is received from the server
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body); // Parse message object
    var messageElement = document.createElement('li');

    // Handle different message types
    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        // Create user avatar element
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0].toUpperCase()); // First letter of sender's name
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        // Append avatar to message element
        messageElement.appendChild(avatarElement);

        // Add sender name
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    // Add message content
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);

    // Append to message area and scroll to bottom
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Called when message form is submitted
function sendMessage(event) {
    var messageContent = messageInput.value.trim(); // Get message text

    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };

        // Send message to server
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

        messageInput.value = ''; // Clear input field (fixed: used .value instead of .content)
    }

    event.preventDefault();
}

// Generate consistent avatar color based on sender's name
function getAvatarColor(messageSender) {
    var hash = 0;

    // Hash function to generate number from string
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
}

// Add event listeners to forms
usernameForm.addEventListener('submit', connect, true); // On username submit
messageForm.addEventListener('submit', sendMessage, true); // On message submit
