var express = require('express');
var router = express.Router();
var items = require('../items.json');

router.get('/', function (req, res, next) {
  res.send(items)
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10)
  var item = itmes.filter(function (item) {
    return item.id === id
  });
  res.send(item)
});

module.exports = router;