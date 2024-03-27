import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "GtSUXV@D%gF6jv",
  port: 5432,
})

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems(){
  const result = await db.query("SELECT * from items ORDER BY id ASC")
  return result.rows
}

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: await getItems(),
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  if(item) await db.query("INSERT INTO items (title) values ($1)", [item])
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const{updatedItemId, updatedItemTitle} = req.body
  await db.query("UPDATE items set title = $1 WHERE id = $2", [updatedItemTitle, Number(updatedItemId)])
  res.redirect("/")
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [Number(itemId)])
  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
