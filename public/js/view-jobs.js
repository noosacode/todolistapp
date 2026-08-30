async function loadUsers() {
  try {
    const response = await fetch("/api/users", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status === 401 || response.status === 400) {
      window.location.href = "/";
      return;
    }

    const users = await response.json();

    const select = document.getElementById("user-select");

    select.innerHTML = '<option value="">-- Select a user --</option>';

    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.username;
      option.textContent = user.username;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

async function loadJobsForUser(username) {
  const container = document.getElementById("jobs");

  container.innerHTML = "";

  if (!username) {
    return;
  }

  try {
    const response = await fetch(`/api/jobs/user/${username}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status === 401 || response.status === 400) {
      localStorage.removeItem("token");
      alert("Your session has expired. Please log in again.");
      window.location.href = "/";
      return;
    }

    const jobs = await response.json();

    if (!response.ok) {
      console.error(jobs);
      return;
    }

    if (jobs.length === 0) {
      container.innerHTML = "<p>No jobs found for this user.</p>";
      return;
    }

    jobs.forEach((item) => {
      const div = document.createElement("div");

      const dateAdded = item.dateAdded
        ? new Date(item.dateAdded).toLocaleDateString()
        : "";

      div.innerHTML = `
            <h3>${item.title || "(No title)"}</h3>
            <p>${item.description || ""}</p>
            <p><em>Added: ${dateAdded}</em></p>
            <hr>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
  }
}

document.getElementById("user-select").addEventListener("change", (e) => {
  loadJobsForUser(e.target.value);
});

if (!localStorage.getItem("token")) {
  window.location.href = "/";
} else {
  loadUsers();
}
