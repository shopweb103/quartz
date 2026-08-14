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
        // মেসেজের সাথে নিজের Socket ID সহ পাঠানো হচ্ছে
        socket.emit('sendMessage', { user, text, senderId: socket.id });
        messageInput.value = '';
        messageInput.focus();
    }
});

socket.on('receiveMessage', (data) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');

    // মেসেজটা কি তোমার নিজের পাঠানো?
    if (data.senderId === socket.id) {
        msgDiv.classList.add('my-message');
    } else {
        msgDiv.classList.add('other-message');
    }

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
