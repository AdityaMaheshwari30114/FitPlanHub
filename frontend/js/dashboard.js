const table = document.getElementById("planTable");
const form = document.getElementById("planForm");
const logoutBtn = document.getElementById("logoutBtn");

let editingId = null;

logoutBtn.addEventListener("click", () => {
  clearToken();
  window.location.href = "login.html";
});

async function loadPlans() {
  const res = await fetch(`${BASE_URL}/plans`, {
    headers: authHeader()
  });

  const plans = await res.json();
  table.innerHTML = "";

  plans.forEach(plan => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${plan.title}</td>
      <td>₹${plan.price}</td>
      <td>${plan.duration || "-"}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1"
          onclick="editPlan('${plan.id}')">Edit</button>
        <button class="btn btn-sm btn-danger"
          onclick="deletePlan('${plan.id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    title: title.value,
    description: description.value,
    price: price.value,
    duration: duration.value
  };

  const url = editingId
    ? `${BASE_URL}/plans/${editingId}`
    : `${BASE_URL}/plans`;

  const method = editingId ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...authHeader()
    },
    body: JSON.stringify(payload)
  });

  location.reload();
});

async function editPlan(id) {
  editingId = id;

  const res = await fetch(`${BASE_URL}/plans/${id}`, {
    headers: authHeader()
  });

  const plan = await res.json();

  title.value = plan.title;
  description.value = plan.description;
  price.value = plan.price;
  duration.value = plan.duration;

  new bootstrap.Modal(document.getElementById("planModal")).show();
}

async function deletePlan(id) {
  if (!confirm("Delete this plan?")) return;

  await fetch(`${BASE_URL}/plans/${id}`, {
    method: "DELETE",
    headers: authHeader()
  });

  loadPlans();
}

loadPlans();
