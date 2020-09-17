//!SERVER WITH EXPRESS

//this is pulling the dependencay from "node modules"
const express = require("express")
const db= require("./database")

const server= express() //adds routing, allows for json format

//* middleware to help us parse JSON request body
server.use(express.json())

//routing
server.get("/", (req,res)=>{
    //send back some json
    res.json({message:"hello, world"})
})

server.get("/users", (req, res)=>{
    
    //get list of users from fake ds
    const users = db.getusers()

    //send it back
    res.json(users)
})

//specify route parameters
server.get("/users/:id", (req, res)=>{
    //expresses defines route paramters
    const id = req.params.id
    const user = db.getUserById(id)

    //CHECK IF USER EXISTS
    // user? res.json(user): res.status(404).json({message: "User not found"})
    user && res.json(user)

    //send it back to the response
    res.json(user)

})

server.post("/users", (req,res)=>{
    const newuser= db.createUser({
        //get data from req data
        name: req.body.name
    })

    res.status(201).json(newuser)
})

server.delete("/users/:id", (req, res)=>{
        //check if user exists
    const user= db.getUserById(req.params.id)

    if (user){
        db.deleteUser(req.params.id)
        res.status(204).end()
    }
    else{
        res.status(404).json({
            message: "User not found"
        })
    }
    


})
//to start server
port=8080  //port range is all the way from 1000 to 65,000
server.listen(port, ()=>{
    console.log(`server starter on port ${port}`)
})

//*type node server or node server.js in therminal