import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import path from 'path';

const port: number = 5000;
const apiKey: string = 'cmge0hpr01qpcejjmrj0cmge0hpr01qpcejjmrjg';
const app = express();

const favs: string[] = [];

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.render('search', { pageTitle: 'Search For Stocks' });
});

app.post('/search', async (req: Request, res: Response) => {
    try {
        const searchTerm: string = req.body.search.toUpperCase();
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${searchTerm}&token=${apiKey}`);
        const searchData = response.data;

        res.render('results', { pageTitle: searchTerm, searchTerm, searchData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while fetching results');
    }
});

app.post('/add-favs', (req: Request, res: Response) => {
    const addToFav: string = req.body.searchTerm;
    favs.push(addToFav);
    res.redirect('/');
});

app.get('/favourites', (req: Request, res: Response) => {
    res.render('favourites', { pageTitle: 'Favourites', favs });
});

app.post('/remove', (req: Request, res: Response) => {
    const stockToRemove: string = req.body.remove;

    const indexToRemove: number = favs.indexOf(stockToRemove);

    if (indexToRemove !== -1) {
        favs.splice(indexToRemove, 1);
        res.redirect('/favourites');
    } else {
        res.status(404).send('Stock not found in favorites');
    }
});

app.listen(port);
