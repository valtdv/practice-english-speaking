//We start by adding an event listener that fires as soon as initial HTML document has been completely loaded and parsed
window.addEventListener('DOMContentLoaded', init());

function init(){
  //We declare the variables that represent the most important elements of our HTML
  let btnListening, btnNext, pTrans, pSent;
  btnListening = document.getElementById('btn-listening');
  btnNext = document.getElementById('btn-next');
  pTrans = document.getElementById('transcription');
  pSent = document.getElementById('sentence');

  //We set the text content of the p elements to an empty string
  pTrans.textContent = ""
  pSent.textContent = ""

  //SPEACH RECOGNITION API SETUP

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

    //We set the onStart function, which will start the speach recognition and change the appareance of the btnListening
    const onStart = () => {
      recognition.start();
      btnListening.textContent = 'Stop listening';
      btnListening.style.color = '#F22248';
      btnListening.style.backgroundColor = '#F2D06B';
    }

    //We set the onStop function, which will stop the speach recognition and change the appareance of the btnListening
    const onStop = () => {
      btnListening.textContent = 'Start listening';
      btnListening.style.color = '#F2D06B';
      btnListening.style.backgroundColor = '#F22248';
    };

    //We set some variables to simulate a typewriter effect
    let i = 0;
    let speed = 50;

    const onResult = function() {
      for (const res of event.results) {
        const text = document.createTextNode(res[0].transcript);
        if (!res.isFinal) {
          pTrans.textContent += text.charAt(i);
          i++;
          setTimeout(onResult, speed);
        }
    }

    btnListening.addEventListener('click', event => {
      recognizing ? onStop() : onStart();
      recognizing = !recognizing;
    });

    recognition.addEventListener('result', onResult);
  }

  //UPDATING THE SENTENCES SETUP
  }
}

init();
