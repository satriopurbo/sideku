const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const gejalaPerilakuBuruk  = sq.define('GejalaPerilakuBuruk',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaGejalaPerilaku:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

gejalaPerilakuBuruk.sync({ alter: true })
module.exports = gejalaPerilakuBuruk