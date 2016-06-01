var expect = require('chai').expect;
var pc     = require('../promise-commander');


describe('common functionality', function() {

    describe('as promise', function() {

        describe('in series', function() {

            it('worked', function(done) {
                pc.mapSeries([0, 1, 2, 3, 4, 5, 6], function() {
                    return new Promise(function(resolve) {
                        setTimeout(resolve);
                    });
                }).then(function(data) {
                    expect(data.length).to.equal(7);
                    done();
                });
            });

            it('correct result', function(done) {
                pc.mapSeries([0, 1, 2, 3, 4, 5, 6], function(i) {
                    return new Promise(function(resolve) {
                        setTimeout(resolve.bind(null, 'OK' + i));
                    });
                }).then(function(data) {
                    expect(data.length).to.equal(7);
                    for (var i = 0; i < 7; i++) {
                        expect(data[i]).to.equal('OK' + i);
                    }
                    done();
                });
            });
        });

        describe('parallel', function() {

            it('worked', function(done) {
                pc.mapLimit([0, 1, 2, 3, 4, 5, 6], 3, function() {
                    return new Promise(function(resolve) {
                        setTimeout(resolve);
                    });
                }).then(function(data) {
                    expect(data.length).to.equal(7);
                    done();
                });
            });

            it('correct result', function(done) {
                pc.mapLimit([0, 1, 2, 3, 4, 5, 6], 3, function(i) {
                    return new Promise(function(resolve) {
                        setTimeout(resolve.bind(null, 'OK' + i));
                    });
                }).then(function(data) {
                    expect(data.length).to.equal(7);
                    for (var i = 0; i < 7; i++) {
                        expect(data[i]).to.equal('OK' + i);
                    }
                    done();
                });
            });
        });
    });
});

describe('if sync callbacks', function() {

    describe('callback must be called', function() {

        it('once', function(done) {
            pc.mapSeries([0], function(i) {

            }).then(function() {
                done();
            });
        });

        it('twice', function(done) {
            var calledCount = 0;

            pc.mapSeries([0, 1], function(i) {
                calledCount++;

            }).then(function() {
                expect(calledCount).to.equal(2);
                done();
            });
        });

    });

    describe('reject promise', function() {

        it('if error occur', function(done) {
            pc.mapSeries([0, 1], function(i) {
                if (i === 1) {
                    throw new Error('some error');
                } else {
                    next();
                }

            }).catch(function(e) {
                expect(e).to.be.an.instanceof(Error);
                done();
            });
        });

        it('stop iterate', function(done) {
            var calledCount = 0;

            pc.mapSeries([0, 1, 2, 3, 4], function(i) {
                calledCount++;

                if (calledCount === 2) {
                    throw new Error('some error');
                }

            }).catch(function(e) {
                expect(e).to.be.an.instanceof(Error);
                expect(calledCount).to.equal(2);
                done();
            });
        });

    });
});

describe('if async callbacks', function() {

    describe('callback must be called', function() {

        it('once', function(done) {
            pc.mapSeries([0], function() {
                return Promise.resolve();

            }).then(function() {
                done();
            });
        });

        it('twice', function(done) {
            var calledCount = 0;

            pc.mapSeries([0, 1], function() {
                calledCount++;

                return Promise.resolve();

            }).then(function() {
                expect(calledCount).to.equal(2);
                done();
            });
        });

    });

    describe('reject promise', function() {

        it('if error occur', function(done) {
            pc.mapSeries([0, 1, 2], function(i) {
                if (i === 1) {
                    throw new Error('some error');
                }

            }).catch(function(e) {
                expect(e).to.be.an.instanceof(Error);
                done();
            });
        });

        it('stop iterate', function(done) {
            var calledCount = 0;

            pc.mapSeries([0, 1, 2, 3, 4], function(i) {
                calledCount++;

                if (calledCount === 2) {
                    throw new Error('some error');
                }

            }).catch(function() {
                expect(calledCount).to.equal(2);
                done();
            });
        });

    });

});
