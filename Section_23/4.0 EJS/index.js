import express, { urlencoded } from "express";

const app = express();
const port = 3000;

const day = new Date().getDay();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    if (day === 0 || day === 6){
        res.render("index.ejs", { date: "It's the weekend, it's time to have fun!"} )

    }
    else {
        res.render("index.ejs", { date: "It's a weekday, it's time to work hard!"} )

    }
})

app.listen(port, () =>{
    console.log(`Running on port ${port}`);
})