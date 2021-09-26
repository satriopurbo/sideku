const poolODGJ = require('../model/poolODGJModel')
const pasienModel= require('../model/pasienModel')

// async function isipool(){
  
//     for(let i=0;i<2860;i++){
//         pasienModel.findAll({where:{
//             id:i
//         }})
//         .then(hasil=>{
//             if(hasil.length){
//                 poolODGJ.create({
//                     pasienId:i
//                 })
//             }
//         })
//         .catch(err=>{
//            console.log(err)
//         })
//     }
// }
// isipool()




class Controller{

    static registerUpdate(req, res){
        const {soal1,soal2,soal3,soal4,soal5,soal6,soal7,soal8,soal9,soal10,soal11,soal12,soal13,soal14,soal15,soal16,soal17,soal18,soal19,soal20}= req.body

         poolODGJ.update({soal1,soal2,soal3,soal4,soal5,soal6,soal7,soal8,soal9,soal10,soal11,soal12,soal13,soal14,soal15,soal16,soal17,soal18,soal19,soal20}, 
            {
                where:{
                        pasienId:req.dataUsers.id
         }})
         .then(respon =>{
           res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json({message:err})
        })
      }


      static listByPasienId(req,res){
        const {pasienId}= req.params
        poolODGJ.findAll({where:{
            pasienId:pasienId
        }})
        .then(data=>{
            res.json({data:data})
        })
        .catch(err=>{
            res.json({message:err})
        })
    }
    
    


}

module.exports=Controller