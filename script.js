const socket = io();

const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const chatMessages = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    const user = usernameInput.value.trim() || 'Anonymous';

    if (text) {
        socket.emit('sendMessage', { user, text });
        messageInput.value = '';
        messageInput.focus();
    }
});

socket.on('receiveMessage', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    msgDiv.innerHTML = `
        <div class="meta">
            <span>${data.user}</span>
            <span>${data.time}</span>
        </div>
        <div class="text">${data.text}</div>
    `;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
