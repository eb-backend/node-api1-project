const words= "some words of encouragement"

let users =[
    {
        name: 'Brainey',
        age: 200,
        height: '5cm',
        id: 0
      }
// {
//   id: "1", // hint: use the shortid npm package to generate it
//   name: "Jane Doe", // String, required
//   bio: "Not Tarzan's Wife, another Jane",  // String, required
// }
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
    return users
}


module.exports = {
    getusers,
    getUserById,
    createUser,
    updateUser, 
    deleteUser
}
