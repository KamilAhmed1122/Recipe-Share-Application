const darkModeToggle = document.getElementById("dark-mode-toggle");

function applyDarkMode() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    } else {
        document.body.classList.remove("dark-mode");
        darkModeToggle.checked = false;
    }
}

applyDarkMode();

darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
    applyDarkMode();
});