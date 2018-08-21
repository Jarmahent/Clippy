const Database = require('better-sqlite3');

class DbHandler {
  constructor() {
    this.dbConnection = new Database('copydata.db'); // Make sure to have the location of the db relative to the main.dev.js file
  }

  insertClipboard(...args) {
    try {

      let parseString = args.map((data) => `'${data}'`).join(',') //Map every argument to '(?)'

      this.dbConnection.exec(
        `INSERT INTO copyData (data, date) VALUES (${parseString})`
      );
      console.log(parseString)

      // console.log(Object.getOwnPropertyNames(this.dbConnection.exec))
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

  closeConnection(){
    try{
      this.dbConnection.close();
    }catch(err){
      throw err;
    }
  }

}

const db = new DbHandler();
// console.log(db.getAllData());
console.log(db.insertClipboard('', 'datehere'));
