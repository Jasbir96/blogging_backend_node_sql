const mysql=require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function(err,res){
    if(err){
        console.error("Error",err);
    }else{
        console.log(res);
    }
});