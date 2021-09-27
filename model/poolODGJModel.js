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
    soal1:{
        type:DataTypes.INTEGER
    },
    soal2:{
        type:DataTypes.INTEGER
    },
    soal3:{
        type:DataTypes.INTEGER
    },
    soal4:{
        type:DataTypes.INTEGER
    },
    soal5:{
        type:DataTypes.INTEGER
    },
    soal6:{
        type:DataTypes.INTEGER
    },
    soal7:{
        type:DataTypes.INTEGER
    },
    soal8:{
        type:DataTypes.INTEGER
    },
    soal9:{
        type:DataTypes.INTEGER
    },
    soal10:{
        type:DataTypes.INTEGER
    },
    soal11:{
        type:DataTypes.INTEGER
    },
    soal12:{
        type:DataTypes.INTEGER
    },
    soal13:{
        type:DataTypes.INTEGER
    },
    soal14:{
        type:DataTypes.INTEGER
    },
    soal15:{
        type:DataTypes.INTEGER
    },
    soal16:{
        type:DataTypes.INTEGER
    },
    soal17:{
        type:DataTypes.INTEGER
    },
    soal18:{
        type:DataTypes.INTEGER
    },
    soal19:{
        type:DataTypes.INTEGER
    },
    soal20:{
        type:DataTypes.INTEGER
    }
},
);


poolODGJ.belongsTo(pasien)
pasien.hasMany(poolODGJ)


poolODGJ.sync({ alter: true })
module.exports = poolODGJ
