import {
  FIRST_ROW, SECOND_ROW, THIRD_ROW, FOURTH_ROW, FIFTH_ROW,
} from './keysData.js';

class Keyboard {
  constructor() {
    this.firstRow = FIRST_ROW;
    this.secondRow = SECOND_ROW;
    this.thirdRow = THIRD_ROW;
    this.fourthRow = FOURTH_ROW;
    this.fifthRow = FIFTH_ROW;
  }

  static createKeysRow = (row) => {
    const keysRow = document.createElement('div');
    keysRow.className = 'row';

    for (let i = 0; i < row.length; i++) {
      const key = document.createElement('button');
      key.className = 'key';
      key.textContent = Object.values(row[i])[0].name;
      keysRow.append(key);
    }

    return keysRow;
  };

  render = () => {
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    const firstRow = Keyboard.createKeysRow(this.firstRow);
    keyboard.append(firstRow);

    const secondRow = Keyboard.createKeysRow(this.secondRow);
    keyboard.append(secondRow);

    const thirdRow = Keyboard.createKeysRow(this.thirdRow);
    keyboard.append(thirdRow);

    const fourthRow = Keyboard.createKeysRow(this.fourthRow);
    keyboard.append(fourthRow);

    const fifthRow = Keyboard.createKeysRow(this.fifthRow);
    keyboard.append(fifthRow);

    return keyboard;
  };
}

export default Keyboard;
