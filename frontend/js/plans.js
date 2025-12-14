const planList = document.getElementById("planList");

async function loadPlans() {
  try {
    const response = await fetch(`${BASE_URL}/plans`);
    const plans = await response.json();

    planList.innerHTML = "";

    if (!plans || plans.length === 0) {
      planList.innerHTML = `
        <p class="text-muted">No plans available at the moment.</p>
      `;
      return;
    }

    plans.forEach(plan => {
      const col = document.createElement("div");
      col.className = "col-sm-6 col-md-4";

      col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-semibold">
              ${plan.title}
            </h5>

            <p class="text-muted mb-1">
              Trainer: <strong>${plan.trainer}</strong>
            </p>

            <p class="fw-bold fs-5 mt-2">₹${plan.price}</p>

            <a
              href="plan.html?id=${plan.id}"
              class="btn btn-outline-primary mt-auto w-100"
            >
              View Details
            </a>
          </div>
        </div>
      `;

      planList.appendChild(col);
    });

  } catch (error) {
    console.error(error);
    planList.innerHTML = `
      <p class="text-danger">Failed to load plans.</p>
    `;
  }
}

loadPlans();
