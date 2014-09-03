module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      allFiles: ['Gruntfile.js', 'src/**/*.js']
    },
    uglify: {
      options: {
        mangle: true,
        preserveComments: 'some'
      },
      build: {
        files: {
          'dist/angular-perfect-scrollbar.min.js': ['src/angular-perfect-scrollbar.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'uglify:build']);

};
