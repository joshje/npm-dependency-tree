var ajax = require('ajax-promise');
var _ = require('lodash');
var delegate = require('delegate');

var dependenciesTmpl = require('../../views/partials/dependencies-list.handlebars');
var messageTmpl = require('../../views/partials/message.handlebars');

var packageCache = {};

function renderDependencies(result) {
	if (result.dependencies) {
		if (this.parentNode.classList.contains('dependencies--dependency')) {
			this.parentNode.classList.add('dependencies--dependency__has-children');
		}

		this.innerHTML = dependenciesTmpl(result);

		_.forEach(result.dependencies, function(version, dependency) {
			var dependencyNode = this.querySelector('[data-dependencies-for="'+dependency+'"]');
			getDependencies.call(dependencyNode, dependency)
			.then(renderDependencies.bind(dependencyNode));
		}.bind(this));
	} else {
		this.parentNode.removeChild(this);
	}
}

function getDependencies(package) {
	if (! packageCache[package]) {
		packageCache[package] = ajax.get('/api/package/' + package + '/dependencies');
	}

	return packageCache[package];
}

function init(el) {
	var package = el.getAttribute('data-package');
	getDependencies.call(el, package)
	.then(function(result) {
		if (result.dependencies) {
			renderDependencies.call(el, result);
		} else {
			el.innerHTML = messageTmpl({
				message: 'This package is dependency free'
			});
		}
	});

	delegate(el, '.dependencies--dependency--name', 'click', function(e) {
	   e.delegateTarget.parentNode.classList.toggle('dependencies--dependency__hide-children');
	}, false);
}

module.exports = {
  init: init
};
