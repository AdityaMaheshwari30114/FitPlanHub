const feedContainer = document.getElementById("feedContainer");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = () => {
  clearToken();
  window.location.href = "index.html";
};

async function loadFeed() {
  try {
    const res = await fetch(`${BASE_URL}/feed`, {
      headers: authHeader()
    });

    const feed = await res.json();
    feedContainer.innerHTML = "";

    if (feed.length === 0) {
      feedContainer.innerHTML = `<p class="text-muted">Follow trainers to see plans.</p>`;
      return;
    }

    feed.forEach(item => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column">
            <h5>${item.title}</h5>
            <p class="text-muted">Trainer: ${item.trainer}</p>
            <p class="fw-bold">₹${item.price}</p>

            <span class="badge ${item.purchased ? "bg-success" : "bg-warning text-dark"} mb-2">
              ${item.purchased ? "Purchased" : "Not Purchased"}
            </span>

            <a href="plan.html?id=${item.id}" class="btn btn-outline-primary mt-auto">
              View Plan
            </a>
          </div>
        </div>
      `;

      feedContainer.appendChild(col);
    });
  } catch {
    feedContainer.innerHTML = `<p class="text-danger">Failed to load feed</p>`;
  }
}

loadFeed();
