// HINTS:
// 1. Import express and axios
import axios from "axios"
import express from "express"

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random"

// 3. Use the public folder for static files.
app.use(express.static("public"))

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try{
        const result = await axios.get(API_URL);
        const secret = result.data.secret
        const username = result.data.username
        res.render("index.ejs", {secret: secret, user: username})
    } catch (e){
        res.render("index.ejs", {secret: "There was an ERROR", user: JSON.stringify(e.response.data)})
    }
})


// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`listening to port: ${port}`)
})
