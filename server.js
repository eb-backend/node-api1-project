//!SERVER WITH EXPRESS

//this is pulling the dependencay from "node modules"
const express = require("express")
const db= require("./database")

const server= express() //adds routing, allows for json format

//* middleware to help us parse JSON request body
server.use(express.json())
//*cors middleware
server.use(cors())

//routing
server.get("/", (req,res)=>{
    //send back some json
    res.json({message:"hello, world"})
})

server.get("/api/users", (req, res)=>{
    
    //get list of users from fake ds
    const users = db.getusers()
    if(users){
        res.status(200).json(users)
    }
    else{
        res.status(500).json({error: "the post info could not be found"})
    }

})

//specify route parameters
server.get("/api/users/:id", (req, res)=>{
    //expresses defines route paramters
    const id = req.params.id
    const user = db.getUserById(id)

    //CHECK IF USER EXISTS
    user? res.status(200).json(user): res.status(404).json({message: "User not found"})

})

server.post("/api/users", (req,res)=>{
    const post = req.body
    const {name, bio}=req.body
    if (name && bio){
        const newuser= db.createUser({
            //get data from req data
            name: req.body.name,
            bio:req.body.bio
        })
        res.status(201).json(newuser)
    } 
    else if (!post){
        res.status(500).json({message:"there was an error in the database"})
    }
    else {
        res.status(400).json({message: "Please provide name and bio"})
    }

})

server.put("/api/users/:id", (req,res)=>{
    // const user= db.getUserById(req.params.id)
    const post = req.body
    const {name, bio}=req.body
    if (name || bio ){
        const newuser= db.updateUser(req.params.id, req.body)
        res.status(200).json(newuser)
    } 
    else if (!post){
        res.status(500).json({message:"there was an error in the database"})
    }
    else {
        res.status(400).json({message: "Please provide name and bio"})
    }
})

server.delete("/api/users/:id", (req, res)=>{
        //check if user exists
    // const user= db.getUserById(req.params.id)
    const id = req.params.id
    const user = db.getUserById(id)

    if (user){
        db.deleteUser(req.params.id)
        res.status(204).json(user)
    }else{
        res.status(404).json({message: "User not found"})
    }
        
    


})
//to start server
port=8080  //port range is all the way from 1000 to 65,000
server.listen(port, ()=>{
    console.log(`server starter on port ${port}`)
})

//*type node server or node server.js in therminal