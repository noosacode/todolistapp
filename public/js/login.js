const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      document.getElementById("logout-btn").style.display = "inline-block";
      document.getElementById("jobs-area").style.display = "block";
      loadJobs();
      alert("Login successful!");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
});
