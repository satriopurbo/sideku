const poolFotoIjasah = require('../model/poolFotoIjasah')



class Controller{

    static register(req, res){
        const {namaFile,emosi,pasienId}= req.body
        poolFotoIjasah.findAll({
            where:{
                namaFile:namaFile
            }
        }).then(data=>{
            if(data.length){
                res.json({message:'data sudah ada'})
            }
            else{
                poolFotoIjasah.create({namaFile:namaFile,emosi:emosi,pasienId:pasienId}, {returning: true}).then(respon =>{
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
        poolFotoIjasah.findAll({
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
        const {namaFile,emosi}= req.body
        
        poolFotoIjasah.update({
            namaFile:namaFile,
            emosi : emosi
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
        poolFotoIjasah.destroy({
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