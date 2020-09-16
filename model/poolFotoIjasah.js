const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const Pasien = require('./pasienModel')



const PoolFotoIjasah = sq.define('poolFotoIjasah',{
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
PoolFotoIjasah.belongsTo(Pasien)
Pasien.hasMany(PoolFotoIjasah)

PoolFotoIjasah.sync({ alter: true })
module.exports = PoolFotoIjasah