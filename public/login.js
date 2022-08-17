document
  .querySelector(".loginFrom")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formObject = {};
    formObject["username"] = form.username.value;
    formObject["password"] = form.password.value;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();

    document.getElementById("responseError").innerHTML = result;

    setTimeout(() => {
      document.getElementById("responseError").innerHTML = "";
    }, 2000);
  });
