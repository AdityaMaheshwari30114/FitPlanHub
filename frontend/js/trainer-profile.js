const params = new URLSearchParams(window.location.search);
const trainerId = params.get("id");

const trainerNameEl = document.getElementById("trainerName");
const followBtn = document.getElementById("followBtn");
const planList = document.getElementById("planList");

let isFollowing = false;

/* Load trainer plans */
async function loadTrainerPlans() {
  try {
    const res = await fetch(`${BASE_URL}/plans`);
    const plans = await res.json();

    const trainerPlans = plans.filter(
      p => p.trainerId === trainerId
    );

    if (trainerPlans.length === 0) {
      planList.innerHTML = `
        <p class="text-muted">No plans created by this trainer yet.</p>
      `;
      return;
    }

    // Set trainer name from first plan
    trainerNameEl.innerText = trainerPlans[0].trainer;

    planList.innerHTML = "";

    trainerPlans.forEach(plan => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${plan.title}</h5>

            <p class="fw-bold">₹${plan.price}</p>

            <a href="plan.html?id=${plan.id}" 
               class="btn btn-outline-primary mt-auto w-100">
              View Details
            </a>
          </div>
        </div>
      `;

      planList.appendChild(col);
    });

  } catch (err) {
    planList.innerHTML =
      `<p class="text-danger">Failed to load plans</p>`;
  }
}

/* Follow / Unfollow */
followBtn.addEventListener("click", async () => {
  try {
    const method = isFollowing ? "DELETE" : "POST";

    const res = await fetch(`${BASE_URL}/follow/${trainerId}`, {
      method,
      headers: authHeader()
    });

    if (!res.ok) return;

    isFollowing = !isFollowing;

    followBtn.innerText = isFollowing ? "Unfollow" : "Follow";
    followBtn.classList.toggle("btn-danger");
    followBtn.classList.toggle("btn-primary");

  } catch (err) {
    console.error(err);
  }
});

loadTrainerPlans();
