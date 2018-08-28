import Database from 'better-sqlite3';
import path from 'path';

// const dbPath = path.resolve(__dirname, 'copydata.db')
const filepath = path.join(
  process.resourcesPath,
  'app/clipboarddb/copydata.db'
);

export default class DbHandler {
  // Add export default for yarndev
  constructor() {
    this.dbConnection = new Database(filepath);
  }

  static parseToSingleLine(text) {
    /* eslint-disable */
    const singleLineParse = text.replace(/(?:\r\n|\r|\n)/g, '~$~');
    return singleLineParse;
  }

  static parseToMultiline(text) {
    /* eslint-disable */
    if (text.includes('~$~') === true) {
      const multiLineParse = text.replace(/(\~\$\~)/g);
      return multiLineParse;
    } else {
      return 'No parsing neccesary';
    }
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

  getAllData(limit) {
    try {
      const statement = this.dbConnection
        .prepare('SELECT * FROM copyData ORDER BY id DESC LIMIT ?')
        .all(limit);

      return statement;
    } catch (err) {
      throw err;
    }
  }
}

// const db = new DbHandler();
// console.log(db.getAllData());
// console.log(db.insertClipboardData('new', 'newdate'));
// console.log(DbHandler.parseToSingleLine("nothing"));
