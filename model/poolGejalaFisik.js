const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const gejalaFisik=require('./gejalaFisikModel')
const pasien= require('./pasienModel')

const poolGejalaFisik = sq.define('PoolGejalaFisik',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status:{
         type:DataTypes.INTEGER,
         defaultValue:0
    }
},
);



poolGejalaFisik.belongsTo(gejalaFisik)
gejalaFisik.hasMany(poolGejalaFisik)

poolGejalaFisik.belongsTo(pasien)
pasien.hasMany(poolGejalaFisik)

poolGejalaFisik.sync({ alter: true })
module.exports = poolGejalaFisik