var express = require('express');
var router = express.Router();
//var reader = require('./Readability.js');
var JSDOM = require('jsdom').JSDOM;
//var fetch = require('node-fetch');
//var read = require('node-readability');
const {getMetadata} = require('page-metadata-parser');
var Mercury = require("./mercury-parser-master/dist/mercury.js");

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  var url = "https://www.cnn.com/2019/10/11/health/singapore-sugar-drink-ads-intl-hnk-scli/index.html";

  // url passed in body
  console.log(url);

  let metadata = null;

  Mercury.parse(url, { contentType: "markdown" }).then(result =>

    res.status(200).send({
      "result": result,
    })

    //console.log(result)
  );
});

/*  */
router.post('/view', async function(req, res, next) {
  
  //var testUrl = "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html";

  // url passed in body
  console.log(req.body.url);

  let doc = new JSDOM({
    url: req.body.url,
  });

  let metadata = null;

  Mercury.parse(req.body.url, { contentType: "markdown" }).then((result) => {

    metadata = getMetadata(doc.window.document, req.body.url);
    console.log(metadata);
    
    result["icon"] = metadata["icon"];

    res.status(200).send({
      "result": result,
    });
  });

  /*read(req.body.url, function(err, article, meta) {

    // Main Article
    //console.log(article.content);
    // Title
    //console.log(article.title);

    metadata = getMetadata(article.document, req.body.url);
    console.log(metadata);

    res.status(200).send({
      "article": article.content,
      "meta": metadata
    });

    // Close article to clean up jsdom and prevent leaks
    article.close();
  });*/

  //console.log();
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
