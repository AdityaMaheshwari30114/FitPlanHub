const feedList = document.getElementById("feedList");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  clearToken();
  window.location.href = "login.html";
});

async function loadFeed() {
  try {
    const res = await fetch(`${BASE_URL}/feed`, {
      headers: authHeader()
    });

    const feed = await res.json();
    feedList.innerHTML = "";

    if (!feed.length) {
      feedList.innerHTML = `
        <p class="text-muted">
          You are not following any trainers yet.
        </p>
      `;
      return;
    }

    feed.forEach(plan => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${plan.title}</h5>

            <p class="text-muted mb-1">
              Trainer: <strong>${plan.trainer}</strong>
            </p>

            <p class="fw-bold">₹${plan.price}</p>

            ${plan.purchased
          ? `<span class="badge bg-success mb-2">Purchased</span>`
          : `<span class="badge bg-warning text-dark mb-2">Not Purchased</span>`
        }

            <a href="plan.html?id=${plan.id}"
               class="btn btn-outline-primary mt-auto w-100">
              View Plan
            </a>
          </div>
        </div>
      `;

      feedList.appendChild(col);
    });
  } catch (err) {
    feedList.innerHTML = `
      <p class="text-danger">Failed to load feed</p>
    `;
  }
}

loadFeed();
