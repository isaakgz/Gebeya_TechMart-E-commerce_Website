import express from "express";
const port = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("wellocme");
});



app.listen(port, ()=>{
    console.log(`server is listing on ${port}`)
})