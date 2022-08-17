// let petName;
// let mood;
// let foodScore;
// let talkScore;
// let brightnessScore;
// let cleanScore;
// let playScore;
// let totalScore;
// let juvenileSprite;
// let adultSprite;
// let isAdult;

let foodScore;
let talkScore;
let cleanScore;
let playScore;

let isClean = true;
let isHungry = false;
let timer;

// ANIMATION

const spriteContainer = document.querySelector(".sprite-container");
const sprite = document.querySelector("#sprite");
const doodySprite = document.querySelector("#doody");

let defaultLeft = 30;
let defaultTop = 200;
let defaultSpritePosition = 0;
let defaultDoodyPosition = 0;

function spriteChange() {
  if (defaultSpritePosition == 0) {
    defaultSpritePosition = -250;
  } else {
    defaultSpritePosition = 0;
  }
  sprite.style["left"] = `${defaultSpritePosition}px`;
}

function doodyChange() {
  if (defaultDoodyPosition == 0) {
    defaultDoodyPosition = -100;
  } else {
    defaultDoodyPosition = 0;
  }
  doodySprite.style["left"] = `${defaultDoodyPosition}px`;
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
      if (defaultLeft > 200) {
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
      if (defaultTop > 400) {
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
setInterval(doodyChange, 500);

function doody() {
  const doody1 = document.querySelector("#doody1");
  doody1.classList.remove("hidden");
  isClean = false;
}

function hungry() {
  isHungry = true;
}

setInterval(countDownTimer, 10000);

function countDownTimer() {
  doody();
  hungry();
}

// submit to the server via ajax

document
  .querySelector(".playerButton")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/playWithPet", {
      method: "POST",
    });
    const result = await res.json();
  });

// EAT BUTTON
const addPhotoPopup = document.querySelector(".add-photo-popup");

document.querySelector(".eatButton").addEventListener("click", function () {
  addPhotoPopup.classList.remove("hidden");
});

const submitPhoto = document
  .querySelector("#sendPhoto")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    addPhotoPopup.classList.add("hidden");

    const input = document.querySelector('input[type="file"]');

    var data = new FormData();
    data.append("file", input.files[0]);

    const saveFile = await fetch("/receiveFruit", {
      method: "POST",
      body: data,
    });

    const response = await saveFile.json();
    console.log(response["filename"]);

    const analysePhoto = await fetch(
      `https://smart-chipy.callings.me/analysePhoto?a=${response["filename"]}`
    );

    const whatFruit = await analysePhoto.json();

    console.log(whatFruit["result"]);

    if (whatFruit["result"] === "apple" || whatFruit["result"] === "orange") {
      const res = await fetch("/eatUpdate", {
        method: "POST",
      });
      const result = await res.json();

      isHungry = false;
    }
  });

// clean BUTTON
document
  .querySelector(".arButton")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/cleanUpdate", {
      method: "POST",
    });
    const result = await res.json();

    const doodyArr = document.querySelectorAll(".doody-container");

    for (const doody of doodyArr) {
      doody.classList.add("hidden");
      isClean = true;
    }
  });

// SPEECH FUNCTION

function SpeechRecog() {
  var output = document.getElementById("output");
  var action = document.getElementById("action");
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    console.log("listening");
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  recognition.onspeechend = function () {
    console.log("done recording");
    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = async function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    output.value = transcript;

    const request = await fetch(
      `https://smart-chipy.callings.me/query_string?a=${transcript}`
    );
    const response = await request.json();

    if (response == "positive") {
      const res = await fetch("/speechUpdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          body: JSON.stringify("positive"),
        },
      });
      const content = await res.text();
    } else {
      console.log("negative");
    }

    const sentiment = document.querySelector("#sentiment");
    sentiment.innerHTML = response;
  };

  // start recognition
  recognition.start();
}
