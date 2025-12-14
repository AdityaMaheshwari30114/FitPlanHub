const planContainer = document.getElementById("planList");
const logoutBtn = document.getElementById("logoutBtn");

// redirect if not logged in
if (!getToken()) {
  window.location.href = "login.html";
}

// logout
logoutBtn.addEventListener("click", () => {
  clearToken();
  window.location.href = "index.html";
});

// load all plans (preview)
async function loadPlans() {
  try {
    const res = await fetch(`${BASE_URL}/plans`);
    const plans = await res.json();

    planContainer.innerHTML = "";

    if (plans.length === 0) {
      planContainer.innerHTML =
        `<p class="text-muted">No plans available yet.</p>`;
      return;
    }

    plans.forEach(plan => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${plan.title}</h5>

            <p class="text-muted mb-1">
              Trainer: <strong>${plan.trainer}</strong>
            </p>

            <p class="fw-bold mt-2">₹${plan.price}</p>

            <a href="plan.html?id=${plan.id}"
               class="btn btn-outline-primary mt-auto w-100">
              View Details
            </a>
          </div>
        </div>
      `;

      planContainer.appendChild(col);
    });

  } catch (err) {
    planContainer.innerHTML =
      `<p class="text-danger">Failed to load plans</p>`;
  }
}

loadPlans();
