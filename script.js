"use strict";

/*
  JavaScript Midterm
  Mini Expense Tracker
*/

// ------------------------------------
// 1. SELECT DOM ELEMENTS
// ------------------------------------
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");
const addExpenseButton = document.querySelector("#add-expense");
const resetButton = document.querySelector("#reset");
const expenseList = document.querySelector("#expense-list");
const expenseCount = document.querySelector("#expense-count");
const totalDisplay = document.querySelector("#total");
const budgetStatus = document.querySelector("#budget-status");
const message = document.querySelector("#message");

// ------------------------------------
// 2. APPLICATION DATA
// ------------------------------------
let expenses = [];
const budget = 500;

// ------------------------------------
// 3. FUNCTIONS
// ------------------------------------

// Add a new expense after checking the inputs.
function addExpense() {
  const description = descriptionInput.value.trim();
  const amountText = amountInput.value.trim();
  const amount = Number(amountText);
  const category = categorySelect.value;

  if (description === "") {
    showMessage("Please enter an expense description.", "error");
    return;
  }

  if (amountText === "") {
    showMessage("Please enter an expense amount.", "error");
    return;
  }

  if (!Number.isFinite(amount)) {
    showMessage("Please enter a valid number for the amount.", "error");
    return;
  }

  if (amount <= 0) {
    showMessage("The amount must be greater than $0.", "error");
    return;
  }

  const expense = {
    description: description,
    amount: amount,
    category: category
  };

  expenses.push(expense);
  displayExpenses();

  const total = calculateTotal();
  totalDisplay.textContent = "$" + total.toFixed(2);
  updateBudgetStatus(total);

  showMessage("Expense added successfully!", "success");
  clearForm();
}

// Display each expense and update the expense count.
function displayExpenses() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "No expenses have been added yet.";
    expenseList.appendChild(emptyMessage);
  }

  for (const expense of expenses) {
    const item = document.createElement("div");
    item.className = "expense-item";

    const description = document.createElement("span");
    description.className = "expense-description";
    description.textContent = expense.description;

    const category = document.createElement("span");
    category.className = "expense-category";
    category.textContent = expense.category;

    const amount = document.createElement("span");
    amount.className = "expense-amount";
    amount.textContent = "$" + expense.amount.toFixed(2);

    item.appendChild(description);
    item.appendChild(category);
    item.appendChild(amount);
    expenseList.appendChild(item);
  }

  expenseCount.textContent = expenses.length + " Expenses";
}

// Add up all stored amounts and return the total.
function calculateTotal() {
  let total = 0;

  for (const expense of expenses) {
    total += expense.amount;
  }

  return total;
}

// Check whether the total is within the $500 budget.
function updateBudgetStatus(total) {
  if (total <= budget) {
    budgetStatus.textContent = "You are under budget.";
    budgetStatus.classList.remove("over-budget");
    budgetStatus.classList.add("under-budget");
  } else {
    budgetStatus.textContent = "You are over budget.";
    budgetStatus.classList.remove("under-budget");
    budgetStatus.classList.add("over-budget");
  }
}

// Display an error or success message.
function showMessage(text, type) {
  message.textContent = text;
  message.classList.remove("error", "success");
  message.classList.add(type);
}

// Clear the inputs, but keep all saved expenses.
function clearForm() {
  descriptionInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
}

// Return the application to its original state.
function resetApplication() {
  expenses = [];
  displayExpenses();
  totalDisplay.textContent = "$0.00";
  updateBudgetStatus(0);
  message.textContent = "";
  message.classList.remove("error", "success");
  clearForm();
}

// ------------------------------------
// 4. EVENT LISTENERS
// ------------------------------------
addExpenseButton.addEventListener("click", addExpense);
resetButton.addEventListener("click", resetApplication);
