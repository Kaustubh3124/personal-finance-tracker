
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

let transactions = [];

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


function updateChart(income, expense) {
    financeChart.data.datasets[0].data = [income, expense];
    financeChart.update();
}

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

    
    updateChart(income, expense);
}

function addTransaction() {
    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }


    transactions.push({ description, amount, type });

    descriptionInput.value = "";
    amountInput.value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();




const darkModeToggle = document.getElementById("dark-mode-toggle");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

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

function updateUI() {
    let income = 0, expense = 0, balance = 0;
    
    transactionList.innerHTML = ""; 

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

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

filterDropdown.addEventListener("change", updateUI);

