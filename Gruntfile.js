module.exports = (grunt) => {

    // eslint-disable-next-line import/no-extraneous-dependencies
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        mochaTest: {
            e2e: {
                options: {
                    reporter: 'spec',
                    quiet: false,
                    timeout: 10000,
                    clearRequireCache: true,
                },
                src: ['test/e2e/**/*.spec.js']
            }
        },

        nyc: {
            cover: {
                options: {
                    include: ['app/**'],
                    exclude: '*.test.*',
                    reporter: ['lcov', 'text-summary'],
                    reportDir: 'coverage',
                    all: true
                },
                cmd: false,
                args: ['grunt', '--gruntfile', 'Gruntfile.js', 'mochaTest:e2e']
            }
        }
    });

    grunt.registerTask('e2eTest', ['mochaTest:e2e']);

    grunt.registerTask('e2eTestCoverage', ['mocha_nyc:coverage']);

    grunt.registerTask('e2eTest-watch', ['watch:e2eTest']);

    grunt.registerTask('serve', ['express:dev', 'watch']);

    grunt.registerTask('default', 'serve');

    grunt.loadNpmTasks('grunt-simple-nyc');

};
