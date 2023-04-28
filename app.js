import Keyboard from './keyboard.js';

const page = document.getElementById('page');

const app = document.createElement('div');
app.className = 'app';
page.append(app);

const keyboard = new Keyboard();
app.append(keyboard.render());

document.addEventListener('keydown', (event) => {
  const keyId = event.code;
  const button = document.getElementById(keyId);

  if (button) {
    button.classList.add('pressed');
  }
});

document.addEventListener('keyup', (event) => {
  const keyId = event.code;
  const button = document.getElementById(keyId);

  if (button) {
    button.classList.remove('pressed');
  }
});
