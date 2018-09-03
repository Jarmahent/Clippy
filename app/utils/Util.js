/* eslint-disable */
export default class MiscUtil {
  removeDuplicates(array) {
    return array.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }
}
