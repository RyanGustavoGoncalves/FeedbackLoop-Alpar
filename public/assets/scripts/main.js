const registerForm = document.getElementById("registerForm");
const username = document.getElementById("username");
const password = document.getElementById("password");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const username = formData.get("username");
    const password = formData.get("password");

    fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json(); // Retornar a promessa
            } else {
                throw new Error("Invalid username or password");
            }
        })
        .then((data) => { // Manipular os dados depois de resolvida a promessa
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/home";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
});
