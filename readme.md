#Grunt-jade-inheritance
Inspired by [jade-inheritance](https://www.npmjs.org/package/jade-inheritance).

Watch jade files, and rebuild only changed jade file and all it dependencies (extended, included, mixins).

This is almost the same as [jade-inheritance](https://www.npmjs.org/package/jade-inheritance), but without additional settings.
This plugin you should use with [grunt-contrib-jade](https://www.npmjs.org/package/grunt-contrib-jade). It's some kind of addon, which help rebuild only needed jade templates.

All what you need to do is:
- configure [grunt-contrib-jade](https://www.npmjs.org/package/grunt-contrib-jade)
- `grunt.loadNpmTasks('grunt-jade-inheritance');`

And one more. For [grunt-contrib-jade](https://www.npmjs.org/package/grunt-contrib-jade), you should use such configuration architecture:
```javascript
jade : {
	compile: {
		options:{
			pretty	: true,
			client	: false
		},
		files: [{
			src : [
				'*.jade',
				'!source/**/*.jade'
			],
			dest	: 'build/jade',
			cwd		: 'app/jade',
			expand	: true,
			ext		: '.html'
		}]
	}
}
```