const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMsg = document.getElementById("authMsg");

/* LOGIN */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      authMsg.innerText = data.message || "Login failed";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);

    // role-based redirect
    if (data.user.role === "trainer") {
      window.location.href = "trainer-dashboard.html";
    } else {
      window.location.href = "user-dashboard.html";
    }

  } catch {
    authMsg.innerText = "Server error";
  }
});

/* SIGNUP */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
    role: signupRole.value
  };

  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      authMsg.innerText = data.message || "Signup failed";
      return;
    }

    authMsg.classList.remove("text-danger");
    authMsg.classList.add("text-success");
    authMsg.innerText = "Account created. Please login.";

  } catch {
    authMsg.innerText = "Server error";
  }
});
