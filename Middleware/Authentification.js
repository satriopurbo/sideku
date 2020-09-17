const {verifyToken} = require('../helper/jwt')
const User = require('../model/usermodel')

function authentification(req,res,next){
    
 const decode = verifyToken(req.headers.accesstoken)
 
    User.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{
        if(data){ 
            next()
        }
        else{
            res.json({status : 400,message :"anda belum login" })
        }
    })
    .catch(err=>{
        res.json(err)
        
    })
}

module.exports = authentification
