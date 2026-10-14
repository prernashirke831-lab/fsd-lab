const form = document.getElementById("reg-form");
const fields = ["name", "email", "phone", "password", "confirm"];
const el = {};
fields.forEach(f => el[f] = document.getElementById(f));

// Each validator returns an error message, or "" when the value is valid
const validators = {
  name(v) {
    v = v.trim();
    if (!v) return "Enter your full name.";
    if (v.length < 3) return "Name must be at least 3 characters.";
    if (!/^[A-Za-z][A-Za-z .'-]*$/.test(v)) return "Use letters, spaces, dots or hyphens only.";
    return "";
  },
  email(v) {
    v = v.trim();
    if (!v) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email such as name@example.com.";
    return "";
  },
  phone(v) {
    const digits = v.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    if (!v.trim()) return "Enter your mobile number.";
    if (!/^\d+$/.test(digits)) return "Phone number can contain digits only.";
    if (digits.length !== 10) return "Phone number must have exactly 10 digits.";
    if (!/^[6-9]/.test(digits)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
    return "";
  },
  password(v) {
    if (!v) return "Create a password.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    if (!/[a-z]/.test(v)) return "Add a lowercase letter.";
    if (!/[A-Z]/.test(v)) return "Add an uppercase letter.";
    if (!/\d/.test(v)) return "Add a number.";
    if (!/[^A-Za-z0-9]/.test(v)) return "Add a symbol such as ! @ # $.";
    if (/\s/.test(v)) return "Password cannot contain spaces.";
    return "";
  },
  confirm(v) {
    if (!v) return "Type the password again.";
    if (v !== el.password.value) return "Passwords do not match.";
    return "";
  }
};

function check(field) {
  const message = validators[field](el[field].value);
  document.getElementById(field + "-error").textContent = message;
  el[field].classList.toggle("invalid", message !== "");
  el[field].classList.toggle("valid", message === "" && el[field].value !== "");
  el[field].setAttribute("aria-invalid", message !== "");
  return message === "";
}

fields.forEach(f => {
  el[f].addEventListener("blur", () => check(f));
  el[f].addEventListener("input", () => {
    if (el[f].classList.contains("invalid")) check(f);   // clear errors as the user fixes them
    if (f === "password") { updateMeter(); if (el.confirm.value) check("confirm"); }
  });
});

// ----- password strength meter -----
const bar = document.getElementById("meter-bar");
const meterText = document.getElementById("meter-text");
function updateMeter() {
  const v = el.password.value;
  let score = 0;
  if (v.length >= 8) score++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  if (v.length >= 12) score++;
  const levels = [
    ["0%", "var(--danger)", "Use upper and lower case letters, a number and a symbol."],
    ["25%", "var(--danger)", "Weak"],
    ["50%", "var(--warn)", "Fair"],
    ["75%", "var(--warn)", "Good"],
    ["100%", "var(--ok)", "Strong"],
    ["100%", "var(--ok)", "Very strong"]
  ];
  const [w, c, t] = levels[v ? Math.max(score, 1) : 0];
  bar.style.width = w; bar.style.background = c; meterText.textContent = t;
}

// ----- show / hide password -----
const toggle = document.getElementById("toggle-pw");
toggle.addEventListener("click", () => {
  const show = el.password.type === "password";
  el.password.type = show ? "text" : "password";
  toggle.textContent = show ? "Hide" : "Show";
  toggle.setAttribute("aria-pressed", show);
});

// ----- submit -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const results = fields.map(check);            // run every check so all errors show
  const firstBad = results.indexOf(false);
  if (firstBad !== -1) { el[fields[firstBad]].focus(); return; }

  form.hidden = true;
  document.getElementById("success").hidden = false;
  document.getElementById("success-text").textContent =
    "Welcome, " + el.name.value.trim() + ". We would send a confirmation to " + el.email.value.trim() + ".";
});

document.getElementById("reset").addEventListener("click", () => {
  form.reset();
  fields.forEach(f => {
    el[f].classList.remove("valid", "invalid");
    document.getElementById(f + "-error").textContent = "";
  });
  updateMeter();
  document.getElementById("success").hidden = true;
  form.hidden = false;
  el.name.focus();
});
