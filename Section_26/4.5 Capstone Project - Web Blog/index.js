import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var blogPosts = [];
let id = 0;

app.get("/", (req, res) =>{
    res.render("index.ejs", { blogPosts: blogPosts })
})

app.get("/blog/create", (req, res) =>{
    res.render("blog.ejs", {create: true})
})

app.post("/blog/create", (req, res) =>{
    const {title, content} = req.body

    blogPosts.push({id, title, content})
    id += 1;
    res.redirect("/")
})

app.get("/blog/:id", (req,res) =>{
    const blogId = req.params.id;
    const blog = blogPosts[blogId];

    if (blog) {
        res.render("blog.ejs", { blog: blog})
    } else {
        res.status(404).send("Blog not found /blog/:id")
    }
})

app.get("/blog/edit/:id", (req, res) =>{
    const blogId = req.params.id;
    const blog = blogPosts[blogId];

    if (blog) {
        res.render("blog.ejs", {blog: blog, edit: true})
    } else {
        res.status(404).send("Blog not found /blog/edit/:id")
    }
})
app.post("/blog/edit/:id", (req, res) =>{
    const {title, content} = req.body
    const blog = blogPosts[req.params.id]

    if (blog) {
        blog.title = title
        blog.content = content
        res.redirect("/")
    } else {
        res.status(404).send("Blog not found /blog/edit/:id")
    }
})

app.post("/blog/delete/:id", (req,res) =>{
    const blog = blogPosts[req.params.id]
    if (blog) {
        blogPosts.splice(req.params.id, 1)
        res.redirect("/")
    } else {
        res.status(404).send("Blog not found /blog/delete/:id")
    }

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
