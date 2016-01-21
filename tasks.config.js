var Config = {};

Config.build = {
    distPath: 'dist/'
};


Config.server = {
    path: 'server/',
    runnable: Config.build.distPath + 'index.js',
    filePattern: ['!server/**/*.factory.*', '!server/**/*.spec.*', 'server/**/*.{jade,js,css,json}',  'package.json', 'trace.config.js', 'Procfile'],
    watchPattern: 'server/**/*.js',
    environmentVariables: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        APP_ROOT_PATH: process.cwd() + '/' + Config.build.distPath + '/',
        IP: process.env.IP || undefined,
        PORT: process.env.PORT || 3000,
        BASE_URL: process.env.BASE_URL || 'http://localhost:3000'
    },
    test: {
        requires: ['co-mocha'],
        flags: ['reporter dot', 'harmony', 'colors'],
        environmentVariables: {
            NODE_ENV: process.env.NODE_ENV || 'test',
            APP_ROOT_PATH: process.cwd() + '/server/'
        }
    },
    codeStylePattern: 'server/**/*.js',
    templateCodeStylePattern: 'server/**/*.jade'
};

module.exports = Config;
