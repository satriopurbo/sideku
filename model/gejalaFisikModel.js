const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const gejalaFisik = sq.define('GejalaFisik',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaGejalaFisik:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

gejalaFisik.sync({ alter: true })
module.exports = gejalaFisik