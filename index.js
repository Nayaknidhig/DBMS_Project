const express = require("express");
const app = express();
const body = require("body-parser");
const mysql = require("mysql");

//-----------------------------------------------------------------------------------//

//For Parsing Response Body
app.use(
    body.urlencoded({
        extended: true,
    })
);

//------------------------------------------------------------------//

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

//------------------------------------------------------------------//

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
});

//------------------------------------------------------------------//

app.get("/newHome", (req, res) => {
    let loginMail = req.query.logMail;
    let loginPass = req.query.logPass;
    let signupMail = req.query.regMail;
    let signupPass = req.query.regPass;
    let signupName = req.query.regName;
    if(loginMail === undefined){
        //user signed up
        //check if regMail is in the DB already
        //if it isnt, then enter regMail,regPass,regName to DB
        //if it exists, ask user to log in and go to /homenew
        res.render('homenew',{});
    } else if(signupMail === undefined) {
        // user logged in
        //check if logMail exists in DB
        //if it doesnt, then ask user to Register
        //if it exists, go to /homenew
        res.render('homenew',{});
    }
//let sql = "INSERT INTO `user`() VALUES('" + name + "','" + email + "','" + password + "');";
    //con.query(sql, (err,result) => {
    //     if (err) throw err;
    //     console.log(result[0].fullname)
    // });
});

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