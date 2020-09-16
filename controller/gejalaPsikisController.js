const gejalaPsikis = require('../model/gejalaPsikisModel')



class Controller{

    static register(req, res){
        const {namaGejalaPsikis}= req.body
        gejalaPsikis.findAll({
            where:{
                namaGejalaPsikis:namaGejalaPsikis
            }
        }).then(data=>{
            if(data.length){
                res.json({message:"data sudah ada"})
            }
            else{
                gejalaPsikis.create({namaGejalaPsikis:namaGejalaPsikis}, {returning: true}).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
        
      }
    
    static list(req,res){
        const{id}=req.params
        gejalaPsikis.findAll({
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
        const {namaGejalaPsikis}= req.body
        
        gejalaPsikis.update({
            namaGejalaPsikis:namaGejalaPsikis
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
        gejalaPsikis.destroy({
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