/*
 * grunt-simple-rest
 * https://github.com/yale8848/grunt-simple-rest.git
 *
 * Copyright (c) 2017 yale8848
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        simple_rest: {

            simple: {
                async: true,
                protocol: 'http',
                hosts: ['11.22.33.11'],
                interrupt: false,
                count: 3,
                timeout: 1000,
                timeGap: 1000,
                url: ['/test', 'http://121.42.232.9/DXHPayApp/app/info']
            }

        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'simple_rest', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['simple_rest']);

};