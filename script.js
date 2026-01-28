// ---------------- GLOBAL SAMPLE DATA ----------------
let accountBalance = 5000;      // Sample balance
let dailyLimit = 100000;        // Daily transaction limit
let todayTotal = 0;             // Today's total transactions

// ---------------- SHOW SECTIONS ----------------
function show(section) {
    let sections = ["login", "dashboard", "deposit", "withdraw", "transfer"];
    sections.forEach(id => document.getElementById(id).style.display = "none");
    document.getElementById(section).style.display = "block";
}

// ---------------- LOGIN VALIDATION ----------------
function validateLogin() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "" || pass === "") {
        alert("Username and Password cannot be empty");
    }
    else if (pass.length < 6) {
        alert("Password must be at least 6 characters");
    }
    else {
        alert("Login successful");
        show("dashboard");
    }
}

// ---------------- DEPOSIT ----------------
function validateDeposit() {
    let amount = Number(document.getElementById("amount").value);

    if (amount <= 0) {
        alert("Deposit amount must be greater than zero");
    }
    else if (amount > 50000) {
        alert("Single deposit limit is 50,000");
    }
    else if (todayTotal + amount > dailyLimit) {
        alert("Daily transaction limit exceeded");
    }
    else {
        accountBalance += amount;
        todayTotal += amount;
        alert("Deposit Successful\nNew Balance: ₹" + accountBalance);
        show("dashboard");
    }
}

// ---------------- WITHDRAW ----------------
function validateWithdraw() {
    let amount = Number(document.getElementById("withdrawAmount").value);

    if (amount <= 0) {
        alert("Withdraw amount must be greater than zero");
    }
    else if (amount > accountBalance) {
        alert("Insufficient Balance\nCurrent Balance: ₹" + accountBalance);
    }
    else if (amount > 25000) {
        alert("Maximum withdraw limit is 25,000");
    }
    else {
        accountBalance -= amount;
        todayTotal += amount;
        alert("Withdraw Successful\nRemaining Balance: ₹" + accountBalance);
        show("dashboard");
    }
}

// ---------------- TRANSFER ----------------
function validateTransfer() {
    let fromAcc = document.getElementById("fromAcc").value.trim();
    let toAcc = document.getElementById("toAcc").value.trim();
    let amount = parseFloat(document.getElementById("transferAmount").value);

    if (fromAcc === "" || toAcc === "" || isNaN(amount) || amount <= 0) {
        alert("Please fill all fields correctly");
        return;
    }
    if (fromAcc === toAcc) {
        alert("Sender and Receiver cannot be same");
        return;
    }
    if (amount > accountBalance) {
        alert("Insufficient balance");
        return;
    }

    accountBalance -= amount;

    alert(
        "Transfer Successful\n" +
        "From: " + fromAcc + "\n" +
        "To: " + toAcc + "\n" +
        "Amount: ₹" + amount + "\n" +
        "Remaining Balance: ₹" + accountBalance
    );

    document.getElementById("balance").innerText = "₹" + accountBalance;
}
