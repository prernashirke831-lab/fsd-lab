// ---------- Arithmetic functions ----------
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

// Picks the right function with a switch statement
function calculate(a, operator, b) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default:  throw new Error("Unknown operator");
  }
}

// ---------- Calculator state ----------
const symbols = { "+": "+", "-": "\u2212", "*": "\u00d7", "/": "\u00f7" };
const screen = document.getElementById("screen");
const historyEl = document.getElementById("history");

let current = "0";        // number being typed (string so we can keep "0.")
let previous = null;      // first operand
let operator = null;      // pending operator
let waiting = false;      // true right after an operator or result
let lastExpression = "";  // text shown above the screen

function format(n) {
  // trim floating point noise such as 0.1 + 0.2
  return String(parseFloat(n.toPrecision(12)));
}

function render() {
  screen.classList.remove("err");
  screen.textContent = current;
  if (operator !== null) {
    historyEl.textContent = format(previous) + " " + symbols[operator];
  } else {
    historyEl.textContent = lastExpression;
  }
}

function showError(message) {
  current = "0"; previous = null; operator = null; waiting = true; lastExpression = "";
  screen.textContent = message;
  screen.classList.add("err");
  historyEl.textContent = "";
}

function inputDigit(d) {
  if (waiting || current === "0") {
    current = d;
    waiting = false;
  } else if (current.length < 14) {
    current += d;
  }
  render();
}

function inputDot() {
  if (waiting) { current = "0."; waiting = false; }
  else if (!current.includes(".")) { current += "."; }
  render();
}

function evaluate() {
  if (operator === null) return true;
  try {
    const b = parseFloat(current);
    const result = calculate(previous, operator, b);
    lastExpression = format(previous) + " " + symbols[operator] + " " + format(b) + " =";
    current = format(result);
    previous = null;
    operator = null;
    waiting = true;
    render();
    return true;
  } catch (err) {
    showError(err.message);
    return false;
  }
}

function chooseOperator(op) {
  if (operator !== null && !waiting) {
    if (!evaluate()) return;       // chain: 2 + 3 + 4
  }
  previous = parseFloat(current);
  operator = op;
  waiting = true;
  render();
}

function clearAll() {
  current = "0"; previous = null; operator = null; waiting = false; lastExpression = "";
  render();
}

function backspace() {
  if (waiting) return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
  render();
}

// ---------- Events ----------
document.getElementById("keys").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.dataset.num !== undefined) inputDigit(btn.dataset.num);
  else if (btn.dataset.op) chooseOperator(btn.dataset.op);
  else if (btn.dataset.action === "dot") inputDot();
  else if (btn.dataset.action === "equals") evaluate();
  else if (btn.dataset.action === "clear") clearAll();
  else if (btn.dataset.action === "back") backspace();
});

document.addEventListener("keydown", (e) => {
  if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
  else if (e.key === ".") inputDot();
  else if (["+", "-", "*", "/"].includes(e.key)) { e.preventDefault(); chooseOperator(e.key); }
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); evaluate(); }
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape") clearAll();
});

render();
