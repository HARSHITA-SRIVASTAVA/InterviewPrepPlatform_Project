const express=require("express");
const app=express()

//middleware
app.use(express.json());

//test route
app.get("/",(req,res)=>{
    res.send("Server running");
});

//another route
app.get("/api/test",(req,res)=>{
    res.json({message:"API working"});
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});

app.post("/api/test", (req, res) => {
    res.json({
        message: "POST API working",
        data: req.body
    });
});