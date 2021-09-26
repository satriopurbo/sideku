const {verifyToken} = require('../helper/jwt')
const User = require('../model/usermodel')
const pasien = require('../model/pasienModel')


function authentification(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
    if(decode.role=="Pasien"){
        pasien.findAll({
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
    else{
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

   
}

module.exports = authentification
