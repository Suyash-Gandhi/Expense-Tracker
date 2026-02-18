const form = document.getElementById('expense-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalDisplay.textContent = total.toFixed(2);
}

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `
            <span>${expense.description}</span>
            <div>
                <span>$${expense.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });
    updateTotal();
}

function addExpense(e) {
    e.preventDefault();
    const expense = {
        description: descInput.value,
        amount: parseFloat(amountInput.value)
    };
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    form.reset();
    renderExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

form.addEventListener('submit', addExpense);
renderExpenses();
