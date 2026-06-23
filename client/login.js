document
.getElementById("loginForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {

        username:
        document.getElementById("username").value,

        password:
        document.getElementById("password").value

    };

    try {

        const response =
        await fetch(
        "http://localhost:5000/api/admin-login",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)
        });

        const result =
        await response.json();

        if(result.success){

            localStorage.setItem(
            "adminLoggedIn",
            "true"
            );

            alert("Login Successful");

            window.location.href =
            "admin.html";

        }
        else{

            alert("Invalid Credentials");

        }

    }
    catch(error){

        console.log(error);

        alert("Server Error");

    }

});