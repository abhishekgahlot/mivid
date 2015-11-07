/* jshint node:true */
"use strict";

var express = require('express');

express()
  .set('view engine', 'ejs')
  .use(express.static('./public'))
  .get('*', function(req, res) {
    res.render('index');
  })
  .listen(3000);

console.log("Mivid listenting on 3000");
