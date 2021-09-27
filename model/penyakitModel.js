const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const penyakit = sq.define('Penyakit',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaPenyakit:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
{
    paranoid: true
}
);

penyakit.sync({ alter: true })
module.exports = penyakit