const params = new URLSearchParams(window.location.search);
const planId = params.get("id");

const titleEl = document.getElementById("planTitle");
const trainerEl = document.getElementById("trainerName");
const priceEl = document.getElementById("planPrice");
const contentEl = document.getElementById("planContent");
const subscribeBtn = document.getElementById("subscribeBtn");
const statusMsg = document.getElementById("statusMsg");

async function loadPlanDetails() {
    try {
        const res = await fetch(`${BASE_URL}/plans/${planId}`, {
            headers: authHeader()
        });

        const plan = await res.json();

        titleEl.innerText = plan.title;
        trainerEl.innerText = plan.trainer;
        priceEl.innerText = plan.price;

        // if full access
        if (plan.description && plan.duration) {
            contentEl.innerHTML = `
        <p><strong>Duration:</strong> ${plan.duration}</p>
        <p>${plan.description}</p>
      `;
            subscribeBtn.classList.add("d-none");
        }
        // preview only
        else {
            contentEl.innerHTML = `
        <p class="text-muted">
          Subscribe to view full plan details including duration and workout structure.
        </p>
      `;
            subscribeBtn.classList.remove("d-none");
        }

    } catch (err) {
        contentEl.innerHTML = `<p class="text-danger">Failed to load plan</p>`;
    }
}

subscribeBtn.addEventListener("click", async () => {
    try {
        const res = await fetch(`${BASE_URL}/subscribe/${planId}`, {
            method: "POST",
            headers: authHeader()
        });

        const data = await res.json();

        if (!res.ok) {
            statusMsg.classList.add("text-danger");
            statusMsg.innerText = data.message || "Subscription failed";
            return;
        }

        statusMsg.innerText = "Subscription successful!";
        subscribeBtn.classList.add("d-none");
        loadPlanDetails();

    } catch {
        statusMsg.innerText = "Something went wrong";
    }
});

loadPlanDetails();
