const {sequelize} = require('../db')
const {DataTypes} = require('sequelize');

const News = sequelize.define('News',{
    section:{
        type:DataTypes.STRING,
    },
    subsection:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.TEXT,
        defaultValue:false
    },
    abstract:{
        type:DataTypes.TEXT,
        defaultValue:false
    },
    published_date:{
        type:DataTypes.STRING,
    },
    url:{
        type:DataTypes.TEXT,
    }

})

//sequelize.sync()

module.exports = News