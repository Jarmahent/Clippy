const Database = require('better-sqlite3');

export default class DbHandler {
  constructor() {
    this.dbConnection = new Database('./copydata.db'); // Make sure to have the location of the db relative to the main.dev.js file
  }

  insertClipboard(data, date) {
    try {
      this.dbConnection.exec(
        `INSERT INTO copyData (data, date) VALUES ('${data}', '${date}')`
      );
      this.dbConnection.close();

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

// const db = new DbHandler();
// console.log(db.getAllData());
// db.insertClipboard('datahere', 'datehere');
