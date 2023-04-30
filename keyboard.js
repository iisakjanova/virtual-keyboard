import {
  FIRST_ROW, SECOND_ROW, THIRD_ROW, FOURTH_ROW, FIFTH_ROW, KEYS_TO_IGNORE_VALUE,
} from './keysData.js';

class Keyboard {
  constructor(container, onKeyClick) {
    this.firstRow = FIRST_ROW;
    this.secondRow = SECOND_ROW;
    this.thirdRow = THIRD_ROW;
    this.fourthRow = FOURTH_ROW;
    this.fifthRow = FIFTH_ROW;
    this.capitalization = false;
    this.onKeyClick = onKeyClick;
    this.container = container;
  }

  createKeysRow = (row) => {
    const keysRow = document.createElement('div');
    keysRow.className = 'row';

    for (let i = 0; i < row.length; i++) {
      const key = document.createElement('button');
      key.className = 'key';
      key.id = Object.keys(row[i]);
      const { name, shiftName } = Object.values(row[i])[0];
      const label = this.capitalization && shiftName ? shiftName : name;
      key.textContent = label;

      if (key.id === 'Space') {
        key.classList.add('space');
      }

      keysRow.append(key);
    }

    return keysRow;
  };

  handleShiftDown = (id) => {
    this.capitalization = true;
    this.updateKeyboard();
    const keyShift = document.getElementById(id);
    keyShift.classList.add('pressed');
  };

  handleShiftUp = () => {
    this.capitalization = false;
    this.updateKeyboard();
  };

  handleCapsLockUp = () => {
    this.capitalization = !this.capitalization;
    this.updateKeyboard();
  };

  handleCapsLockDown = (id) => {
    this.capitalization = !this.capitalization;
    this.updateKeyboard();
    const key = document.getElementById(id);
    key.classList.add('pressed');
  };

  updateKeyboard = () => {
    if (this.keyboard) {
      this.container.removeChild(this.keyboard);
    }

    this._render();
  };

  render = () => {
    this._render();
    this.addEvents();
  };

  _render = () => {
    this.keyboard = document.createElement('div');
    this.keyboard.className = 'keyboard';

    const firstRow = this.createKeysRow(this.firstRow);
    this.keyboard.append(firstRow);

    const secondRow = this.createKeysRow(this.secondRow);
    this.keyboard.append(secondRow);

    const thirdRow = this.createKeysRow(this.thirdRow);
    this.keyboard.append(thirdRow);

    const fourthRow = this.createKeysRow(this.fourthRow);
    this.keyboard.append(fourthRow);

    const fifthRow = this.createKeysRow(this.fifthRow);
    this.keyboard.append(fifthRow);

    this.container.append(this.keyboard);

    this.keyboard.addEventListener('click', (event) => {
      const keyId = event.target.id;
      const button = document.getElementById(keyId);

      if (button && !KEYS_TO_IGNORE_VALUE[keyId]) {
        if (keyId === 'Space') {
          this.onKeyClick(' ');
        } else if (keyId === 'Tab') {
          this.onKeyClick('  ');
        } else {
          this.onKeyClick(event.target.innerText);
        }
      }

      if (keyId === 'CapsLock' && !this.capitalization) {
        this.handleCapsLockDown(keyId);
      } else if (keyId === 'CapsLock' && this.capitalization) {
        this.handleCapsLockUp();
      }

      if ((keyId === 'ShiftLeft' && !this.capitalization)
          || (keyId === 'ShiftRight' && !this.capitalization)) {
        this.handleShiftDown(keyId);
      } else if ((keyId === 'ShiftLeft' && this.capitalization)
                || (keyId === 'ShiftRight' && this.capitalization)) {
        this.handleShiftUp();
      }

      if (keyId === 'Enter') {
        event.preventDefault();
        this.onKeyClick('\n');
      }

      if (keyId === 'Backspace') {
        this.onKeyClick('\b');
      }
    });
  };

  addEvents = () => {
    document.addEventListener('keydown', (event) => {
      const keyId = event.code;
      const button = document.getElementById(keyId);

      // Highlight pressed button
      if (button) {
        button.classList.add('pressed');
        if (!KEYS_TO_IGNORE_VALUE[keyId]) {
          if (keyId === 'ArrowLeft'
              || keyId === 'ArrowRight'
              || keyId === 'ArrowUp'
              || keyId === 'ArrowDown') {
            this.onKeyClick(button.innerHTML);
          } else if (keyId === 'Tab') {
            event.preventDefault();
            this.onKeyClick('  ');
          } else {
            this.onKeyClick(event.key);
          }
        }
      }

      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.handleShiftDown(event.code);
      }

      if (event.code === 'CapsLock') {
        this.handleCapsLockDown(event.code);
      }

      if (event.code === 'Enter') {
        event.preventDefault();
        this.onKeyClick('\n');
      }
      if (event.code === 'Backspace') {
        this.onKeyClick('\b');
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyId = event.code;
      const button = document.getElementById(keyId);

      // Return button to normal state
      if (button) {
        button.classList.remove('pressed');
      }

      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.handleShiftUp();
      }

      if (event.code === 'CapsLock') {
        this.handleCapsLockUp();
      }
    });
  };
}

export default Keyboard;
