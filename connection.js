const mysql=require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_app'
});

connection.connect(function(err,res){
    if(err){
        console.error("Error",err);
    }else{
        console.log(res);
    }
});