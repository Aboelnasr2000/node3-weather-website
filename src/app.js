import express from 'express';
import path from 'path';
import hbs from 'hbs';
import { fileURLToPath } from 'url';
import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';


//Launch Express
const app = express()
const port = process.env.PORT || 3000

//Define Paths For Express Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup Handle Bars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup Static Directory
app.use(express.static(publicDirectoryPath))


//Set Pages 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aly Aboelnasr'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aly Aboelnasr'

    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Aly Aboelnasr',
        helpText: 'I Can not Load Weather App'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'must provide ad'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {

            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            // console.log(placeName)
            // console.log('Forecast', forecastData)
            res.send(
                {
                    address: placeName,
                    weather: forecastData
                })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aly Aboelnasr',
        errorMessage: 'Help Article Not Found'

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'must provide search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aly Aboelnasr',
        errorMessage: 'Page Not Found'

    })
})



//Set Listen
app.listen(port, () => {
    console.log("Server is Up on Port" + port)
})