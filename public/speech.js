function SpeechRecog() {
  var output = document.getElementById("output");
  var action = document.getElementById("action");
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    action.innerHTML = "<small>listening, please speak...</small>";
  };

  recognition.onspeechend = function () {
    action.innerHTML = "<small>stopped listening, hope you are done...</small>";
    recognition.stop();
  };

  // This runs when the speech recognition service returns result
  recognition.onresult = async function (event) {
    var transcript = event.results[0][0].transcript;
    var confidence = event.results[0][0].confidence;
    output.value = transcript;

    const request = await fetch(
      `http://127.0.0.1:8080/query_string?a=${transcript}`
    );
    const response = await request.json();
    console.log(response);
    const sentiment = document.querySelector("#sentiment");
    sentiment.innerHTML = response;

    // const speechTest = await fetch("/speechTest", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ content: transcript }),
    // });
    // const response = await speechTest.json();
    // console.log(response);
  };

  // start recognition
  recognition.start();
}

const submitPhoto = document
  .querySelector("#sendPhoto")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

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
      `https://smart-chipy.callings.me/analyzePhoto?a=${response["filename"]}`
    );

    const whatFruit = await analysePhoto.json();

    console.log(whatFruit["result"]);
  });
