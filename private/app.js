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
  .querySelector(".playerButton")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/playWithPet", {
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  });

document
  .querySelector(".eat")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/eatUpdate", {
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  });

document
  .querySelector(".clean")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const res = await fetch("/cleanUpdate", {
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  });

// document
//   .querySelector(".talk")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const form = event.target;
//     const res = await fetch("/speechTest", {
//       method: "POST",
//     });
//     const result = await res.json();
//     console.log(result);
//   });

// SPEECH FUNCTION

function SpeechRecog() {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    console.log("please speak");
  };

  recognition.onspeechend = function () {
    console.log("recording stopped");
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
    console.log(response);
    const sentiment = document.querySelector("#sentiment");
    sentiment.innerHTML = response;
  };

  // start recognition
  recognition.start();
}

// const submitPhoto = document
//   .querySelector("#sendPhoto")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault();

//     const input = document.querySelector('input[type="file"]');

//     var data = new FormData();
//     data.append("file", input.files[0]);

//     const saveFile = await fetch("/receiveFruit", {
//       method: "POST",
//       body: data,
//     });

//     const response = await saveFile.json();
//     console.log(response["filename"]);

//     const analysePhoto = await fetch(
//       `https://smart-chipy.callings.me/analysePhoto?a=${response["filename"]}`
//     );

//     const whatFruit = await analysePhoto.json();

//     console.log(whatFruit["result"]);
//   });
