import express from "express";
import bodyParser from "body-parser";
import TCGdex from "@tcgdex/sdk";

const app = express();
const port = 3000;
const tcgdex = new TCGdex('en')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", async (req, res) => {
    try{
        const sets = await tcgdex.fetch("sets");
        res.render("index.ejs", { sets: sets })
    } catch (ex) {
        console.log(ex.message);
        res.status(500)
    }
})

app.get("/getSets", async (req, res) =>{
    const selectedSet = req.query.tcgsets
    try{
        const set = await tcgdex.fetch("sets", selectedSet)
        res.render("setSelected.ejs", { set: set })
    } catch (ex) {
        console.log(ex.message);
        res.status(500)
    }
})

app.get("/getCard", async (req, res) => {
    const selectedCard = req.query.tcgcard
    try{
        const card = await tcgdex.fetch("cards", selectedCard)
        res.render("cardSelected.ejs", {card: card})
    } catch (ex) {
        console.log(ex.message);
        res.status(500)
    }
})

app.listen(port, () =>{
    console.log(`Listening to PORT: ${port}`)
})