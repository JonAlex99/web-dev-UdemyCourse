import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "GtSUXV@D%gF6jv",
  port: 5432,
});

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  var email = req.body.username;
  var password = req.body.password;

  try{
    const result = await db.query("INSERT INTO users(email, password) values ($1, $2)", [email, password]);
    console.log(result)
    res.render("secrets.ejs")
  } catch(err) {
    console.error("There was an error inserting the new user", err)
    res.send("Error making account")
  }
});

app.post("/login", async (req, res) => {
  var email = req.body.username;
  var password = req.body.password;

  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, password])
    console.log(result.rows)
    if(result.rows.length > 1 || result.rows.length === 0){
      res.send("Account error");
    }
    else {
      res.render("secrets.ejs")
    }

  } catch (err) {
    console.error("There was an error", err)
    res.send("error")
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
