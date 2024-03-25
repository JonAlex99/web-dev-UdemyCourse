import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "GtSUXV@D%gF6jv",
  port: 5432,
})

let countryCodes = {}
db.connect()

async function checkVisited(){
  const query = await db.query("SELECT country_code FROM visited_countries");

  if(query.rows.length === 0) return;
  const countryCodes = query.rows.map(x => x.country_code)
  console.log(countryCodes)
  return countryCodes;
}

// db.query("SELECT country_code FROM visited_countries", (err, res) => {
//   if(err){
//     console.error("Error: there was an error getting the countries", err.stack)
//   } else {
//     countryCodes = res.rows;
//   }
//   db.end();
// })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  //Write your code here.
  const countryCodeList = await checkVisited();
  const total = countryCodes.length;
  // const countryCodeList = countryCodes.map(x => x.country_code);
  res.render("index.ejs", { countries: countryCodeList, total: total})
});

app.post("/add", async (req, res) => {
  let currentCountries = await checkVisited()
  let countriesCnt = currentCountries.length
  try{
    const visitedCountry = req.body.country
    if(!visitedCountry) throw new Error("Input field must contain an input")
    
    const dbCountry = await db.query("SELECT country_code from countries where country_name = $1", [visitedCountry])
    if(!dbCountry || dbCountry.rows.length === 0) throw new Error("Country not found")

    try{
      const result = dbCountry.rows
      const foundCountryCode = result[0].country_code
      await db.query("INSERT into visited_countries (country_code) values ($1)", [foundCountryCode])

    } catch(err) {
      throw Error("There was an error inserting the data", err.message)
    }

    res.redirect("/")
  } catch (err) {
    res.render("index.ejs", {countries: currentCountries, total: countriesCnt, error: err.message  })
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
