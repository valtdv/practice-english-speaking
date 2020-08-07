let btnListening, btnNext, pTrans, pSent;
btnListening = document.getElementById('btn-listening');
btnNext = document.getElementById('btn-next');
pTrans = document.getElementById('transcription');
pSent = document.getElementById('sentence');

pTrans.textContent = ""
pSent.textContent = ""

window.addEventListener('DOMContentLoaded', initEnglishSentences());
window.addEventListener('DOMContentLoaded', initSpeachRecognition());

function initEnglishSentences() {

}

function initSpeachRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    pSent.textContent = 'Your browser doesn\'t support Speech Recognition :(';
    btnNext.style.visibility = 'hidden';
    btnListening.style.visibility = 'hidden';
  } else {
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 2;
    recognition.lang = 'en-US';

    let recognizing = false;

    const onStart = () => {
      recognition.start();
      btnListening.textContent = 'Stop listening';
      btnListening.style.color = '#F22248';
      btnListening.style.backgroundColor = '#F2D06B';
    }

    const onStop = () => {
      recognition.stop();
      btnListening.textContent = 'Start listening';
      btnListening.style.color = '#F2D06B';
      btnListening.style.backgroundColor = '#F22248';
    };

    //We set some variables to simulate a typewriter effect
    let i = 0;
    let speed = 50;

    const onResult = function() {
      for (const res of event.results) {
        if (res.isFinal) {
          pTrans.style = "color: black;"
        } else {
          pTrans.style = "color: gray;";
        }
        pTrans.textContent = res[0].transcript;
      }
    }

    btnListening.addEventListener('click', event => {
        recognizing ? onStop() : onStart();
        recognizing = !recognizing;
    });

    recognition.addEventListener('result', onResult);
  }
}
