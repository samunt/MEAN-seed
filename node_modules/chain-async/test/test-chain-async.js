var chai = require('chai');
var should = chai.should();
var chainAsync = require('../src/index.js');

chai.use(require('chai-sorted'));
chai.use(require('chai-things'));

describe('chain-async', function() {

    it('should be execute series of async functions with callbacks', function(done) {
        chainAsync.series([
            function operation1(callback) {
                setTimeout(function() {
                    callback(undefined, 'result1');
                }, Math.random() * 200);
            },
            function operation2(callback) {
                setTimeout(function() {
                    callback(undefined, 'result2');
                }, Math.random() * 200);
            },
            function operation3(callback) {
                setTimeout(function() {
                    callback(undefined, 'result3');
                }, Math.random() * 200);
            },
        ], function callback(err, res) {
            res.should.be.a('array');
            res.should.be.length(3);
            res.should.be.deep.equal(['result1', 'result2', 'result3']);
            done();
        });
    });

    it('should break execution of set of async functions in series when error occurs', function(done) {
        chainAsync.series([
            function operation1(callback) {
                setTimeout(function() {
                    callback(undefined, 'result1');
                }, Math.random() * 200);
            },
            function operation2(callback) {
                setTimeout(function() {
                    callback('error1', undefined);
                }, Math.random() * 200);
            },
            function operation3(callback) {
                setTimeout(function() {
                    callback(undefined, 'result3');
                }, Math.random() * 200);
            },
        ], function callback(err, res, index) {
            err.should.be.equal('error1');
            res.should.be.a('array');
            res.should.be.length(1);
            res.should.be.deep.equal(['result1']);
            index.should.be.equal(1);
            done();
        });
    });

    it('should not break if no operations are specified to be executed in series', function(done) {
        chainAsync.series(undefined, function(err, res, index) {
            res.should.be.a('array');
            res.should.be.length(0);
            index.should.be.equal(-1);
            done();
        });
    });

    it('should be execute set of async functions in parallel with callbacks', function(done) {

        var order = '';
        chainAsync.parallel([
            function operation1(callback) {
                setTimeout(function() {
                    order += 'operation1';
                    callback(undefined, 'result1');
                }, 400);
            },
            function operation2(callback) {
                setTimeout(function() {
                    order += 'operation2';
                    callback(undefined, 'result2');
                }, 50);
            },
            function operation3(callback) {
                setTimeout(function() {
                    order += 'operation3';
                    callback(undefined, 'result3');
                }, 100);
            },
        ], function callback(err, res) {
            res.should.be.a('array');
            res.should.be.length(3);
            res.should.be.deep.equal(['result1', 'result2', 'result3']);
            order.should.be.equal('operation2operation3operation1');
            done();
        });
    });

    it('should NOT break execution of set of async functions in parallel when error occurs', function(done) {

        var order = '';
        chainAsync.parallel([
            function operation1(callback) {
                setTimeout(function() {
                    order += 'operation1';
                    callback(undefined, 'result1');
                }, 400);
            },
            function operation2(callback) {
                setTimeout(function() {
                    order += 'operation2';
                    callback(undefined, 'result2');
                }, 50);
            },
            function operation3(callback) {
                setTimeout(function() {
                    order += 'operation3';
                    callback('error1', 'result3');
                }, 100);
            },
        ], function callback(err, res) {
            err.should.be.deep.equal([undefined, undefined, 'error1']);
            res.should.be.a('array');
            res.should.be.length(3);
            res.should.be.deep.equal(['result1', 'result2', undefined]);
            order.should.be.equal('operation2operation3operation1');
            done();
        });
    });
    
     it('should not break if no operations are specified to be executed in series', function(done) {
        chainAsync.parallel(undefined, function(err, res, index) {
            res.should.be.a('array');
            res.should.be.length(0);
            index.should.be.equal(-1);
            done();
        });
    });

});