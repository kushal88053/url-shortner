const express = require('express') ;

const { handleGenerateNewShortURL ,handleAnalitic , handleGetAllUrl} = require('../controller/urlController.js') ; 

const URL = require('../model/url');

const router = express.Router();

router
.post('/', handleGenerateNewShortURL)
.get('/analytic/:shortId', handleAnalitic)
.get('/',handleGetAllUrl);


module.exports = router ; 