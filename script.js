const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const root = document.querySelector('#root');

textarea.value = localStorage.getItem('savedText') || '';

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'ru-RU'; 
recognition.continuous = true; 

recognition.onresult = function(event) {
  const last = event.results.length - 1;
  const text = event.results[last][0].transcript;

  //Function for text typing animation" 
  function typeText(text, index = 0) {
    if (index < text.length) {
      textarea.value += text[index]; // Adding characters one by one
      setTimeout(() => typeText(text, index + 1), 50); // Delay for typing effect
    } else {
      textarea.value += '\n'; // Add a new line after the text is completed
      localStorage.setItem('savedText', textarea.value); // Saving the text
    }
  }

  typeText(text); // Starting the text typing animation
}

recognition.onerror = function(event) {
  root.textContent = "Please allow the use of the microphone!";
  console.error('Access to the microphone is denied: ' + event.error);
}

button.addEventListener('click', function() {
  if (button.classList.contains('animation')) {
    recognition.stop(); 
    button.classList.remove('animation'); 
  } else {
    recognition.start(); 
    button.classList.add('animation'); 
  }
});

textarea.addEventListener('input', function() {
  localStorage.setItem('savedText', textarea.value);
});
