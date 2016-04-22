module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['client/client.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'client/client.js',
        dest: 'server/public/assets/scripts/client.min.js'
      }
    },
    copy: {
      main : {
        expand: true,
        cwd: 'node_modules/',
        src: [
          'angular/angular.min.js',
          'angular/angular.min.js.map',
          'angular/angular-csp.css',
          'bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'server/public/vendor/'
      },
      css : {
        expand: true,
        cwd: 'node_modules/',
        src: [
          'bootstrap/dist/css/bootstrap.min.js',
          'bootstrap/dist/css/bootstrap-theme.min.js',
        ],
        dest: 'server/public/views/styles'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'uglify']);
};
