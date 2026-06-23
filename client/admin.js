// =========================
// LOGIN PROTECTION
// =========================

if (
    localStorage.getItem("adminLoggedIn")
    !== "true"
) {

    window.location.href =
    "login.html";

}


// =========================
// ADD JOB
// =========================

document.getElementById("jobForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        title: document.getElementById("jobTitle").value,
        organization: document.getElementById("organization").value,
        lastDate: document.getElementById("lastDate").value,
        applyLink: document.getElementById("applyLink").value
    };

    const response = await fetch(
        "http://localhost:5000/api/add-job",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    document.getElementById("jobForm").reset();

});

// =========================
// ADD RESULT
// =========================

document.getElementById("resultForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        title: document.getElementById("resultTitle").value,
        resultLink: document.getElementById("resultLink").value
    };

    const response = await fetch(
        "http://localhost:5000/api/add-result",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    document.getElementById("resultForm").reset();

});

// =========================
// ADD ADMIT CARD
// =========================

document.getElementById("admitForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        title: document.getElementById("admitTitle").value,
        admitCardLink: document.getElementById("admitLink").value
    };

    const response = await fetch(
        "http://localhost:5000/api/add-admitcard",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    document.getElementById("admitForm").reset();

});

// =========================
// ADD ANSWER KEY
// =========================

document.getElementById("answerForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        title: document.getElementById("answerTitle").value,
        answerKeyLink: document.getElementById("answerLink").value
    };

    const response = await fetch(
        "http://localhost:5000/api/add-answerkey",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    document.getElementById("answerForm").reset();

});

// =========================
// LOAD ALL JOBS
// =========================

async function loadJobs() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/jobs"
        );

        const jobs =
        await response.json();

        const jobList =
        document.getElementById("jobList");

        if(!jobList) return;

        jobList.innerHTML = "";

        jobs.forEach(job => {

            jobList.innerHTML += `

            <div style="
            background:white;
            padding:15px;
            margin-bottom:10px;
            border-radius:10px;
            box-shadow:0 2px 10px rgba(0,0,0,.1);
            ">

                <h3>${job.title}</h3>

                <p>
                ${job.organization}
                </p>

                <p>
                Last Date:
                ${job.lastDate}
                </p>

                <button
                onclick="deleteJob('${job._id}')"
                style="
                background:red;
                color:white;
                border:none;
                padding:10px;
                border-radius:5px;
                cursor:pointer;
                ">
                Delete
                </button>

            </div>

            `;

        });

    } catch(error){

        console.log(error);

    }

}

// =========================
// DELETE JOB
// =========================

async function deleteJob(id){

    const confirmDelete =
    confirm(
    "Are you sure you want to delete?"
    );

    if(!confirmDelete) return;

    try{

        const response =
        await fetch(
        `http://localhost:5000/api/delete-job/${id}`,
        {
            method:"DELETE"
        });

        const result =
        await response.json();

        alert(result.message);

        loadJobs();

    }
    catch(error){

        console.log(error);

    }

}

// =========================
// INITIAL LOAD
// =========================

loadJobs();

// =========================
// LOGOUT
// =========================

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
        "adminLoggedIn"
        );

        window.location.href =
        "login.html";

    });

}