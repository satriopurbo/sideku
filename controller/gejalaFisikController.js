const gejalaFisik = require('../model/gejalaFisikModel')




class Controller{

    static register(req, res){
        const {namaGejalaFisik}= req.body
        gejalaFisik.findAll({
            where:{
                namaGejalaFisik:namaGejalaFisik
            }
        }).then(data=>{
            if(data.length){
                res.json({message:"data sudah ada"})
            }
            else{
                gejalaFisik.create({namaGejalaFisik:namaGejalaFisik}, {returning: true}).then(respon =>{
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
        gejalaFisik.findAll({
            where:{
                id :id
            }
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    static all(req,res){
       
        gejalaFisik.findAll({
            sort:[['id','ASC']]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {namaGejalaFisik}= req.body
        
        gejalaFisik.update({
            namaGejalaFisik:namaGejalaFisik
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
        gejalaFisik.destroy({
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