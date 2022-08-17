let page = 0;
let allPetsLength;
let allMyPets;

const petDisplay = document.querySelector(".pet-frame");

async function getUsername() {
  const get = await fetch("/getUsername");
  const result = await get.json();

  const username = result["username"];

  document.getElementById("userID").innerHTML = username;
}

getUsername();

async function displayPets() {
  const get = await fetch("/showAllPets");
  const result = await get.json();

  const allPets = result["allPetInfo"]; // array of pet info or none

  console.log(allPets);

  if (allPets == "noPets") {
    petDisplay.innerHTML += "no pets";
    return;
  }

  // allPets = [{petName : "bobo", id :2}, {petName: "yoyo", id:5}, {petName:"dodo", id:7}]

  allMyPets = allPets;

  allPetsLength = allPets.length;

  petDisplay.innerHTML = `<div class="pet-frame"><a href="./app.html?petId=${allPets[0]["id"]}">${allPets[0]["petName"]}</a></div>`;

  //   for (let pet of allPets) {
  //     const petName = pet["petName"];
  //     const petId = pet["id"];

  //     petDisplay.innerHTML += `<div class="pet-frame"><a href="./app.html?petId=${petId}">${petName}</a></div>`;
  //   }
}

displayPets();

// CAROUSEL BUTTONS

document
  .querySelector(".carousel_button_left")
  .addEventListener("click", () => {
    console.log("allPetsLength:", allPetsLength);
    console.log("page:", page);

    if (allPetsLength !== undefined && allMyPets !== undefined) {
      if (page > allPetsLength - 2) {
        console.log(
          "page is greater than allPetsLength:",
          page > allPetsLength
        );
        page = 0;
      } else {
        page += 1;
      }

      petDisplay.innerHTML = `<div class="pet-frame"><a href="./app.html?petId=${allMyPets[page]["id"]}">${allMyPets[page]["petName"]}</a></div>`;
      console.log("page afterwards:", page);
    } else {
      return;
    }
  });

// document
//   .querySelector(".carousel_button_right")
//   .addEventListener("click", () => {
//     if (allPetsLength !== undefined && allMyPets !== undefined) {
//       page += 1;

//       if (page < 0) {
//         console.log("page is less than 0:", page < 0);
//         page = 0;
//       } else {
//         page -= 1;
//       }

//       petDisplay.innerHTML = `<div class="pet-frame"><a href="./app.html?petId=${allMyPets[page]["id"]}">${allMyPets[page]["petName"]}</a></div>`;
//     } else {
//       return;
//     }
//   });

// getUsername();
// displayPets();
