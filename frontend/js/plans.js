async function loadPlans() {
    try {
        const res = await fetch(`${BASE_URL}/plans`);
        const plans = await res.json();

        const container = document.getElementById("planList");
        container.innerHTML = "";

        if (plans.length === 0) {
            container.innerHTML = `
        <p class="text-muted">No plans available yet.</p>
      `;
            return;
        }

        plans.forEach(plan => {
            const card = document.createElement("div");
            card.className = "col-sm-6 col-md-4";

            card.innerHTML = `
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
            container.appendChild(card);
        });

    } catch (err) {
        console.error(err);
    }
}

loadPlans();
