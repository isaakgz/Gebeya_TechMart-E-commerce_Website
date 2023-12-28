import express from "express";
import products from "./data/products.js";
const port = 5000;


const app = express();

app.get("/", (req, res) => {
  res.send("wellocme");
});

app.get("/api/products", (req, res)=>{
  res.json(products)
})

app.get("/api/products/:id", (req, res)=>{
  const product = products.find((p)=>p._id ===req.params.id)
  res.send(product)
})

app.listen(port, ()=>{
    console.log(`server is listing on ${port}`)
})