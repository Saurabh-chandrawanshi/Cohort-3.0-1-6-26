document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Drawer Navigation Toggle System
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const mobileDrawer = document.getElementById("mobileDrawer");

    menuToggleBtn.addEventListener("click", () => {
        if (mobileDrawer.style.display === "block") {
            mobileDrawer.style.display = "none";
        } else {
            mobileDrawer.style.display = "block";
        }
    });

    // 2. Discover Vibe-Filter Clicking States
    const vibeTags = document.querySelectorAll(".vibe-tag");
    vibeTags.forEach(tag => {
        tag.addEventListener("click", () => {
            document.querySelector(".vibe-tag.active-tag")?.classList.remove("active-tag");
            tag.classList.add("active-tag");
        });
    });

    // 3. Variant Size Selector Clicking Interaction
    const sizeBtns = document.querySelectorAll(".size-selector-btn");
    sizeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".size-selector-btn.active-size")?.classList.remove("active-size");
            btn.classList.add("active-size");
        });
    });

    // 4. Price Calculations Engine (Subscription Plan Panel Update)
    const radioCards = document.querySelectorAll(".custom-radio-card");
    const dynamicPriceDisplay = document.getElementById("dynamicCartPriceDisplay");
    let currentItemPrice = 8.95; 

    radioCards.forEach(card => {
        card.addEventListener("click", () => {
            document.querySelector(".custom-radio-card.checked-card")?.classList.remove("checked-card");
            card.classList.add("checked-card");
            
            const radioInput = card.querySelector("input[type='radio']");
            radioInput.checked = true;

            if (radioInput.value === "one-time") {
                currentItemPrice = 8.95;
            } else if (radioInput.value === "subscribe") {
                currentItemPrice = 8.06;
            }
            calculateFinalTotal();
        });
    });

    // 5. Custom Live Counter Mechanics
    const decrementBtn = document.getElementById("decrementStepperBtn");
    const incrementBtn = document.getElementById("incrementStepperBtn");
    const countInput = document.getElementById("stepperCountInput");

    function calculateFinalTotal() {
        const quantity = parseInt(countInput.value) || 1;
        const finalCalculatedSum = (quantity * currentItemPrice).toFixed(2);
        dynamicPriceDisplay.textContent = `$${finalCalculatedSum}`;
    }

    incrementBtn.addEventListener("click", () => {
        countInput.value = parseInt(countInput.value) + 1;
        calculateFinalTotal();
    });

    decrementBtn.addEventListener("click", () => {
        let currentVal = parseInt(countInput.value);
        if (currentVal > 1) {
            countInput.value = currentVal - 1;
            calculateFinalTotal();
        }
    });
});