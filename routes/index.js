var express = require('express');
var router = express.Router();
var reader = require('./Readability.js');
var JSDOM = require('jsdom').JSDOM;
var fetch = require('node-fetch');
const {getMetadata} = require('page-metadata-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/view', async function(req, res, next) {
  
  console.log(req.body.url);

  const response = await fetch(req.body.url);
  const html = await response.text();
  var doc = new JSDOM(html, {
    url: req.body.url,
  });
  
  let metadata = null;
  let content = null;

  try {

    metadata = getMetadata(doc.window.document, req.body.url);
    //console.log(metadata);
    article = new reader(doc.window.document).parse();

    if(article !== null)
      content = article.content;
  } catch (error) {

    console.log(error);
  }

  res.status(200).send({
    "article": content,
    "meta": metadata
  });
});

module.exports = router;
