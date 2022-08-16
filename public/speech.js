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
      `https://smart-chipy.callings.me/query_string?a=${transcript}`
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

async function python() {
  const something = "something";
  const request = await fetch(
    `https://smart-chipy.callings.me/query_string?content=${something}`
  );
  const response = await request.json();
  console.log(response);
}

python();
