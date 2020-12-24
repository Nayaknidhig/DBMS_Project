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
    let loginMail = req.query.logMail;
    let loginPass = req.query.logPass;
    let signupMail = req.query.regMail;
    let signupPass = req.query.regPass;
    let signupName = req.query.regName;
    console.log(`${signupMail}...${signupPass}...${signupName}`);
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

    //let sql = "INSERT INTO `user`(`fullname` ,`email` , `password` ) VALUES('" + name + "','" + email + "','" + password + "');";
    //con.query(sql, (err,result) => {
    //     if (err) throw err;
    //     console.log(result[0].fullname)
    // });



    res.render("registration",{});
});

//------------------------------------------------------------------//

//Server Launch at Port 777
app.listen(process.env.PORT || 777, () => {
    console.log("Server is Running at localhost:777");
});

//------------------------------------------------------------------//