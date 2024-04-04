import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import axios from "axios"

const app = express()
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BookRating",
    password: "GtSUXV@D%gF6jv",
    port: "5432"
});

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getAllBooks(){
    const result = await db.query("select b.id as book_id, b.title as book_title, b.isbn, b.review, b.rating, b.finished, a.name as author_name, a.olid, a.about as author_bio from books as b join authors as a on b.author_id = a.id")
    console.log(result.rows)
    return result.rows
}

app.get("/", async (req,res) =>{
    res.render("index.ejs", {books: await getAllBooks()});
})


app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})