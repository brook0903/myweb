var express = require('express');
var app = express();
app.engine('html', require('express-art-template'));

//加載body-parser:
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//require router.js
var router = require('./router.js');
app.use(router);

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));


app.listen(3000, function () {
    console.log('Running at port 3000!');
})
