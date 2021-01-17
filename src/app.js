const express = require('express');
const path = require('path');
const hbs = require('hbs');
const utils = require('./utils')


const app = express();

const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname,'templates/views');
const partialsDirectory = path.join(__dirname,'templates/partials');

app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory);


app.get('/about', (req,res)=>{
    res.render('about',{alert:"this is dynamic data"})
})

app.get('/home', (req, res)=>{
    res.render('home')
})

app.get('/search', (req, res)=>{
    res.render('searchForm')
})

app.get('/weather', (req, res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send("please provide some value!")
    }
    utils.geocoding(req.query.search, (error,result)=>{
        if(error){
            console.log('geocoding error!');
            return res.send({error});
        }
        utils.forecast(result.lat, result.long, (error, result)=>{
            if (error){
                return res.send({error});
            }
            res.send(result);
        })
    })

})

app.get('*', (req, res)=>{
    res.render('404');
})

app.listen(3000,()=>{
    console.log('server is runnig on port 3000!')
})