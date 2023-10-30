const User = require('../models/user')
const bcrypt = require('bcryptjs')
const{isEmail} = require('validator')


//register
const register = async (req, res) => {
    const {email, username, password, profile} = req.body
    //protecting users passwords
    //hashing and salting
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
  try {
    const createdUser = await User.create({email, 
        username, 
        password: hashedPassword, 
        profile
    })
    res.status(201).json({success: true, createdUser})
  } catch (error) {
    console.log(error);
    res.json(error)
  }
}

//login
const login = async (req,res)=>{
    //email and password
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({success: false, message: 'please provide neccesary information'})  
    }
    try {
       //check if the user is registered
       const user = await User.findOne({email})
       if(!user){
        return res.status(404).json({success:false, message:'Invalid email or password'}) 
       }
        //check if the password is correct
        const isAuthenticated = await bcrypt.compare(password,user.password)

        if (!isAuthenticated) {
         return res.status(401).json({success: false, message: 'invalid credentials'})
        }

        res.status(200).json({
            success:true,
            user: {
              email: user.email,
              username: user.username,
              profile: user.profile  
            }
        })
    } catch (error) {
       console.log(error); 
       res.json(error)
    }
}
const login2 = async (req,res)=>{
    //email and password
    const {emailOrUsername, password} = req.body
    const logInEmail = isEmail(emailOrUsername)  


    if (logInEmail) {
        const user = await User.findOne({email : emailOrUsername})
        if(!user){

            return res.status(404).json({success:false, message:'user is not registered'}) 
        }
        const isAuthenticated = await bcrypt.compare(password,user.password)

        if (!isAuthenticated) {
         return res.status(401).json({success: false, message: 'invalid credentials'})
        }
        res.status(200).json({
            success:true,
            user: {
              email: user.email,
              username: user.username,
              profile: user.profile  
            }
        })
    } else {
        const user = await User.findOne({username: emailOrUsername})
        if(!user){

            return res.status(404).json({success:false, message:'user is not registered'}) 
        }
        const isAuthenticated = await bcrypt.compare(password,user.password)

        if (!isAuthenticated) {
         return res.status(401).json({success: false, message: 'invalid credentials'})
        }
        res.status(200).json({
            success:true,
            user: {
              email: user.email,
              username: user.username,
              profile: user.profile  
            }
        })
    }
      
}



module.exports = {register, login, login2};