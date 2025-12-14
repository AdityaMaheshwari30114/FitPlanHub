const params = new URLSearchParams(window.location.search);
const trainerId = params.get("id");

const trainerNameEl = document.getElementById("trainerName");
const followBtn = document.getElementById("followBtn");
const planList = document.getElementById("planList");

let following = false;

async function loadTrainerProfile() {
    // minimal info (reuse plans API for now)
    const res = await fetch(`${BASE_URL}/plans`);
    const plans = await res.json();

    const trainerPlans = plans.filter(p => p.trainerId === trainerId);

    if (trainerPlans.length > 0) {
        trainerNameEl.innerText = trainerPlans[0].trainer;
    }

    trainerPlans.forEach(p => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `
      ${p.title}
      <a href="plan.html?id=${p.id}" class="float-end">View</a>
    `;
        planList.appendChild(li);
    });
}

followBtn.addEventListener("click", async () => {
    const method = following ? "DELETE" : "POST";

    const res = await fetch(`${BASE_URL}/follow/${trainerId}`, {
        method,
        headers: authHeader()
    });

    if (res.ok) {
        following = !following;
        followBtn.innerText = following ? "Unfollow" : "Follow";
        followBtn.classList.toggle("btn-danger");
        followBtn.classList.toggle("btn-primary");
    }
});

loadTrainerProfile();
