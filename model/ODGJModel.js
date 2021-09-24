const { DataTypes } = require('sequelize');
const sq =  require('../connection');

const ODGJ = sq.define('ODGJ',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pernyataanODGJ:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

ODGJ.sync({ alter: true })
module.exports = ODGJ