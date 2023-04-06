const {sequelize} = require('../db')
const {DataTypes} = require('sequelize');

const User = sequelize.define('User',{
    email:{
        type:DataTypes.STRING,
        validate:{
            max:150
        }
    },
    password:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING,
        defaultValue:false
    }

})


//sequelize.sync()

module.exports = User