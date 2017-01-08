const port = (process.env.PORT || 8080)
const express  = require('express')
const app = express()
const bodyParser = require('body-parser')
const compress = require('compression')

const mongoose = require('mongoose');
import invoices from './routes/invoice.routes';


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test');

app.use(compress());


app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use('/invoices', invoices);

app.get('/', (req, res) => {
  res.render('index', function(err, html) {
    res.send(html);
  });
});

app.get('/pdf', (req, res) => {
res.render('pdf', { message: 'Hello there!' })
});
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});

