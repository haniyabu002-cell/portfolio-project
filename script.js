const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQf54hFFSaPHQ8NfHU3HGRREn5zxezvXmqP0RMA7sax5k8L7Izb4ysvmbg-jG0YPyzDA/exec";


// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(response)
    })
    .then(() => {
        alert("Your message has been submitted successfully!");
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        alert("Something went wrong!");
        console.error(error);
    });
});


// ADMIN LOGIN
function adminLogin() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
    const message = document.getElementById("loginMessage");

    if (username === "admin" && password === "1234") {
        document.getElementById("admin").innerHTML = `
            <h2>User Responses</h2>
            <div id="responsesList"></div>
        `;

        displayResponses();
    } else {
        message.textContent = "Invalid username or password!";
        message.style.color = "red";
    }
}


// DISPLAY RESPONSES FROM GOOGLE SHEETS
function displayResponses() {
    fetch(GOOGLE_SCRIPT_URL)
        .then(response => response.json())
        .then(responses => {
            const list = document.getElementById("responsesList");

            if (responses.length === 0) {
                list.innerHTML = "<p>No responses found.</p>";
                return;
            }

            list.innerHTML = responses.map(response => `
                <div class="project-card">
                    <h3>${response.name}</h3>
                    <p><strong>Email:</strong> ${response.email}</p>
                    <p><strong>Message:</strong> ${response.message}</p>
                    <p><strong>Time:</strong> ${response.timestamp}</p>
                </div>
            `).join("");
        })
        .catch(error => {
            console.error(error);
            document.getElementById("responsesList").innerHTML =
                "<p>Unable to load responses.</p>";
        });
}


// DARK / LIGHT MODE
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        this.textContent = "☀️ Light Mode";
    } else {
        this.textContent = "🌙 Dark Mode";
    }
});