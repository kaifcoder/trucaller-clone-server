const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((err)=>{
  if(err){
    console.warn("error")
  }else {
    console.warn("connected")
  }
});

module.exports = connection;
