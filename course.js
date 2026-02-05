let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const addBtn = document.getElementById("addBtn");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");
const message = document.getElementById("message");


if (addBtn) {
    addBtn.addEventListener("click", addTransaction);
    updateList();
    updateDashboard();
}

function addTransaction() {
    const desc = descInput.value;
    const amount = Number(amountInput.value);
    const type = typeInput.value;

    if (!desc || !amount || !type) {
        message.textContent = "❌ All fields are required!";
        return;
    }
    if (amount <= 0) {
        message.textContent = "❌ Amount must be greater than 0!";
        return;
    }

    message.textContent = "";

    const transaction = { desc, amount, type };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateList();
    updateDashboard();

    descInput.value = "";
    amountInput.value = "";
    typeInput.value = "";
}


function updateList() {
    if (!listEl) return;

    listEl.innerHTML = "";
    transactions.forEach((t, index) => {
        const li = document.createElement("li");
        li.textContent = `${t.type.toUpperCase()} - $${t.amount} - ${t.desc}`;

        
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.style.marginLeft = "10px";
        btn.onclick = function() {
            deleteTransaction(index);
        };

        li.appendChild(btn);
        listEl.appendChild(li);
    });
}


function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateList();
    updateDashboard();
}


function updateDashboard() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
        if (t.type === "income") totalIncome += t.amount;
        else totalExpense += t.amount;
    });

    const balance = totalIncome - totalExpense;

    incomeEl.textContent = totalIncome;
    expenseEl.textContent = totalExpense;
    balanceEl.textContent = balance;
}
