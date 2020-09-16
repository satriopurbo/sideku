const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const pernyataan = sq.define('pernyataan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isiPernyataan:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

pernyataan.sync({ alter: true })
module.exports = pernyataan