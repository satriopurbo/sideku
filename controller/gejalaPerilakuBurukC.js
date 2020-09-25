const gejalaPerilakuBuruk = require('../model/gejalaPerilakuBurukM')
const poolGejalaPerilaku =require('../model/poolGejalaPerilakuM')


class Controller{

    static register(req, res){
        const {namaGejalaPerilaku}= req.body
        gejalaPerilakuBuruk.findAll({
            where:{
                namaGejalaPerilaku:namaGejalaPerilaku
            }
        }).then(data=>{
            if(data.length){
                res.json('data sudah ada')
            }
            else{
                gejalaPerilakuBuruk.create({namaGejalaPerilaku:namaGejalaPerilaku}, {returning: true}).then(respon =>{
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
        gejalaPerilakuBuruk.findAll({
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
    static all(req,res){
    
        gejalaPerilakuBuruk.findAll({
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
        const {namaGejalaPerilaku}= req.body
        
        gejalaPerilakuBuruk.update({
            namaGejalaPerilaku:namaGejalaPerilaku
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        gejalaPerilakuBuruk.destroy({
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
    static history(req,res){
        const{id}=req.params
        gejalaPerilakuBuruk.findAll(
        { 
            include:[{model:poolGejalaPerilaku,
                required:false,
            where:{
                pasienId:id,
                
            }}]
            
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller