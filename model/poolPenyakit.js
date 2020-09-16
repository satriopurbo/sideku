const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const pasien = require('./pasienModel')
const penyakit = require('./penyakitModel')

const PoolPenyakit = sq.define('poolPenyakit',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lamaSakit:{
         type:DataTypes.INTEGER,
         defaultValue:0
    },
})

PoolPenyakit.belongsTo(pasien)
pasien.hasMany(PoolPenyakit)

PoolPenyakit.belongsTo(penyakit)
penyakit.hasMany(PoolPenyakit)

PoolPenyakit.sync({ alter: true })
module.exports = PoolPenyakit