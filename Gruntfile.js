(function() {
  'use strict';
  module.exports = function (grunt) {
    var iniparser = require('iniparser');
    var compassSettings = iniparser.parseSync('./config.rb') || undefined;

    var options = {
      port: 9088,
      css: compassSettings.css_dir,
      sass: compassSettings.sass_dir,
      img: compassSettings.images_dir,
      js: compassSettings.javascripts_dir
    };

    grunt.initConfig({
      connect: {
        server: {
          options: {
            port: 9088,
            base: './',
            livereload: 9099
          }
        }
      },

      open: {
        dev: {
          path: 'http://localhost:9088'
        }
      },

      watch: {
        options: {
          livereload: 9099
        },
        html: {
          files: ['./{,**/}*.html']
        },
        css: {
          files: ['./css/{,**/}*.css']
        },
        js: {
          files: [
            './js/{,**/}*.js',
            '!./js/{,**/}*.min.js'
          ]
        },
        img: {
          files: ['./images/{,**/}*.*']
        }
      },

      compass: {
        options: {
          relativeAssets: true,
          bundleExec: true,
          config: 'config.rb'
        },
        dev: {
          watch: true
        }
      },

      jshint: {
        option: {
          jshintrc: '.jshintrc'
        },
        all: ['./js/{,**/}*.js', '!./js/{,**/}*.min.js']
      },

      parallel: {
        dev: {
          options: {
            grunt: true,
            stream: true
          },
          tasks: ['watch', 'compass:dev']
        }
      }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //////////////////////////////
    // Serve Task
    //////////////////////////////
    grunt.registerTask('serve', 'Development Server', function() {
      grunt.task.run(['connect:server']);

      if (grunt.option('launch')) {
        grunt.task.run(['open:dev']);
      }
      grunt.task.run(['parallel:dev']);
    });

    //////////////////////////////
    // Test Task
    //////////////////////////////
    grunt.registerTask('test', function() {
      console.log('Test!');
    });

  };
})();