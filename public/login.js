document
  .querySelector(".loginFrom")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/login", {
      method: "POST",
    });
    const result = await res.json();

    document.getElementById("responseError").innerHTML = result;

    setTimeout(() => {
      document.getElementById("responseError").innerHTML = "";
    }, 2000);
  });
