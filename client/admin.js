// Dynamic API URL (Local aur Render dono ke liye)
const API_URL = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
    ? "https://jobsetu-backend.onrender.com/api"
    : "/api";

// LOGIN PROTECTION
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
}

// ADD JOB
document.getElementById("jobForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("jobTitle").value,
        organization: document.getElementById("organization").value,
        lastDate: document.getElementById("lastDate").value,
        applyLink: document.getElementById("applyLink").value
    };

    try {
        const response = await fetch(`${API_URL}/add-job`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        document.getElementById("jobForm").reset();
        loadJobs();
    } catch (error) {
        console.log(error);
        alert("Error adding job");
    }
});

// ADD RESULT
document.getElementById("resultForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("resultTitle").value,
        resultLink: document.getElementById("resultLink").value
    };

    try {
        const response = await fetch(`${API_URL}/add-result`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        document.getElementById("resultForm").reset();
    } catch (error) {
        console.log(error);
        alert("Error adding result");
    }
});

// ADD ADMIT CARD
document.getElementById("admitForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("admitTitle").value,
        admitCardLink: document.getElementById("admitLink").value
    };

    try {
        const response = await fetch(`${API_URL}/add-admitcard`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        document.getElementById("admitForm").reset();
    } catch (error) {
        console.log(error);
        alert("Error adding admit card");
    }
});

// ADD ANSWER KEY
document.getElementById("answerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: document.getElementById("answerTitle").value,
        answerKeyLink: document.getElementById("answerLink").value
    };

    try {
        const response = await fetch(`${API_URL}/add-answerkey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        document.getElementById("answerForm").reset();
    } catch (error) {
        console.log(error);
        alert("Error adding answer key");
    }
});

// LOAD ALL JOBS
async function loadJobs() {
    try {
        const response = await fetch(`${API_URL}/jobs`);
        const jobs = await response.json();
        const jobList = document.getElementById("jobList");

        if (!jobList) return;
        jobList.innerHTML = "";

        jobs.forEach(job => {
            jobList.innerHTML += `
            <div style="background:white; padding:15px; margin-bottom:10px; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,.1);">
                <h3>${job.title}</h3>
                <p>${job.organization}</p>
                <p>Last Date: ${job.lastDate}</p>
                <button onclick="deleteJob('${job._id}')" style="background:red; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer;">
                    Delete
                </button>
            </div>
            `;
        });
    } catch (error) {
        console.log(error);
    }
}

// DELETE JOB
async function deleteJob(id) {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/delete-job/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        alert(result.message);
        loadJobs();
    } catch (error) {
        console.log(error);
    }
}

// INITIAL LOAD
loadJobs();

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("adminLoggedIn");
        window.location.href = "login.html";
    });
}