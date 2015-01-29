'use strict';

var JadeInheritance = require('jade-inheritance');

module.exports = function(grunt) {
	var config = grunt.config('jade.compile.files');

	// if using single file setup
	if (config && config.length) {
		config = config[0];
	}
	// if using separate tasks folder
	else {
		// use load grunt configs to get the jade task config info
		var jadeConfig = require("load-grunt-configs")(grunt, {
			config: {
				// we try to support for coffee or js tasks
				src: "tasks/jade.*"
			}
		});

		// grab first array of files, like original plan was to do
		config = jadeConfig.jade.compile.files[0];

		if (!config) throw ('Require jade task and propper task architecture');
	}

	var baseDir = config.cwd,
		src = config.src,
		changedFiles = [],

		onChange = grunt.util._.debounce(function() {
			var dependantFiles = [],
				jadeSrc, inheritance;

			jadeSrc = src.map(function(item) {
				return baseDir + '/' + item;
			});

			changedFiles.forEach(function(filename) {
				inheritance = new JadeInheritance(filename, baseDir, {basedir : baseDir});
				dependantFiles = dependantFiles.concat(inheritance.files);
			});

			dependantFiles = dependantFiles.filter(function(filename, i) {
				return grunt.file.isMatch(jadeSrc, baseDir + '/' + filename);
			});

			config.src = dependantFiles;

			grunt.config('jade.compile.files', [config]);

			changedFiles = [];
		}, 200);

	grunt.event.on('watch', function(event, filepath, watchParam) {
		changedFiles.push(filepath);
		onChange();
	});
};