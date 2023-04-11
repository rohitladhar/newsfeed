const News = require("../models/news");
const Search = require("../models/search");
//exports.topstoriesworld = async(req,res) =>{
exports.topstoriesarts = async() =>{
    try {
        const url = "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=76VzJwHRIXvSoSJHFDFR4kXrQLc7BCtuRAuBsJ";
        fetch(url)
        .then(response => response.json())
        .then(data =>
           // topStories(res,data.results)
            topStories(data.results)
        )
    } catch (err) {
        console.log(err); 
  }
}
const topStories = async(data)=>{
//const topStories = async(res,data)=>{
    for(let i=0;i<data.length;i++){
        if(data[i].section.length>0){
            let url = 'no image';
            if(data[i].multimedia!==null){
                url = data[i].multimedia[data[i].multimedia.length-1].url
            }
            const news = News.build({
                'section':data[i].section,
                'subsection':data[i].subsection,
                'title':data[i].title,
                'abstract':data[i].abstract,
                'published_date':data[i].published_date,
                'url':url
            })

            await news.save()
            for(let j=0;j<data[i].des_facet.length;j++){
                const search = Search.build({
                    'associative_id':news.id,
                    'slug_name':data[i].des_facet[j]
                })
                await search.save()
            }
        }  
    }
    return "CRON WORKED TOP STORIES ARTS";
    //res.status(201).json({ cron:"worked properly"})
}
