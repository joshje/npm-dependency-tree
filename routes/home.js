var router = require('express').Router();

router.get('/', function(req, res) {
  res.render('dependencies', {
  	package: req.query.package
  });
});

module.exports = router;
