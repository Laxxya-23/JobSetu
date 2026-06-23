// =========================
// API URL
// =========================

const API_URL = "http://localhost:5000/api";

// =========================
// LOADER
// =========================

function showLoader() {
    document.body.classList.add("loading");
}

function hideLoader() {
    document.body.classList.remove("loading");
}

// =========================
// TOAST NOTIFICATION
// =========================

function showToast(message, type = "success") {

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// =========================
// SEARCH FUNCTION
// =========================

const searchInput = document.querySelector(".search-box input");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let jobs = document.querySelectorAll(".job-item");

        jobs.forEach(job => {

            let text = job.innerText.toLowerCase();

            if (text.includes(value)) {
                job.style.display = "block";
            } else {
                job.style.display = "none";
            }

        });

    });

}

// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 100) {

        navbar.style.background =
            "rgba(0,10,50,.95)";

        navbar.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.4)";

    } else {

        navbar.style.background =
            "rgba(0,20,60,.85)";

        navbar.style.boxShadow = "none";
    }

});

// =========================
// LOAD LATEST VACANCIES
// =========================

async function loadJobs() {

    try {

        const response = await fetch(`${API_URL}/jobs`);

        const jobs = await response.json();

        const container =
            document.getElementById("latestVacancy");

        if (!container) return;

        container.innerHTML = "";

        if (jobs.length === 0) {

            container.innerHTML =
                "<p>No vacancies available.</p>";

            return;
        }

        jobs.forEach(job => {

            container.innerHTML += `
            <div class="job-item">

                <h4>${job.title}</h4>

                <p>
                    <strong>${job.organization}</strong>
                </p>

                <p>
                    Last Date:
                    ${job.lastDate}
                </p>

                <a href="${job.applyLink}"
                   target="_blank">
                   Apply Now
                </a>

                <hr>

            </div>
            `;

        });

    } catch (error) {

        console.log("Jobs Error:", error);

    }

}

// =========================
// LOAD RESULTS
// =========================

async function loadResults() {

    try {

        const response =
            await fetch(`${API_URL}/results`);

        const data =
            await response.json();

        const container =
            document.getElementById("resultData");

        if (!container) return;

        container.innerHTML = "";

        data.slice(0, 10).forEach(result => {

            container.innerHTML += `
            <div class="job-item">
                <h4>${result.title}</h4>

                <a href="${result.resultLink}"
                   target="_blank">
                   Check Result
                </a>
            </div>
            `;
        });

    } catch (error) {

        console.log(error);

    }

}

// =========================
// LOAD ADMIT CARD
// =========================

async function loadAdmitCards() {

    try {

        const response =
            await fetch(`${API_URL}/admitcards`);

        const data =
            await response.json();

        const container =
            document.getElementById("admitCard");

        if (!container) return;

        container.innerHTML = "";

        data.slice(0, 10).forEach(card => {

            container.innerHTML += `
            <div class="job-item">
                <h4>${card.title}</h4>

                <a href="${card.admitCardLink}"
                   target="_blank">
                   Download
                </a>
            </div>
            `;
        });

    } catch (error) {

        console.log(error);

    }

}

// =========================
// LOAD ANSWER KEY
// =========================

async function loadAnswerKeys() {

    try {

        const response =
            await fetch(`${API_URL}/answerkeys`);

        const data =
            await response.json();

        const container =
            document.getElementById("answerKey");

        if (!container) return;

        container.innerHTML = "";

        data.slice(0, 10).forEach(key => {

            container.innerHTML += `
            <div class="job-item">
                <h4>${key.title}</h4>

                <a href="${key.answerKeyLink}"
                   target="_blank">
                   View PDF
                </a>
            </div>
            `;
        });

    } catch (error) {

        console.log(error);

    }

}

// =========================
// CONTACT FORM
// =========================

const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener(
"submit",
async function(e){

e.preventDefault();

const data = {

name:
document.getElementById("name").value,

email:
document.getElementById("email").value,

mobile:
document.getElementById("mobile").value,

query:
document.getElementById("query").value

};

try{

const response =
await fetch(
"http://localhost:5000/api/contact",
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(data)

}
);

const result =
await response.json();

alert(
"Query Submitted Successfully"
);

contactForm.reset();

}
catch(error){

alert(
"Something Went Wrong"
);

console.log(error);

}

});
}
// =========================
// INITIAL LOAD
// =========================

loadJobs();
loadResults();
loadAdmitCards();
loadAnswerKeys();