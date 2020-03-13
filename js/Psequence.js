
function resolvePromise(promise, x, resolve, reject) {
    let called =false ;
    if (promise === x) { return reject(new TypeError("Circular refence!")) }
    if (x != null && (typeof x === "object" || typeof x === "function")) {
        try {
            let then = x.then
            if (typeof then == "function") {
                then.call(
                    x,
                    (nextPromise) => {
                        if (called) return;
                        called = true;
                        resolvePromise(x, nextPromise, resolve, reject)
                    },
                    (reason) => {
                        if (called) return;
                        called = true;
                        reject(reason);
                    });
            } else {
                resolve(x);
            }
        } catch (reason) {
            reject(reason);
        }
    } else {
        resolve(x);
    }
}


class yPromise {
    constructor(excutor) {
        let _this = this;
        _this.state = "PENDING";
        _this.value = null;
        _this.reason = null;
        _this.onFullfilledFunc = [];
        _this.onRejectedFunc = [];
        function resolve(value) {
            if (_this.state == "PENDING") {
                _this.state = "RESOVLED";
                _this.value = value;
                _this.onFullfilledFunc.forEach((fn) => {fn()});
            }
        }
        function reject(reason) {
            if (_this.state == "PENDING") {
                _this.state = "REJECTED";
                _this.reason = reason;
                _this.onRejectedFunc.forEach((fn) => {fn()});
            }
        }
        try {
            excutor(resolve, reject);
        }
        catch (err) {
            reject(err);
        }
    }
    then(onFullfilled, onRejected) {
        onFullfilled = typeof onFullfilled === "function" ? onFullfilled : v => v;
        onRejected = typeof onRejected === "function" ? onRejected : r => { throw r; };
        const _this = this;
        let ps2 = new yPromise((resolve, reject) => {
            if (_this.state == "RESOVLED") {
                setTimeout(() => {
                    try {
                        const x = onFullfilled(_this.value);
                        resolvePromise(ps2, x, resolve, reject);
                    }
                    catch (err) {
                        reject(err);
                    }
                },0);
            }
            if (_this.state == "REJECTED") {
                setTimeout(() => {
                    try {
                        const x = onRejected(_this.reason);
                        resolvePromise(ps2, x, resolve, reject);
                    }
                    catch (err) {
                        reject(err);
                    }
                }, 0);
            }
            if (_this.state == "PENDING") {
                _this.onFullfilledFunc.push(function () {
                    setTimeout(() => {
                        try {
                            const x = onFullfilled(_this.value);
                            resolvePromise(ps2, x, resolve, reject);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                _this.onRejectedFunc.push(function () {
                    setTimeout(() => {
                        try {
                            const x = onRejected(_this.reason);
                            resolvePromise(ps2, x, resolve, reject);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            }
        });
        return ps2;
    }
    catch(errFn) {
        return this.then(null, errFn);
    }
    finally(fn) {
        let p = this.constructor;
        return this.then(
            value => p.resolve(fn()).then(() => value, () => value),
            reason => p.resolve(fn()).then(() => { throw reason},() => { throw reason})
        );
    }
    static all(values) {
        return new yPromise((resolve, reject) => {
            let results = [], index = 0;
            function addArr(key, value) {
                index++;
                results[key] = value;
                if (index == values.length) {
                    resolve(results);
                }
            }
            for (let i = 0; i < values.length; i++) {
                let current = values[i];
                if (current && current.then && typeof current.then == "function") {
                    current.then((value) => {
                        addArr(i, value);
                    }, reject);
                }
                else{
                    addArr(i, current);
                }
                    
            }
        });
    }
    static race(values) {
        return new yPromise((resolve, reject) => {
            for (let i = 0; i < values.length; i++) {
                let current = values[i];
                if (current && current.then && typeof current.then == "function") {
                    current.then(resolve, reject);
                }
                else {
                    resolve(current);
                }
            }
        });
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value);
        });
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
    static deferred() {
        let defer = {};
        defer.promise = new Promise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    }
}







var promiseAplusTest = require("promises-aplus-tests");
promiseAplusTest(yPromise, function (err) {
    //完成；输出在控制台中。或者检查`err`以了解失败的数量。
})

