var express = require('express');
var router = express.Router();
//var reader = require('./Readability.js');
//var JSDOM = require('jsdom').JSDOM;
//var fetch = require('node-fetch');
var read = require('node-readability');
const {getMetadata} = require('page-metadata-parser');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/view', async function(req, res, next) {
  
  // url passed in body
  console.log(req.body.url);

  let metadata = null;

  read(req.body.url, function(err, article, meta) {

    // Main Article
    console.log(article.content);
    // Title
    console.log(article.title);

    metadata = getMetadata(article.document, req.body.url);

    res.status(200).send({
      "article": article.content,
      "meta": metadata
    });

    // Close article to clean up jsdom and prevent leaks
    article.close();
  });
});

module.exports = router;

// HTML Source Code
    //console.log(article.html);
    // DOM
    //console.log(article.document);

    // Response Object from Request Lib
    //console.log(meta);

/*const response = await fetch(req.body.url);
  const html = await response.text();
  var doc = new JSDOM(html, {
    url: req.body.url,
  });
  
  let metadata = null;
  let content = null;

  try {

    metadata = getMetadata(doc.window.document, req.body.url);
    console.log(metadata);
    article = new reader(doc.window.document).parse();

    if(article !== null)
      content = article.content;
  } catch (error) {

    console.log(error);
  }*/
