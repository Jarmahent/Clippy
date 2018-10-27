import Database from 'better-sqlite3';

export default class DbHandler {
  constructor(userDatapath) {
    this.dbConnection = new Database(`${userDatapath}/clipboard.db`);
    try {
      this.dbConnection
        .prepare(
          'CREATE TABLE IF NOT EXISTS copyData ( id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, data TEXT, date TEXT )'
        )
        .run();
    } catch (err) {
      console.log(err);
    }

    try {
      this.dbConnection
        .prepare('CREATE TABLE IF NOT EXISTS tokenData (token TEXT)')
        .run();
    } catch (err) {
      console.log(err);
    }
  }

  insertToken(token) {
    try {
      const statement = this.dbConnection.prepare(
        ' INSERT INTO tokenData (token) VALUES (?)'
      );
      const deleteStatement = this.dbConnection.prepare(
        'DELETE FROM tokenData'
      );

      deleteStatement.run();
      statement.run(token);

      return 1;
    } catch (err) {
      console.log(err);
    }
    return 0;
  }

  getAuthToken() {
    try {
      const statement = this.dbConnection
        .prepare('SELECT * FROM tokenData')
        .all();
      return statement;
    } catch (err) {
      console.log(err);
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
      throw err;
    }
  }
}

// const db = new DbHandler();
// console.log(db.getAllData());
// console.log(db.insertClipboardData('new', 'newdate'));
// console.log(DbHandler.parseToSingleLine("nothing"));
// console.log(db.removeRow("kebin"));
