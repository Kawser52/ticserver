const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
var { expressjwt: ejwt } = require("express-jwt");

exports.Register = (req, res)=>{
    console.log('req.body', req.body);
    const user = new User(req.body);
    user.save((err, user)=>{
        if(err){
            return res.status(400).json({err})
        }
        res.json({
            user
        })
    })
}

exports.Login = (req, res)=>{
    const {email, password} = req.body;
    User.findOne({email}, (err, user)=>{
        if( err || !user){
            return res.status(401).json({
                err: "User Does not exsit"
            })
        } 

        // if user exist 
        if(!user.authenticate(password)){
            return res.status(401).json({
                err: 'Password doesnot match'
            })
        }
        // get token system
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        res.cookie ('t', token, {expire:new Date()+9999})
        // user response in frontend

        const {_id, name, email, role} = user
        return res.json({token, user: {_id, name, email, role}})
    })
}

exports.Logout = (req, res)=>{
    res.clearCookie('t')
    res.json({message: "Signout Successfull"})
}

exports.requireLogin = ejwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
    //algorithms: ['RS256']
  });


  exports.isAuth = (req, res, next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status('400').json({
            err: "User Access Denied"
        })
    }
    next();
  }

  exports.isAdmin = (req,res, next)=>{
    if(req.profile.role === 0){
        return res.status('400').json({
            err: "Admin Resource"
        })
    } 
    next();
  }