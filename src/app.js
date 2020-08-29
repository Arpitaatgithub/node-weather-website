const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const request = require('request');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up static directory to serve 
app.use(express.static(publicDirectoryPath));

// set up handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Arpita'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Arpita'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Text',
        name: 'Arpita'
    });
});

/*app.get('/help', (req, res) => {
    res.send({
        name: 'Arpita',
        age: 25
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
});*/

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide coordinates'
        })
    }

    //const url = 'http://api.weatherstack.com/current?access_key=da10e72aed0b86bd9f55d8bdec05ab98&query=28.38,77.25';
    const url = 'http://api.weatherstack.com/current?access_key=da10e72aed0b86bd9f55d8bdec05ab98&query=' + req.query.address;

    request({url: url, json: true}, (error, response) =>{
    
    return res.send({
        temperature: response.body.current.temperature,
        location: response.body.location.name,
        address: req.query.address
    })
        });

    /*res.send({
        forecast: 'Rainy',
        location: 'Noida',
        address: req.query.address
    });*/
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Arpita',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});