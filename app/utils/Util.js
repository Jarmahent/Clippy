/* eslint-disable */
export default class MiscUtil {
  removeDuplicates(array) {
    return array.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }

  generateName() {
    let name = '';
    let list = 'abcdefghijklmnopqrxtuvqxyz1234567890#%$';
    for (let i = 0; i < 7; i++) {
      name += list.charAt(Math.floor(Math.random() * list.length));
    }
    return name;
  }
}
