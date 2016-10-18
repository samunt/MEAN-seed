/**
 * @author rintoj (Rinto Jose)
 * @license The MIT License (MIT)
 *
 * Copyright (c) 2016 rintoj
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the " Software "), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED " AS IS ", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/


var _series = function series(operations, callback) {

    if (!operations || operations.length === 0) {
        return callback(undefined, [], -1);
    }

    var chain = function chain(index, response) {
        if (index < operations.length) {
            return operations[index].call(this, function(err, res) {
                if (err) {
                    if (typeof callback === 'function') callback(err, response, index);
                    return;
                }
                response.push(res);
                chain(index + 1, response);
            })
        }

        operations = [];
        if (typeof callback === 'function') callback(undefined, response, index);
    };

    chain(0, []);
    return this;
};

var _parallel = function parallel(operations, callback) {

    if (!operations || operations.length === 0) {
        return callback(undefined, [], -1);
    }

    var response = operations.map(function() {
        return undefined;
    });
    var errors = operations.map(function() {
        return undefined;
    });

    var responseCount = 0,
        errorCount = 0;

    var chain = function chain(index, response) {
        if (index < operations.length) {
            setTimeout(function() {
                return operations[index].call(this, function(err, res) {
                    if (err) {
                        errors[index] = err;
                        ++errorCount;
                    } else {
                        response[index] = res;
                    }
                    if (++responseCount === operations.length) {
                        operations = [];
                        if (typeof callback === 'function') {
                            callback(errorCount === 0 ? undefined : errors, response);
                        }
                        return;
                    }
                });
            });
            chain(index + 1, response);
        }
    };

    chain(0, response);
    return this;
};

module.exports = {
    series: function series(operations, callback) {
        _series.apply(this, arguments);
    },

    parallel: function parallel(operations, callback) {
        _parallel.apply(this, arguments);
    },

};