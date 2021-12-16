const express = require('express');
const hbs = require('hbs');
const path = require('path');
const {getGio, getWeather} = require('./utils/weather');

const app = express();

//Default Paths for public and views
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlerbar engin and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir for server
app.use(express.static(publicPath));

//Default page
app.get('', (req,res) => {
    res.render('index', {
        title: 'This is home page!!!'
    });
});

app.get('/about', (req,res) => {
    res.render('index', {
        title: 'This is about page!!!'
    });
});

app.get('/help', (req,res) => {
    res.render('index', {
        title: 'This is help page!!!'
    });
});

app.get('/weather', (req, res) => {
    var address = req.query.address;
    if (address) {
        getGio(address, (lat, lang) => {
            getWeather(lat, lang, (weather) => {
                res.send({
                    currentTemp: weather
                });
            });
        });
    } else {
        res.send({
            error: 'Please send address in URL params'
        });
    }
    
});

app.get('/help/*', (req,res) => {
    res.render('404-page', {
        error: 'Help not available Not Found!!!'
    });
});

app.get('*', (req,res) => {
    res.render('404-page', {
        error: 'Page Not Found!!!'
    });
});

app.listen(3000, ()=> {
    console.log('Server started!!!');
});