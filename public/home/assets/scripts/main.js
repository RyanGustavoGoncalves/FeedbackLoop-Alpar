const chatContent = document.getElementById('chat-container');
const formMessage = document.getElementById("form-message");
const storageUser = JSON.parse(localStorage.getItem("user"));

// Função para renderizar uma mensagem no DOM
function renderMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" class="profile-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        <div class="message-content">
            <span class="username">${message.author.username}</span>
            <span class="message-text">${message.text}</span>
            <span class="timestamp">${new Date(message.createdAt).toLocaleString()}</span>
        </div>
    `;
    chatContent.appendChild(messageElement);
}

// Adicionar evento de submissão do formulário
formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formMessage);
    const message = formData.get("message");
    const userId = storageUser.id;

    fetch("http://localhost:3000/api/message/send", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, userId }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            loadMessages();
        })
        .catch((error) => {
            console.error('There was a problem with the request:', error);
        });
});

// Função para carregar todas as mensagens existentes
function loadMessages() {
    fetch("http://localhost:3000/api/message/get", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            // Após carregar as mensagens, renderize-as no chatContent
            data.forEach(message => {
                console.log(message);
                renderMessage(message);
            });
        })
        .catch((error) => {
            console.error('There was a problem with the request:', error);
        });
}

// Carregar todas as mensagens ao iniciar a página
loadMessages();
