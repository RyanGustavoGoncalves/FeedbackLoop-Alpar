const chatContent = document.getElementById('chat-container');
const formMessage = document.getElementById("form-message");
const storageUser = JSON.parse(localStorage.getItem("user"));

chatContent.innerHTML = `
<div class="message">
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" class="profile-image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
<div class="message-content">
<span class="username"> Felipe</span>
<span class="message-text">Que bom que você chegou, Felipe.</span>
<span class="timestamp">Hoje às 15:06</span>
</div>
</div>
`

formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formMessage);
    const message = formData.get("message");
    const userId = storageUser.id;

    console.log(message, userId);

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
        })
        .catch((error) => {
            console.error('There was a problem with the request:', error);
        });

});
