module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		sass: {
			dist: {
				files: {
					"css/core.css": "scss/core.scss"
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					"css/core.min.css": "css/core.css"
				}
			}
		},
		eslint: {
			options: {
				configFile: "eslint.json"
			},
			target: ["js/**/*.js"]
		},
		watch: {
			scss: {
				files: "scss/**/*.scss",
				tasks: ["sass", "cssmin"],
				options: {
					livereload: true
				}
			},
			js: {
				files: "js/**/*.js",
				tasks: ["eslint"]
			},
			html: {
				files: "*.html",
				options: {
					livereload: true
				}
			},
			configFiles: {
				files: ["Gruntfile.js"],
				options: {
					reload: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.registerTask("default", ["watch"]);
};
