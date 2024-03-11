import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) =>{
  //console.log(posts)
  res.json(posts)
})

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) =>{
  const post = posts.find(x=>x.id === Number(req.params.id))
  if(!post) res.status(404).json({message: "Error getting post"})
  res.json(post)
})

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) =>{
  const {title, content, author} = req.body
  const newPost = {id: posts.length, title: title, content: content, author: author, date: new Date().toISOString()}
  posts.push(newPost)
  res.status(201).json(posts[-1])
})

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) =>{
  let postToFix = posts.find(x => x.id === Number(req.params.id))
  if (!postToFix) res.json({message: "broke"})

  postToFix.title = req.body.title
  postToFix.content = req.body.content
  postToFix.author = req.body.author

  const index = posts.findIndex(x => x.id === Number(req.params.id))
  posts[index] = postToFix;
  res.json(posts[index])
})

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req,res) =>{
  const postToDelete = posts.findIndex(x => x.id === Number(req.params.id)) 
  if(postToDelete === -1) res.status(404).json({message: "Post not found"})

  posts.splice(postToDelete, 1)
  res.json({message: "Post Deleted"})
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
