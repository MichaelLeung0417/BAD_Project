async function getUsername() {
  const get = await fetch("/getUsername");
  const result = await get.json();

  const username = result["username"];

  document.getElementById("userID").innerHTML = username;
}

async function displayPets() {
  const get = await fetch("/showAllPets");
  const result = result.json();

  const allPets = result["allPetInfo"]; // array of pet info

  const petDisplay = document.querySelector(".pets");
  petDisplay.innerHTML = "";

  for (let pet of allPets) {
    const petName = pet["petName"];
    const petId = pet["id"];
    petDisplay.innerHTML += `<a href="./app.html?petId=${petId}">${petName}</a>`;
  }
}

getUsername();
displayPets();
