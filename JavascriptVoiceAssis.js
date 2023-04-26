var speech = document.getElementById("inputText"),
  convert = document.getElementById("textToVoiceBtn"),
  voiceIcon = document.getElementById("voiceIcon"),
  micIcon = document.getElementById("micIcon");
count = 1;

convert.addEventListener("click", function () {
  if (!speechSynthesis.speaking || speechSynthesis.pause()) {
    speechText = speech.value;
    var speechVoice = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    speechVoice.voice = voices[2];
    speechVoice.text = speechText;
    speechVoice.lang = "en-US";
    speechSynthesis.speak(speechVoice);
  }
  if (count == 1) {
    convert.innerHTML = "Play";
    voiceIcon.innerHTML = "&#128266";
    speechSynthesis.resume();
    setTimeout(function () {
      count = 2;
    }, 300);
  } else {
    convert.innerHTML = "Pause";
    voiceIcon.innerHTML = "&#128264";
    speechSynthesis.pause();
    count = 1;
  }
  setInterval(function () {
    if (!speechSynthesis.speaking && count == 2) {
      convert.innerHTML = "Text to Speech";
      voiceIcon.innerHTML = "&#128264";
      count = 1;
    }
  }, 100);
});

// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// var recognition = new SpeechRecognition();
// var taxtbox = $("textbox");

micIcon.addEventListener("click", function () {
  const speech = true;
  window.SpeechRecognition = window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  // recognition.onstart = speech.innerHTML = "<p>Listening, please speak...</p>";
  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript);
    document.getElementById("inputText").innerHTML = transcript;
  });
  if (speech == true) {
    recognition.start();
  }
});
