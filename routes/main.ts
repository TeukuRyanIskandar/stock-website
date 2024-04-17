import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const router = express.Router();
const app = express();

const stocks: any[] = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render('index', { pageTitle: 'Search For Stocks' });
});

export default router;
