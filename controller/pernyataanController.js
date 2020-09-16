const pernyataan = require('../model/pernyataanModel')



class Controller{

    static register(req, res){
        const {isiPernyataan}= req.body
         pernyataan.create({isiPernyataan:isiPernyataan}, {returning: true}).then(respon =>{
           res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
        
      }
    
    static list(req,res){
        const{id}=req.params
        pernyataan.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {isiPernyataan}= req.body
        
        pernyataan.update({
            isiPernyataan:isiPernyataan
        },{
            where :{
                id:id
            }
        },{returning: true})
        .then(respon=>{
            res.json(`data dengan id ${respon} telah berhasil dirubah`)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        pernyataan.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller