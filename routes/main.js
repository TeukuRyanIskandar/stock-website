const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const router = express.Router();
const app = express()

const stocks = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Search For Stocks' });
  });

  
router.get('/users', (req, res, next) => {
    res.render('users', {
      pageTitle: 'User',
      users: users,
      hasUsers: users.length > 0
    });
});

module.exports = router;