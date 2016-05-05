var request = require('request');
var MemoryCache = require('fast-memory-cache');

var router = require('express').Router();
var cache = new MemoryCache();

var cacheTime = 60; // 1 minute

router.get('/package/:package/dependencies', function(req, res) {
	var packageUrl = 'https://registry.npmjs.com/' + req.params.package + '/latest';

	var dependencies = cache.get(packageUrl + ':dependencies');

	if (dependencies) {
		res.set('Content-Type', 'application/json');
    res.send(body);
	} else {
	  request(packageUrl, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var json = JSON.parse(body);
	    	var dependencies = json.dependencies;
	    	if (dependencies && Object.keys(dependencies).length === 0) {
	    		dependencies = null;
	    	}

	    	cache.set(packageUrl + 'dependencies', JSON.stringify(dependencies), cacheTime);

	    	res.set('Content-Type', 'application/json');
	      res.json({
	      	dependencies: dependencies
	      });
	    } else {
	    	res.status(response && response.statusCode || 500);
	    	res.json({
	    		error: true,
	    		message: body
	    	});
	    }
	  });
	}
});

module.exports = router;
