const list = document.getElementById("trainerList");

async function loadTrainers() {
  const res = await fetch(`${BASE_URL}/plans`);
  const plans = await res.json();

  const trainers = {};
  plans.forEach(p => {
    trainers[p.trainer] = p.trainer;
  });

  Object.values(trainers).forEach(name => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `
      <span>${name}</span>
      <button class="btn btn-sm btn-primary">Follow</button>
    `;

    list.appendChild(li);
  });
}

loadTrainers();
