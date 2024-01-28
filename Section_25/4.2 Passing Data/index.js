import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.post("/submit", (req, res) => {
  let firstName = req.body["fName"];
  let secondName = req.body["lName"];
  let letterCnt = firstName.length + secondName.length
  res.render("index.ejs", {letterNumber: letterCnt})
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
