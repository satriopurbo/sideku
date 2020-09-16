const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');

const Users = sq.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
         type:DataTypes.STRING,
         defaultValue:''
    },
    password:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    nama:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:''
    },
    
},
{

});

Users.sync({ alter: true })
module.exports = Users