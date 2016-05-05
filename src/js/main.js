var _ = require('lodash');

var components = {
	npmDependencies: require('./npm-dependencies')
}

_.each(components, function(component, name) {
	_.each(document.querySelectorAll('[data-component="' + name + '"]'), function(el) {
		component.init(el);
	});
})

