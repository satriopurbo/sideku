const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const Pasien = require('./pasienModel')



const poolFotoWajah = sq.define('poolFotoWajah',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaFile:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    emosi:{
        type:DataTypes.STRING,
        defaultValue:''
   }
},
);
poolFotoWajah.belongsTo(Pasien)
Pasien.hasMany(poolFotoWajah)

poolFotoWajah.sync({ alter: true })
module.exports = poolFotoWajah