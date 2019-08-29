var express = require('express');
var router = express.Router();
var reader = require('./Readability.js');
var JSDOM = require('jsdom').JSDOM;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/view', function(req, res, next) {
  
  console.log(req.body.html);
  console.log(req.body.url);

  var doc = new JSDOM(req.body.html, {
    url: req.body.url,
  });  

  let article = new reader(doc.window.document).parse();

  res.status(200).send({
    "url": req.body.url,
    "title": article.title,    
    "html": article.content,
    "description": article.excerpt,
    "byline": article.byline,
  });
});

module.exports = router;
