<<<<<<< HEAD
let petName;
let mood;
let foodScore;
let talkScore;
let brightnessScore;
let cleanScore;
let playScore;
let totalScore;
let juvenileSprite;
let adultSprite;
let isAudult;

// ANIMATION

const spriteContainer = document.querySelector(".sprite-container");
const sprite = document.querySelector("#sprite");

let defaultLeft = 150;
let defaultTop = 300;
let defaultSpritePosition = 0;

function spriteChange() {
  if (defaultSpritePosition == 0) {
    defaultSpritePosition = -250;
  } else {
    defaultSpritePosition = 0;
  }
  sprite.style["left"] = `${defaultSpritePosition}px`;
}

function movement() {
  const number = Math.round(Math.random());

  if (number == 0) {
    const hMove = Math.round(Math.random());

    if (hMove == 0) {
      if (defaultLeft < 0) {
        defaultLeft += 30;
      } else {
        defaultLeft -= 30;
      }
    } else {
      if (defaultLeft > 350) {
        defaultLeft -= 30;
      } else {
        defaultLeft += 30;
      }
    }
  } else {
    const vMove = Math.round(Math.random());

    if (vMove == 0) {
      if (defaultTop < 0) {
        defaultTop += 30;
      } else {
        defaultTop -= 30;
      }
    } else {
      if (defaultTop > 500) {
        defaultTop -= 30;
      } else {
        defaultTop += 30;
      }
    }
  }

  spriteContainer.style["left"] = defaultLeft + "px";
  spriteContainer.style["top"] = defaultTop + "px";
}

setInterval(movement, 500);
setInterval(spriteChange, 1000);

// submit to the server via ajax

document
  .querySelector(".eat")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = {};
    const res = await fetch("/eatUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();
  });

document
  .querySelector(".ar")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = {};
    const res = await fetch("/arUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();
  });

document
  .querySelector(".talk")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Serialize the Form afterwards
    const form = event.target;
    const formObject = {};
    const res = await fetch("/talkUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    const result = await res.json();
  });

