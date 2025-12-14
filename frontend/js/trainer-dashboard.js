// auth check
if (!getToken()) {
  window.location.href = "login.html";
}

const tableBody = document.getElementById("plansTable");
const planForm = document.getElementById("planForm");
const logoutBtn = document.getElementById("logoutBtn");
const modalTitle = document.getElementById("modalTitle");

let editingPlanId = null;

// LOGOUT
logoutBtn.addEventListener("click", () => {
  clearToken();
  window.location.href = "login.html";
});

// LOAD TRAINER PLANS
async function loadPlans() {
  const res = await fetch(`${BASE_URL}/plans`, {
    headers: authHeader()
  });

  const plans = await res.json();
  tableBody.innerHTML = "";

  plans.forEach(plan => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${plan.title}</td>
      <td>₹${plan.price}</td>
      <td>${plan.duration || "-"}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editPlan('${plan.id}')">
          Edit
        </button>
        <button class="btn btn-sm btn-danger" onclick="deletePlan('${plan.id}')">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// CREATE / UPDATE PLAN
planForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    title: title.value,
    description: description.value,
    price: price.value,
    duration: duration.value
  };

  const url = editingPlanId
    ? `${BASE_URL}/plans/${editingPlanId}`
    : `${BASE_URL}/plans`;

  const method = editingPlanId ? "PUT" : "POST";

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

// EDIT PLAN
async function editPlan(id) {
  editingPlanId = id;
  modalTitle.innerText = "Edit Plan";

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

// DELETE PLAN
async function deletePlan(id) {
  if (!confirm("Delete this plan?")) return;

  await fetch(`${BASE_URL}/plans/${id}`, {
    method: "DELETE",
    headers: authHeader()
  });

  loadPlans();
}

loadPlans();
