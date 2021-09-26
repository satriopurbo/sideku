const {verifyToken} = require('../helper/jwt')
const User = require('../model/usermodel')

function authentification(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
   User.findAll({
        where:{
            id : decode.id,
            password:decode.password
        }
    })
    .then(data=>{
        if(data.length>0){
            req.dataUsers=decode 
            next()
        }
        else{
            res.json({status : 400,message :"anda belum login" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

module.exports = authentification
