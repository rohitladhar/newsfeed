const {sequelize} = require('../db')
const {DataTypes} = require('sequelize');

const Search = sequelize.define('Search',{
    associative_id:{
        type:DataTypes.INTEGER,
        validate:{
            max:150
        }
    },
    slug_name:{
        type:DataTypes.STRING
    },

})


//sequelize.sync()

module.exports = Search