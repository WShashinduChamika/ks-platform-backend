const fs = require('fs')
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcrypt')

//Function that load users
const loadUsers = ()=>{
   try{
       const dataBuffer = fs.readFileSync('./data/user.json')
       const dataJSON = dataBuffer.toString()
       const data = JSON.parse(dataJSON)
       return data
   }catch (e){
       console.log({error:`Error: ${e.message}`})
       return []
   }
}
//Function that save user
const saveUser = (users)=>{
    try{
        const dataJSON = JSON.stringify(users)
        fs.writeFileSync('./data/user.json',dataJSON)
        return dataJSON
    }catch (e){
        console.log({error:`Error: ${e.message}`})
        return []
    }
}

const registerUser = async(req,res)=>{

    const user = req.body
    console.log(user)

    const users = loadUsers()

    //Check weather user is already exist
    const existUser = users.find((existUser)=>{existUser.email === user.email})
    if(existUser){
        return res.status(400).send({error:"This email is already in use"})
    }

    user.id = uuidv4() // add unique id for each user
    user.password = await bcrypt.hash(user.password,8) // hash password for security

    users.push(user)
    //console.log(user)
    //console.log(users)

    const saveResult = saveUser(users)

    //Ensure weather user is saved or not
    if (saveResult){
        return res.status(201).send({message:'Success',data:user})
    }else{
        return res.status(500).send({error:"Can not save user"})
    }
}

const loginUser = async(req,res)=>{

    const {userName,password} = req.body

    const users = loadUsers()

    if (!userName && !password){
        return res.status(400).send({error:"Invalid User"})
    }

    const user = users.find((user)=> user.email === userName)//Check weather username is exist or not

    if (!user){
        return res.status(400).send({error:"Invalid User"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch){
        res.status(200).send({msg:"Success"})
    }else{
        res.status(400).send({error:"Invalid Users"})
    }

}
module.exports = {
    registerUser,
    loginUser
}


