let btnStart, btnListening, btnNext, pTrans, pSent, selDif;
btnStart = document.getElementById('btn-start');
btnListening = document.getElementById('btn-listening');
btnNext = document.getElementById('btn-next');
pTrans = document.getElementById('transcription');
pSent = document.getElementById('sentence');
selDif = document.getElementById("sel-dif");

window.addEventListener('DOMContentLoaded', initEnglishSentences());
window.addEventListener('DOMContentLoaded', initSpeachRecognition());

function initEnglishSentences() {
  let easyMap, mediumMap, hardMap, difMap, opt, started;
  started = false;
  easyMap = new Map();
  mediumMap = new Map();
  hardMap = new Map();

  fillMaps(easyMap, mediumMap, hardMap);

  selDif.addEventListener("change", event =>{
    opt = selDif.options[selDif.selectedIndex].value;
    switch (opt) {
      case 'Easy':
        difMap = new Map(easyMap);
        break;
      case 'Medium':
        difMap = new Map(mediumMap);
        break;
      case 'Hard':
        difMap = new Map(hardMap);
        break;
      default:
        break;
    }
  });

  let key, size;

  btnStart.addEventListener('click', event => {
    key = 0
    if (difMap === undefined) {
      difMap = new Map(easyMap);
    }
    pSent.textContent = "";
    pSent.textContent = difMap.get(key);
    btnNext.disabled = false;
    size = difMap.size;
    console.log(key);
    console.log(size);
  });

  btnNext.addEventListener('click', event => {
    key++;
    if(key < size) {
      pSent.textContent = difMap.get(key);
    } else {
      pSent.textContent = 'Congratulations, you finished this difficulty!';
    }
    console.log(key);
    console.log(size);
  });
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

function fillMaps(easyMap, mediumMap, hardMap) {
  easyMap.set(0, 'Thank you so much.');
  easyMap.set(1, 'I really appreciate your help.');
  easyMap.set(2, 'I am sorry for being so late.');
  easyMap.set(3, 'What do you think?');
  easyMap.set(4, 'That sounds great.');
  easyMap.set(5, 'Nice to meet you.');
  easyMap.set(6, 'Hi, my name is Karen.');
  easyMap.set(7, 'What do you do?');
  easyMap.set(8, 'How are you today?');
  easyMap.set(9, 'See you later!');

  mediumMap.set(0, 'Excuse me sir, you dropped your wallet.');
  mediumMap.set(1, 'I’ll be with you in a moment.');
  mediumMap.set(2, 'Actually, I thought he wasn’t working at all this week.');
  mediumMap.set(3, 'He’s ambivalent about quitting his job to start his own business.');
  mediumMap.set(4, 'I’d like to hear your thoughts on that.');
  mediumMap.set(5, 'Sorry I thought our meeting was on Thursday next week, not Wednesday.');
  mediumMap.set(6, 'I’m afraid I don’t agree with you on that.');
  mediumMap.set(7, 'They’ve never given it much thought.');
  mediumMap.set(8, 'I’d love to, but I have another commitment.');
  mediumMap.set(9, 'I can’t stand it when the internet is slow.');

  hardMap.set(0, 'The first thing I did when I woke up on my first morning in Cambridge was take a look out of the window.');
  hardMap.set(1, 'I went out to find some breakfast and walk among this cycling frenzy.');
  hardMap.set(2, 'I remember having a chat with a Turkish friend of mine who had lived in the UK.');
  hardMap.set(3, 'She’s flying high after the successful product launch.');
  hardMap.set(4, 'He’s pumped up for his first half-marathon race this weekend.');
  hardMap.set(5, 'He’s been living in fool’s paradise since he started trading stocks');
  hardMap.set(6, 'I always feel down in the dumps when I go back to work after a long weekend.');
  hardMap.set(7, 'I’m going to have the first meeting with a big client tomorrow, and I’m feeling butterflies in my stomach.');
  hardMap.set(8, 'I puzzled over the assignment for a few days before I decided to ask my professor for clarification.');
  hardMap.set(9, 'did I tell you that I’ve got a trip planned later in the year?');
}


/*function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
let mySentences;
loadJSON(function(response) {
// Parse JSON string into object
  mySentences = JSON.parse(response);
});


//let mySentences = JSON.parse(sentences);
console.log(mySentences);
*/
