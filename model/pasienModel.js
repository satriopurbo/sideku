const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const Pasien = sq.define('pasien',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama:{
        type:DataTypes.STRING,
         defaultValue:''
    },
    tanggalLahir:{
        type:DataTypes.DATE,
        defaultValue:0
    },
   tempatLahir:{
    type:DataTypes.STRING,
    defaultValue:''
    },
    alamat:{
        type:DataTypes.STRING,
        defaultValue:''
    },
   pekerjaan:{
    type:DataTypes.STRING,
    defaultValue:''
    },
})

Pasien.sync({ alter: true })
module.exports = Pasien