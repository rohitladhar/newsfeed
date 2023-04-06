const express = require('express');
const apiRoutes = require('./routes/route');
const {sequelize,connectToDb} = require('./db');
const body_parser = require('body-parser');
const {topstoriesworld} = require('./newscron/topstoriesworld');
const {topstoriesarts} = require('./newscron/topstoriesarts');
const {topstoriesus} = require('./newscron/topstoriesus');
const {topstoriesscience} = require('./newscron/topstoriesscience');
const cron = require('node-cron');
const app = express();
const PORT = 8000;
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use('/api',apiRoutes);
app.use((request,response)=>{
    response.status(404);
    response.json({message:"Resource not found"});
})


cron.schedule('0 0 * * *', function() {
    topstoriesworld()
});

cron.schedule('5 0 * * *', function() {
    topstoriesarts()
});

cron.schedule('10 0 * * *', function() {
    topstoriesus()
});

cron.schedule('15 0 * * *', function() {
    topstoriesscience()
});


app.use((request,response)=>{
    response.status(500);
    response.json({message:"Oops... Something went wrong"});
})

app.get('/',(request,response)=>{
    response.status(200).json({message:"Hello World"})
})

app.listen(PORT , async ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
})