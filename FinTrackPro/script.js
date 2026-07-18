/* ==========================================
        TABLE BODY
========================================== */

const transactionList = document.getElementById("transactionList");
/* ======================================================
                DOM SELECTION
====================================================== */

// Sidebar Button
const addBtn = document.getElementById("addBtn");

// Modal
const modal = document.getElementById("transactionModal");
const closeBtn = document.getElementById("closeModal");

// Form
const transactionForm = document.getElementById("transactionForm");

// Top Buttons
const logoutBtn = document.getElementById("logoutBtn");
const resetBtn = document.getElementById("resetBtn");

// Dashboard Cards
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const count = document.getElementById("count");

// Dark Mode
const themeToggle = document.getElementById("themeToggle");

// User Name
const userName = document.getElementById("userName");



/* ======================================================
                MODAL OPEN
====================================================== */

addBtn.addEventListener("click", () => {

    modal.style.display = "flex";

});



/* ======================================================
                MODAL CLOSE
====================================================== */

closeBtn.addEventListener("click", () => {

    modal.style.display = "none";

});



/* ======================================================
        CLOSE MODAL WHEN CLICK OUTSIDE
====================================================== */

window.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.style.display = "none";

    }

});



/* ======================================================
            ESC KEY CLOSE MODAL
====================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        modal.style.display = "none";

    }

});



/* ======================================================
                DARK MODE
====================================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.checked = true;

}

themeToggle.addEventListener("change", () => {

    if (themeToggle.checked) {

        document.body.classList.add("dark");

        localStorage.setItem("theme", "dark");

    } else {

        document.body.classList.remove("dark");

        localStorage.setItem("theme", "light");

    }

});



/* ======================================================
                USER NAME
====================================================== */

const currentUser = localStorage.getItem("currentUser");

if (currentUser) {

    userName.textContent = currentUser;

}



/* ======================================================
                LOGOUT
====================================================== */

logoutBtn.addEventListener("click", () => {

    const answer = confirm("Do you really want to logout?");

    if (!answer) return;

    localStorage.removeItem("currentUser");

    window.location.href = "../login/index.html";

});



/* ======================================================
                RESET BUTTON
====================================================== */

resetBtn.addEventListener("click", () => {

    console.log("Reset Button Clicked");

});



/* ======================================================
                PAGE LOADED
====================================================== */

console.log("FinTrack Pro Loaded Successfully");


// part 2
/* ======================================================
            TRANSACTION ARRAY
====================================================== */

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


/* ======================================================
            FORM SUBMIT
====================================================== */

transactionForm.addEventListener("submit", function (e) {

    e.preventDefault();

    // ==========================
    // GET VALUES
    // ==========================

    const type = document.getElementById("type").value;

    const description = document
        .getElementById("description")
        .value
        .trim();

    const amount = Number(
        document.getElementById("amount").value
    );

    const date = document.getElementById("date").value;

    const category = document.getElementById("category").value;


    // ==========================
    // VALIDATION
    // ==========================

    if (
        description === "" ||
        amount === 0 ||
        date === "" ||
        category === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    if (amount < 0) {

        alert("Amount cannot be negative.");

        return;

    }


    // ==========================
    // CREATE OBJECT
    // ==========================

    const transaction = {

        id: Date.now(),

        type,

        description,

        amount,

        date,

        category

    };


    // ==========================
    // SAVE
    // ==========================

    transactions.push(transaction);

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );


    console.log(transactions);


    // ==========================
    // RESET FORM
    // ==========================

    transactionForm.reset();


    // Today's Date Again

    document.getElementById("date").valueAsDate = new Date();


    // Close Modal

    modal.style.display = "none";


    // Dashboard Update

    updateDashboard();

    renderTransactions();

});
// part 3
/* ==========================================
        UPDATE DASHBOARD
========================================== */

function updateDashboard() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {

        if (item.type === "Income") {

            totalIncome += item.amount;

        } else {

            totalExpense += item.amount;

        }

    });

    const totalBalance = totalIncome - totalExpense;

    balance.textContent = `₹${totalBalance.toFixed(2)}`;

    income.textContent = `₹${totalIncome.toFixed(2)}`;

    expense.textContent = `₹${totalExpense.toFixed(2)}`;

    count.textContent = transactions.length;

}
// rander table
/* ==========================================
        RENDER TABLE
========================================== */

function renderTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach((item) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${item.type}</td>

            <td>${item.description}</td>

            <td>₹${item.amount.toFixed(2)}</td>

            <td>${item.date}</td>

            <td>${item.category}</td>

            <td>

                <button
                    class="delete-btn"
                    data-id="${item.id}"
                >
                    Delete
                </button>

            </td>

        `;

        transactionList.appendChild(row);

    });

}
/* ==========================================
        DELETE TRANSACTION
========================================== */

transactionList.addEventListener("click", function (event) {

    if (!event.target.classList.contains("delete-btn")) {

        return;

    }

    const id = Number(event.target.dataset.id);

    const confirmDelete = confirm("Delete this transaction?");

    if (!confirmDelete) {

        return;

    }

    transactions = transactions.filter((item) => {

        return item.id !== id;

    });

    localStorage.setItem(

        "transactions",

        JSON.stringify(transactions)

    );

    updateDashboard();

    renderTransactions();

});
/* ==========================================
        INITIAL LOAD
========================================== */

updateDashboard();

renderTransactions();

/* ======================================================
            CURRENCY FORMAT
====================================================== */

const currencyFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
});

function formatCurrency(amount) {
    return currencyFormatter.format(amount);
}


/* ======================================================
            RESET ALL DATA
====================================================== */

resetBtn.addEventListener("click", () => {

    if (transactions.length === 0) {

        alert("No transactions available.");

        return;

    }

    const confirmReset = confirm(
        "Are you sure you want to delete all transactions?"
    );

    if (!confirmReset) {

        return;

    }

    transactions = [];

    localStorage.removeItem("transactions");

    updateDashboard();

    renderTransactions();

    alert("All Transactions Deleted Successfully.");

});


/* ======================================================
            UPDATE DASHBOARD
    (Replace your old updateDashboard() with this one)
====================================================== */

function updateDashboard() {

    let totalIncome = 0;

    let totalExpense = 0;

    transactions.forEach((item) => {

        if (item.type === "Income") {

            totalIncome += item.amount;

        } else {

            totalExpense += item.amount;

        }

    });

    const totalBalance = totalIncome - totalExpense;

    balance.textContent = formatCurrency(totalBalance);

    income.textContent = formatCurrency(totalIncome);

    expense.textContent = formatCurrency(totalExpense);

    count.textContent = transactions.length;

}


/* ======================================================
            TODAY DATE
====================================================== */

function setTodayDate() {

    document.getElementById("date").valueAsDate = new Date();

}


/* ======================================================
            PAGE INITIALIZATION
====================================================== */

function initializeApp() {

    updateDashboard();

    renderTransactions();

    setTodayDate();

}

initializeApp();


/* ======================================================
            SUCCESS MESSAGE
====================================================== */

function showSuccess(message) {

    alert(message);

}


/* ======================================================
            ERROR MESSAGE
====================================================== */

function showError(message) {

    alert(message);

}


/* ======================================================
            APP READY
====================================================== */

console.log("====================================");
console.log("FinTrack Pro Loaded Successfully");
console.log("Transactions :", transactions.length);
console.log("====================================");