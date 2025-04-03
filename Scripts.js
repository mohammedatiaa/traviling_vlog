let docTitle = document.title;
window.addEventListener("blur", () =>{
    document.title = "Come Back ＞︿＜";
});

window.addEventListener("focus", () =>{
    document.title = docTitle;
});


document.addEventListener("DOMContentLoaded", function () {
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");

let posts = [];
document.querySelectorAll(".gallary-post-section .box").forEach(box => {
posts.push(box.querySelector(".box-title").textContent.trim());
});

searchInput.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (searchValue === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    let filteredPosts = posts.filter(post => post.toLowerCase().includes(searchValue));

    if (filteredPosts.length > 0) {
        filteredPosts.forEach(post => {
            let div = document.createElement("div");
            div.classList.add("suggestion");
            div.textContent = post;

            div.addEventListener("click", function () {
                searchInput.value = post;
                suggestionsBox.style.display = "none";

                document.querySelectorAll(".gallary-post-section .box").forEach(box => {
                    if (box.querySelector(".box-title").textContent.trim() === post) {
                        box.scrollIntoView({ behavior: "smooth" });
                    }
                });
                searchInput.value = '';
            });

            suggestionsBox.appendChild(div);
        });

        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
});

document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = "none";
    }
});
});


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".subscribe-form");
    const emailInput = document.querySelector(".email-box");
    const checkbox = document.querySelector(".subscribe-form-box input[type='checkbox']");
    const warningMessage = document.querySelector(".worning-message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            showMessage(" Invalid email. Please send to a valid email address.", "error");
            return;
        }

        if (!checkbox.checked) {
            showMessage(" You must agree to subscribe to the newsletter.", "error");
            return;
        }


        showMessage("Your subscription has been successful! We will contact you soon.", "success");

        // request api
        form.reset(); 
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showMessage(message, type) {
        warningMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${message}`;
        warningMessage.style.color = type === "error" ? "red" : "green";
        warningMessage.style.display = "block";
    }
});

