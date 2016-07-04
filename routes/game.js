var express = require('express');
var router = express.Router();

/* GET game listing. */
router.get('/', function(req, res, next) {
  res.render('game', { title: 'Игра' });
});


module.exports = router;
