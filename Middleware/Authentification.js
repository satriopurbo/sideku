const {verifyToken} = require('../helper/jwt')
const User = require('../model/usermodel')

function authentification(req,res,next){
 const decode = verifyToken(req.headers.accesstoken)
    
    User.checkUser(decode.name)
    .then(data=>{
        if(data){   
            req.user=decode   
            next()
        }
        else{
            res.json({status : 400,message :"anda belum login" })
        }
    })
    .catch(err=>{
        res.json({message:err})
        
    })
}

module.exports = authentification
