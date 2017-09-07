const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const seeds = require('./server/seeds/seed.js');
const Books = require('./server/models');
const routes = require('./server/routes');

const app = express();

routes(app);

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin: *");
    res.header("Access-Control-Allow-Credentials: true ");
    res.header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
    res.header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
    next();
});

mongoose.connect('mongodb://localhost:27017/library', (err) => {
  err ? console.log(err) : console.log('DB connected!!')
});

mongoose.connection.on('connected', () => {
  Books.remove({}, (err) => {
    err ? console.log(err) : console.log('Collection removed');
  });

  Books.create(seeds.books, (err) => {
    err ? console.log(err) : console.log('Collection created');
  });
});

app.get('/', (req, res) => {
  console.log('App working');
});

app.listen(port, (err) => {
  err ? err : console.log('Connection successful at port ', port);
});

module.exports = app;
