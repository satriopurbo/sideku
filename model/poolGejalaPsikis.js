const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const pasien = require('../model/pasienModel')
const gejalaPsikis = require('../model/gejalaPsikisModel')

const poolGejalaPsikis = sq.define('PoolGejalaPsikis',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status:{
         type:DataTypes.INTEGER,
         defaultValue:0
    }
},
);


poolGejalaPsikis.belongsTo(pasien)
pasien.hasMany(poolGejalaPsikis)

poolGejalaPsikis.belongsTo(gejalaPsikis)
gejalaPsikis.hasMany(poolGejalaPsikis)

poolGejalaPsikis.sync({ alter: true })
module.exports = poolGejalaPsikis
