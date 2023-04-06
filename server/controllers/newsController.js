const News = require('../models/news');
const Search = require('../models/search');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const sequelize = new Sequelize('newsfeed', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

exports.categories = async(req,res)=>{
    try{
        const categories = await sequelize.query('SELECT DISTINCT subsection FROM news WHERE subsection != ""', {
            model: News,
        });

        let categories_array = [];
        for(let i=0;i<categories.length;i++){
            categories_array.push(categories[i].subsection);
        }

        res.status(200).json({
            categories:categories_array
        })
    }catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

exports.search = async(req,res)=>{
    try{
        // let arr = ['Russian','Politics','Ukraine'];
        let arr = req.body.search
        let associative_id = [];
        for(let i=0;i<arr.length;i++){
            let str = '%'+arr[i]+'%';
            let elm = await Search.findAll({
                where: {
                    slug_name: {
                        [Op.like]: str
                    }  
                }
              });
            associative_id.push(elm)
        }

        let associative_id_array = []
        for(let j=0;j<associative_id.length;j++){
            for(let k=0;k<associative_id[j].length;k++){
                associative_id_array.push(associative_id[j][k].associative_id);
            }
        }

        var unique_associative_id = associative_id_array.filter((value, index, array) => array.indexOf(value) === index).sort(function(a, b){return a - b});

        let news = [];

        for(var i=0;i<unique_associative_id.length;i++){
            const elm = await News.findOne({
                where: {
                    id:unique_associative_id[i]
                }
            });
            news.push(elm)
        }
        
        res.status(200).json({
            news:news
        })

    }catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}

exports.filter = async(req,res)=>{
    try{
       
        let arr =req.body.filter;
        let news = [];
        for(let i=0;i<arr.length;i++){
            let elm = await News.findAll({
                where: {
                    subsection:arr[i]
                },
            });
            news.push(elm);
        }
        res.status(200).json({
            news:news
        })
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}

exports.allnews = async(req,res)=>{
    try{
        let elm = await News.findAll();
        res.status(200).json({
            news:elm
        })
    }catch(err){
        res.status(500).send("Internal Server Error")
    }
}