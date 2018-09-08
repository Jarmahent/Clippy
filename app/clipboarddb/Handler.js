import Database from 'better-sqlite3';

export default class DbHandler {
  constructor(userDatapath) {
    this.dbConnection = new Database(`${userDatapath}/clipboard.db`);
    try {
      this.dbConnection
        .prepare(
          'CREATE TABLE copyData ( id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, data TEXT, date TEXT )'
        )
        .run();
    } catch (err) {
      console.log(err);
    }
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

  resetTable() {
    try {
      const statement = this.dbConnection.prepare('DELETE FROM copyData');
      statement.run();

      return 1;
    } catch (err) {
      throw err;
    }
  }

  closeConnection() {
    try {
      this.dbConnection.close();
    } catch (err) {
      throw error;
    }
  }
}

// const db = new DbHandler();
// console.log(db.getAllData());
// console.log(db.insertClipboardData('new', 'newdate'));
// console.log(DbHandler.parseToSingleLine("nothing"));
// console.log(db.removeRow("kebin"));
