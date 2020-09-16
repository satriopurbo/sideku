const { Sequelize, DataTypes } = require('sequelize');
const sq =  require('../connection');
const pasien = require('../model/pasienModel')
const GejalaPerilaku = require('../model/gejalaPerilakuBurukM')

const poolGejalaPerilaku  = sq.define('PoolGejalaPerilaku',{
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

poolGejalaPerilaku.belongsTo(pasien)
pasien.hasMany(poolGejalaPerilaku)

poolGejalaPerilaku.belongsTo(GejalaPerilaku)
GejalaPerilaku.hasMany(poolGejalaPerilaku)

poolGejalaPerilaku.sync({ alter: true })
module.exports = poolGejalaPerilaku
