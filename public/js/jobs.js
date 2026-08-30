async function loadJobs() {
  try {
    const response = await fetch("/api/jobs", {
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

    const container = document.getElementById("jobs");

    container.innerHTML = "";

    jobs.forEach((item) => {
      const div = document.createElement("div");

      const dateAdded = item.dateAdded
        ? new Date(item.dateAdded).toLocaleDateString()
        : "";

      div.innerHTML = `
            <h3>${item.title || "(No title)"}</h3>
            <p>${item.description || ""}</p>
            <p><em>Added: ${dateAdded}</em></p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <hr>
      `;

      div.querySelector(".edit-btn").addEventListener("click", () => {
        editJob(item);
      });

      div.querySelector(".delete-btn").addEventListener("click", () => {
        deleteJob(item._id);
      });

      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
  }
}

async function createJob() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  try {
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const newJob = await response.json();

    if (!response.ok) {
      console.error(newJob);
      return;
    }

    console.log("Created:", newJob);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadJobs();
  } catch (error) {
    console.error("Error creating job:", error);
  }
}

document.getElementById("create-btn").addEventListener("click", createJob);

// If a token already exists (e.g. page was refreshed), stay logged in.
if (localStorage.getItem("token")) {
  document.getElementById("jobs-area").style.display = "block";
  loadJobs();
}

async function editJob(item) {
  const title = prompt("Title:", item.title || "");
  const description = prompt("Description:", item.description || "");

  if (title === null || description === null) {
    return;
  }

  try {
    const response = await fetch(`/api/jobs/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const updatedJob = await response.json();

    if (!response.ok) {
      console.error(updatedJob);
      return;
    }

    console.log("Updated:", updatedJob);

    loadJobs();
  } catch (error) {
    console.error("Error updating job:", error);
  }
}

async function deleteJob(id) {
  try {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result);
      return;
    }

    console.log("Deleted:", result);

    loadJobs();
  } catch (error) {
    console.error("Error deleting job:", error);
  }
}
