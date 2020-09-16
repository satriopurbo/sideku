const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const gejalaPsikis = sq.define('GejalaPsikis',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    namaGejalaPsikis:{
         type:DataTypes.STRING,
         defaultValue:''
    }
},
);

gejalaPsikis.sync({ alter: true })
module.exports = gejalaPsikis