const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
    const username = usernameEl.value;
    const password = passwordEl.value;

    fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                window.location.href = "/dashboard";
            } else {
                alert(data.message);
            }
        });
})
