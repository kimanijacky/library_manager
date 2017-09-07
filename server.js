const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('App working');
})

app.listen(port, (err) => {
  err ? err : console.log('Connection successful at port ', port);
});

module.exports = app;
