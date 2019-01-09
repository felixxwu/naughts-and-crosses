const express = require('express');
const path = require('path');
const functions = require('./serverFunctions');
const linkAll = require('./linkAll.js');
const PORT = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index', {linkAll: linkAll.getFiles}))
    .get('/serverFunctions', (req, res) => functions.selectFunction(req, res))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

