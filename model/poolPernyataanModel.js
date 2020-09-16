const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const pasien =require('../model/pasienModel')
const pernyataan = require('../model/pernyataanModel')

const poolPernyataan = sq.define('poolPernyataan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status:{
         type:DataTypes.INTEGER,
         defaultValue:0
    },
})

poolPernyataan.belongsTo(pasien)
pasien.hasMany(poolPernyataan)

poolPernyataan.belongsTo(pernyataan)
pernyataan.hasMany(poolPernyataan)

poolPernyataan.sync({ alter: true })
module.exports = poolPernyataan