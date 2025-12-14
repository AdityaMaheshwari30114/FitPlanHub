const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMsg = document.getElementById("authMsg");

/* LOGIN */
loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

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

        setToken(data.token);

        if (data.user.role === "trainer") {
            window.location.href = "trainer-dashboard.html";
        } else {
            window.location.href = "feed.html";
        }
    } catch {
        authMsg.innerText = "Something went wrong";
    }
});

/* SIGNUP */
signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("signupRole").value;

    try {
        const res = await fetch(`${BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
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
        authMsg.innerText = "Something went wrong";
    }
});
