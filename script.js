//We start by adding an event listener that fires as soon as initial HTML document has been completely loaded and parsed
window.addEventListener("DOMContentLoaded", () => {
  //We declare the first variables, which represent the most important elements of our HTML
  let btnListening, btnNext, pTrans, pSent;
  btnListening = document.getElementById("btn-listening");
  btnNext = document.getElementById("btn-next");
  pTrans = document.getElementById('transcription');
  pSent = document.getElementById('sentence');

  //We check to see if the browser supports the Web Speech API by checking if the SpeechRecognition object exists
  if (!('webkitSpeechRecognition' in window)) {
    //If it doesn't support the API we inform the user about it and hide all the buttons
    pSent.textContent = 'Your browser doesn\'t support Speech Recognition :(';
    btnNext.style.visibility = 'hidden';
    btnListening.style.visibility = 'hidden';
  } else {
    //If it does support the API, we create a new instance of the SpeechRecognition object
    let recognition = new webkitSpeechRecognition();
    //We set the continous attribute to true, so that recognition will continue even if the user pauses while speaking.
    recognition.continuous = true;
    //We set the interimResults attribute to true, so that the interim results are returned
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
