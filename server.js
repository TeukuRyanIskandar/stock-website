const express = require('express');
const axios =  require('axios');
const parser = require('body-parser')
const path = require('path')

const port = 5000;
const apiKey = 'cmge0hpr01qpcejjmrj0cmge0hpr01qpcejjmrjg'
const app = express();

const favs = [];
const labelMapping = {
    c: 'Current Price',
    d: 'Price Change',
    dp: 'Price Change Percent',
    h: 'High',
    l: 'Low',
    o: 'Open',
    pc: 'Previous Close',
    t: 'Timestamp'
};

app.set('view engine', 'ejs');
app.use( parser.json() );
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('search', { pageTitle: 'Search For Stocks' });
});

app.post('/search', async (req, res) => {
    try {
        const searchTerm = req.body.search.toUpperCase();
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${searchTerm}&token=${apiKey}`);
        const searchData = response.data;

        res.render('results', { pageTitle: searchTerm, searchTerm, searchData });
    } catch(error) {
        console.error(error);
        res.status(500).send('Error while fetching results');
    }
});

app.post('/add-favs', (req, res) => {
    const addToFav = req.body.searchTerm;
    favs.push(addToFav)
    res.redirect('/');
});

app.get('/favourites', (req, res) => {
    res.render('favourites', { pageTitle: 'Favourites', favs})
})

app.post('/remove', (req, res) => {
    const stockToRemove = req.body.remove;

    const indexToRemove = favs.indexOf(stockToRemove);
    
    if (indexToRemove !== -1) {
        favs.splice(indexToRemove, 1);
        res.redirect('/favourites');
    } else {
        res.status(404).send('Stock not found in favorites');
    }
});


app.listen(port);