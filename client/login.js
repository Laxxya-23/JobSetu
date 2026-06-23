// Dynamic API URL (Local aur Render dono ke liye)
const API_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "https://jobsetu-backend.onrender.com/api"
    : "/api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch(`${API_URL}/admin-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            localStorage.setItem("adminLoggedIn", "true");
            alert("Login Successful");
            window.location.href = "admin.html";
        } else {
            alert("Invalid Credentials");
        }
    } catch (error) {
        console.log("Login Error:", error);
        alert("Server Error");
    }
});