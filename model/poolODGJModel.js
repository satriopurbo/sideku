const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const pasien = require('../model/pasienModel')
const ODGJ = require('../model/ODGJModel')

const poolODGJ = sq.define('poolODGJ',{
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


poolODGJ.belongsTo(pasien)
pasien.hasMany(poolODGJ)

poolODGJ.belongsTo(ODGJ)
ODGJ.hasMany(poolODGJ)

poolODGJ.sync({ alter: true })
module.exports = poolODGJ
