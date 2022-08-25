    //  INIT SpeechSynthesis API
const synth = window.speechSynthesis;

    //  DOM Elements
const textForm = document.querySelector('form');
const body = document.querySelector('body');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const iconsContainer = document.querySelector('.icons-container');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const stop = document.querySelector('#stop');
const wave = document.querySelector('.wave');
const speakBtn = document.querySelector('#speakBtn');


    //  INIT Voices Array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();    
    // Loop through the voices and create element for each one
    for(let v of voices) {
        //  Creating element
        const option = document.createElement('option');
        //  Fill option with language and voices
        option.textContent = v.name + ' '+ '(' + v.lang + ')';
        //  Set needed attributes
        option.setAttribute('data-name', v.name);
        option.setAttribute('data-lang', v.lang);
        voiceSelect.appendChild(option);
    }
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}


    //  SPEAK
const speak = () => {    
    // check if speaking
    if(synth.speaking) {               
        alert('already speaking..');
        return;
    }
    if(textInput.value !== '') {
        //  ADD background animation
        wave.innerHTML = `<img src="img/wave.gif" id="wave"> `;
        //  Display control icons
        iconsContainer.style.display = 'block';
        //  Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //  Speak end
        speakText.onend = (e) => {                        
            wave.innerHTML = `<img src="img/blackspace.svg" id="wave"> `;
            iconsContainer.style.display = 'none';
            speakBtn.style.display = 'inline';
        }
        //  Speak pause
        speakText.onpause = (e) => {
            iconsContainer.style.display = 'block';
            wave.innerHTML = `<img src="img/blackspace.svg" id="wave"> `;
        }
        //  Speak error
        speakText.onerror = (e) => {
            alert('something went wrong..');            
        }
        //  Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
         //  Loop through voices 
        voices.forEach((voice) => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }      
        });    
      //  Set pitch and rate
      speakText.rate = rate.value;
      speakText.pitch = pitch.value;
      //  Speak
      synth.speak(speakText);
    }
    
    else {
        alert('Enter text to speak');
        window.location.reload();
    }
};


//  EVENT LISTENER

        // Text form submit
    textForm.addEventListener('submit', (e) => {
        e.preventDefault();    
        speak();    
        textInput.blur();
        speakBtn.style.display = 'none';
    });

    // Rate value Change
    rate.addEventListener('change', (e) => {
        rateValue.textContent = rate.value;
    });

    // Pitch value Change
     pitch.addEventListener('change', (e) => {
        pitchValue.textContent = pitch.value;
    });

    // voice select Change
     voiceSelect.addEventListener('change', (e) => {
        speak();
    });


    //  Audio Controls
                //play
    play.addEventListener('click', () => {
        play.style.display = 'none';
        pause.style.display = 'inline';
        wave.innerHTML = `<img src="img/wave.gif" id="wave"> `;       
        synth.resume();
    });
                //pause
    pause.addEventListener('click', () => {
        play.style.display = 'inline';
        pause.style.display = 'none';
        wave.innerHTML = `<img src="img/blackspace.svg" id="wave"> `;
        synth.pause();        
    });
                //stop
    stop.addEventListener('click', () => {
        synth.cancel();
        window.location.reload();
    });