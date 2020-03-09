

/**
 * 一个简单的异步顺序执行函数promise
 * @param {function} executor
 */
class myPromise {
    constructor(executor) {
        let _this = this;
        _this.status = 'pending';
        _this.value = undefined;
        _this.reason = undefined;
        _this.onFilfulledCallbacks = [];
        _this.onRejectedCallbacks = [];
        function resolve(value) {
            if (_this.status == 'pending') {
                _this.status = 'resolved';
                _this.value = value;
                _this.onFilfulledCallbacks.forEach((fn) => {
                    fn();
                });
            }
        }
        function reject(reason) {
            if (_this.status == 'pending') {
                _this.status = 'rejected';
                _this.reason = reason;
                _this.onRejectedCallbacks.forEach((fn) => {
                    fn();
                });
            }
        }
        try {
            executor(resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    /**
     * promise的then方法返回一个新的promise对象，传入回调函数
     * @param {function} onFulfilled
     * @param {function} onRejected
     */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : v => v;
        onRejected = typeof onRejected == 'function' ? onRejected : e => { throw e; };
        const _this = this;
        const promise2 = new myPromise((resolve, reject) => {
            if (_this.status == 'resolved') {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(_this.value);
                        resolvePromiseRelation(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status == 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(_this.reason);
                        resolvePromiseRelation(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0);
            }
            if (_this.status == 'pending') {
                _this.onFilfulledCallbacks.push(function () {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(_this.value);
                            resolvePromiseRelation(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                _this.onRejectedCallbacks.push(function () {
                    setTimeout(() => {
                        try {
                            const x = onRejected(_this.reason);
                            resolvePromiseRelation(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    }
    catch(errFn) {
        return this.then(null, errFn);
    }
    finally(fn) {
        this.then(() => { fn(); }, () => { fn(); });
        return this;
    }
    static all(values) {
        return new myPromise((resolve, reject) => {
            let results = [];
            let index = 0;
            function addToArray(key, value) {
                index++;
                results[key] = value;
                if (index == values.length) {
                    resolve(results);
                }
            }
            for (let i = 0; i < values.length; i++) {
                let current = values[i];
                if (current && current.then && typeof current.then == 'function') {
                    current.then((value) => {
                        addToArray(i, value);
                    }, reject);
                }
                else {
                    addToArray(i, current);
                }
            }
        });
    }
    static race(values) {
        return new myPromise((resolve, reject) => {
            for (let i = 0; i < values.length; i++) {
                let current = values[i];
                if (current && current.then && typeof current.then === 'function') {
                    current.then(resolve, reject);
                }
                else {
                    resolve(current);
                }
            }
        });
    }
    static resolve(value) {
        return new myPromise((resolve, reject) => {
            resolve(value);
        });
    }
    static reject(reason) {
        return new myPromise((resolve, reject) => {
            reject(reason);
        });
    }
    static deferred() {
        let dfd = {};
        dfd.promise = new myPromise((resolve, reject) => {
            dfd.resolve = resolve;
            dfd.reject = reject;
        });
        return dfd;
    }
}

// 实现一个promise的延迟对象 defer
/**
 * 该函数用来处理新旧promis的关系
 * @param {myPromise} promise 当前的promise
 * @param {myPromise} x 回调之后的结果
 * @param {function} resolve executor执行成功时的回调函数
 * @param {function} reject executor执行失败时的回调函数
 */
function resolvePromiseRelation(promise, x, resolve, reject) {
    let called = false;
    if (promise === x) {
        return reject(new TypeError('Circular Reference!'));
    }
    if (x != null && (typeof x == 'object' || typeof x == 'function')) {
        try {
            const then = x.then;
            if (typeof then == 'function') {
                then.call(
                    x,
                    (promiseNext) => {
                        if (called) return;
                        called = true;
                        resolvePromiseRelation(x, promiseNext, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    });
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}



var promisesAplusTests = require("promises-aplus-tests");

promisesAplusTests(myPromise, function (err) {
    //完成；输出在控制台中。或者检查`err`以了解失败的数量。 
});
