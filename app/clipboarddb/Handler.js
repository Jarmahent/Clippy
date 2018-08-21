const Database = require('better-sqlite3');

export default class DbHandler {
  // Add export default for yarndev
  constructor() {
    this.dbConnection = new Database('./app/clipboarddb/copydata.db');
  }

  static parseToSingleLine(text) {
    // Replace all multilined text with ~$~
    /* eslint-disable */
    const singleLineParse = text.replace(/(?:\r\n|\r|\n)/g, '~$~');
    return singleLineParse;
  }

  static parseToMultiline(text) {
    /* eslint-disable */
    const multiLineParse = text.replace(/(\~\$\~)/g);
    return multiLineParse;
  }

  insertClipboardData(...args) {
    // Unpack args
    try {
      const statement = this.dbConnection.prepare(
        'INSERT INTO copyData (data, date) VALUES (?, ?)'
      );

      statement.run(args);

      return 1;
    } catch (err) {
      throw err;
    }
  }

  getAllData() {
    try {
      const allData = this.dbConnection.prepare('SELECT * FROM copyData').get();
      this.dbConnection.close();
      return allData;
    } catch (err) {
      throw err;
    }
  }
}
//
// const db = new DbHandler();
// console.log(db.getAllData());
// console.log(db.insertClipboardData('new', 'newdate'));
