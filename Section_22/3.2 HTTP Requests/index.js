import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})

app.get("/", (req, res) =>{
    res.send("Hello")
;})

app.get("/about", (req, res) =>{
    res.send("<h1>About Me</h1>");
})

app.get("/contact", (req, res) =>{
    res.send("<h1>Call me :*</h1>");
})