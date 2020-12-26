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
        let sql = "SELECT * FROM user WHERE email ='" + signupMail + "'";
        //if it isnt, then enter regMail,regPass,regName to DB
        con.query(sql, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                let insertSQL = "INSERT INTO `user` (`fullName`, `email`, `password`) VALUES ('" +
                signupName +"', '"+ signupMail + "', '" + signupPass +"')";
            //if it exists, ask user to log in and go to /homenew
            con.query(insertSQL, (err) => {
                if (err) throw err;
                console.log("Successful Added User");
                res.render('homenew',{});
        });
        } else {
        res.sendFile(__dirname + "/views/Error.html");
        }
    });
    } else if(signupMail === undefined) {
        // user logged in
        console.log("User Logged In ");
        app.set('loginMail', loginMail);
        let sqlu = "SELECT * FROM user WHERE email ='" + loginMail + "'";
        let sqlp = "SELECT * FROM user WHERE password ='" + loginPass + "'";
        con.query(sqlu, (err, result) => {
            if (err) throw err;
        //check if logMail exists in DB
            if (result.length === 1) {
                console.log("User Exists in DB");
                con.query(sqlp, (err, result) => {
                    if (err) throw err;
                    if (result.length >= 1) {
                        res.render('homenew',{});
                    } else {
                        console.log("Wrong Password has been entered");
                        res.sendFile(__dirname + "/views/Error.html");
                    }
                });
        //if it doesnt, then ask user to Register
        //if it exists, go to /homenew
                res.render('homenew',{});
                }
            });
        }
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