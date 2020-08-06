window.addEventListener("DOMContentLoaded", () => {
  let btn = document.getElementById("btn");
  let p = document.getElementById('transcription');

  //We check to see if the browser supports the Web Speech API by checking if the SpeechRecognition object exists
  if (!('webkitSpeechRecognition' in window)) {
    //If it doesn't support the API, we suggest the user upgrades their browser
    p.textContent = 'Your browser doesn\'t support Speech Recognition :(';
  } else {
    //If it does support the API, we create a new instance of the SpeechRecognition object
    let recognition = new webkitSpeechRecognition();
    //We set the continous attribute to true, so that recognition will continue even if the user pauses while speaking.
    recognition.continuous = true;
    //We set the interimResults attribute to true,
    recognition.interimResults = true;
    //We set the lang attribute to english from the United States
    recognition.lang = 'en-US';

    let speachTranscription, recognizing;
    //We set an empty string variable in which we'll store the words said by the user
    speachTranscription = '';
    //We set a boolean variable to false, which represents if the voice of the user is being recognized
    recognizing = false;

    recognition.onstart = function() {
      recognizing = true;
      recognition.start();
      button.textContent = "Stop listening";
    }

    recognition.onStop = function() {
      recognition.stop();
      button.textContent = "Start listening";
    }

    recognition.onResult = function() {

    }

    recognition.addEventListener("result", onResult);
  }
});
