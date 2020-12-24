const express = require("express");
const app = express();
const https = require("https");
const bodyP = require("body-parser");
//const fileupload = require("express-fileupload")
const mysql = require("mysql");
const dotenv = require('dotenv');


//Setup env variables
dotenv.config();

//-----------------------------------------------------------------------------------//

//For Parsing Response Body
app.use(
    bodyP.urlencoded({
        extended: true,
    })
);


//Connect To MySQL
//Use createPool to auto close MySQL Connections
let con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "nidhi@123",
    database: "artgalleria",
    multipleStatements: true
});

//Register an EJS View Engine
app.set("view engine", "ejs");

//For Initializing all Project Files in DIR
app.use(express.static(__dirname));


app.get("/", (req, res) => {
    let name = req.query.name;
    let email = req.query.email;
    let password = req.query.password;
    // let sql = "INSERT INTO `user`(`fullname` ,`email` , `password` ) VALUES('" + name + "','" + email + "','" + password + "','" + "');";
    // // let sql = "SELECT * FROM `user` where name ='" + name + "'; ";
    // con.query(sql, (err,result) => {
    //     if (err) throw err;
    //     console.log(result[0].fullname)
    // });
    res.sendFile(__dirname + "/views/home.html");
});
//------------------------------------------------------------------//


//------------------------------------------------------------------//

app.get("/myPage", (req, res) => {
    res.render('mypage',{

    });
});

//------------------------------------------------------------------//

app.get("/registration", (req, res) => {
    res.render("registration",{});
});

//------------------------------------------------------------------//

//Server Launch at Port 777
app.listen(process.env.PORT || 777, () => {
    console.log("Server is Running at localhost:777");
});

//------------------------------------------------------------------//