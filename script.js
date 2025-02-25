// Select elements
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

// Store transactions in an array
let transactions = [];

// Initialize Chart.js
let chartCtx = document.getElementById("financeChart").getContext("2d");
let financeChart = new Chart(chartCtx, {
    type: "pie",
    data: {
        labels: ["Income", "Expenses"],
        datasets: [{
            data: [0, 0], // Initial values
            backgroundColor: ["lightgreen", "lightcoral"]
        }]
    }
});

// Function to update Chart Data
function updateChart(income, expense) {
    financeChart.data.datasets[0].data = [income, expense];
    financeChart.update();
}

// Function to update UI
function updateUI() {
    let income = 0, expense = 0, balance = 0;
    
    transactionList.innerHTML = ""; // Clear list before updating

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");
        li.innerHTML = `${transaction.description}: ₹${transaction.amount} 
                        <button onclick="deleteTransaction(${index})">X</button>`;
        transactionList.appendChild(li);
    });

    balance = income - expense;

    balanceEl.innerText = `₹${balance}`;
    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${expense}`;

    // Update the Chart
    updateChart(income, expense);
}

// Function to add a transaction
function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    // Add transaction to array
    transactions.push({ description, amount, type });

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";

    // Update UI
    updateUI();
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

// Initial update
updateUI();




const darkModeToggle = document.getElementById("dark-mode-toggle");

// Check for saved mode in localStorage
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

// Toggle Dark Mode on button click
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});



const filterDropdown = document.getElementById("filter");

// Function to update UI with Filtering
function updateUI() {
    let income = 0, expense = 0, balance = 0;
    
    transactionList.innerHTML = ""; // Clear list before updating

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        // Create list item (Only show based on filter)
        if (filterDropdown.value === "all" || filterDropdown.value === transaction.type) {
            const li = document.createElement("li");
            li.innerHTML = `${transaction.description}: ₹${transaction.amount} 
                            <button onclick="deleteTransaction(${index})">X</button>`;
            transactionList.appendChild(li);
        }
    });

    balance = income - expense;
    balanceEl.innerText = `₹${balance}`;
    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${expense}`;
    updateChart(income, expense);
}

// Add Event Listener for Filter Dropdown
filterDropdown.addEventListener("change", updateUI);

