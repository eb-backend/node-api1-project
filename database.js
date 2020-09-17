const words= "some words of encouragement"

let users =[
    {id: "1", name:"Jane Doe"}, 
    {id: "2", name:" KYLE XY"},
    {id: "3", name:"Hnery clarke"}
]

function getusers(){
    console.log("Hello crazy world")
    return users
}


function getUserById(id){
    return users.find(u=>u.id === id)
}

function createUser(data){
    const payload={
        id: String(users.length +1), 
        ...data
    }
    users.push(payload)
    return payload
}

function updateUser(id, data){
    const index = users.findIndex(u=>u.id ===id)
    users[index]={
        ...users[index], 
        ...data
    }
    return users[index]
}


function deleteUser(id){
    users=users.filter(u=>u.id != id)
}


module.exports = {
    getusers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser
}
