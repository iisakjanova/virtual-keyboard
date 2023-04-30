import Keyboard from './keyboard.js';

const page = document.getElementById('page');

const app = document.createElement('div');
app.className = 'app';
page.append(app);

const textInput = document.createElement('textarea');
textInput.className = 'textInput';
textInput.value = '';
app.append(textInput);

const keyboardKontainer = document.createElement('div');
keyboardKontainer.className = 'keyboard-container';
app.append(keyboardKontainer);

const handleKeyClick = (letter) => {
  if (letter === '\b') {
    textInput.value = textInput.value.slice(0, -1);
  } else {
    textInput.value += letter;
  }
};

const keyboard = new Keyboard(keyboardKontainer, handleKeyClick);

keyboard.render();
