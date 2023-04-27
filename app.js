import Keyboard from './keyboard.js';

const page = document.getElementById('page');

const app = document.createElement('div');
app.className = 'app';
page.append(app);

const keyboard = new Keyboard();
app.append(keyboard.render());
