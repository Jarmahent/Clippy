const Database = require('better-sqlite3');

// let db = new Database('./copydata.db'); //Make sure to have the location of the db relative to the main.dev.js file

// INSERT INTO copyData VALUES (1, "datahere", "datehere")
// Use exec to write data nd use prepare to readt data

// console.log(db.exec("INSERT INTO copyData (data, date) VALUES ('javascriptdata', 'javascriptdate')"))
// console.log(db.prepare("SELECT * FROM copyData").get("id"))

class DbHandler {
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

const db = new DbHandler();
// console.log(db.getAllData());
db.insertClipboard('datahere', 'datehere');
