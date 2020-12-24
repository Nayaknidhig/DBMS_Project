const express = require("express");
const app = express();
const https = require("https");
const body = require("body-parser");
//const fileupload = require("express-fileupload")
const mysql = require("mysql");
const dotenv = require('dotenv');


//Setup env variables
dotenv.config();

//-----------------------------------------------------------------------------------//

//For Parsing Response Body
app.use(
    body.urlencoded({
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
    
    res.sendFile(__dirname + "/views/home.html");
});
//------------------------------------------------------------------//

app.get("/newHome", (req, res) => {
    res.render('homenew',{

    });
});

//------------------------------------------------------------------//

app.get("/myPage", (req, res) => {
    res.render('mypage',{

    });
});

//------------------------------------------------------------------//

app.get("/registration", (req, res) => {
    let email = req.body.logmail;
    let password = req.body.logpass;
    //let sql = "INSERT INTO `user`(`fullname` ,`email` , `password` ) VALUES('" + name + "','" + email + "','" + password + "');";
    //con.query(sql, (err,result) => {
    //     if (err) throw err;
    //     console.log(result[0].fullname)
    // });
    console.log(email);
    console.log(password);


    res.render("registration",{});
});

//------------------------------------------------------------------//

//Server Launch at Port 777
app.listen(process.env.PORT || 777, () => {
    console.log("Server is Running at localhost:777");
});

//------------------------------------------------------------------//