'use strict';

var getRawBody = require('raw-body');
var Escher = require('escher-auth');
var extend = require('extend');

var escherObj = Escher.create({
    algoPrefix: 'EMS',
    credentialScope: 'eu/integration/ems_request',
    authHeaderName: 'X-Ems-Auth',
    dateHeaderName: 'X-Ems-Date'
});

var escherKeyDb = function(key) {
    return 'escher_secret';
};


module.exports.pre = function *(next) {
    var ctx = this;

    ctx.isEscherSigned =
        getRawBody(ctx.req).then(function (data) {
            ctx.request.body_original = data.toString();

            var request = extend({}, ctx.request, {body: data.toString()});

            return escherObj.authenticate(request, escherKeyDb);
        });

    yield next;
};

module.exports.post = function *(next) {
    try {
        var escherResult = yield this.isEscherSigned;
        console.log('esch :-))', escherResult);
    } catch (ex) {
        console.log('eschERRR :-((');
        this.throw(escherResult, 401);
    }

    yield next;
};