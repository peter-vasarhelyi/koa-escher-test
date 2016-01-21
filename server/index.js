var koa = require('koa');
var koaApp = module.exports = koa();
var config = require('./config');
var App = require('js-stack').app;
var suiteEscher = require('suite-js-sdk').authentication.request;

var escherCfg = {
  credentialScope: 'eu/integration/ems_request',
  keyPool: JSON.stringify([{ 'keyId': 'escher_key', 'secret': 'escher_secret', 'acceptOnly': 0 }])
};

var app = new App(koaApp);

app.addMiddleware(suiteEscher.getKoaInterceptorMiddleware(escherCfg));
app.addBodyParseMiddleware();
app.addMiddleware(suiteEscher.getKoaAuthenticatorMiddleware());

app.addMiddleware(function*() {
  this.body = {
    msg: 'Hello world',
    requestBody: this.request.body
  };
});

if (!module.parent) { app.listen(config.port); }
