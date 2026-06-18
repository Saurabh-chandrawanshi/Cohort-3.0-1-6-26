document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("dynamicNavbar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const closeDrawerBtn = document.getElementById("closeDrawerBtn");
    const mobileDrawer = document.getElementById("mobileNavigationDrawer");
    const learnToggle = document.getElementById("learnToggle");
    const learnDropdown = document.getElementById("learnDropdown");

    // 1. High Performance Scroll Listener with Threshold Checking
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Mobile Drawer Panel Triggers
    mobileMenuBtn.addEventListener("click", () => {
        mobileDrawer.classList.add("open");
    });

    closeDrawerBtn.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
    });

    // Mobile click safety close handler
    document.addEventListener("click", (e) => {
        if (!mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDrawer.classList.remove("open");
        }
    });
});