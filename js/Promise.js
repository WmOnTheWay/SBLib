/**
 * 解析then返回值与新Promise对象
 * @param {Object} promise2 新的Promise对象 
 * @param {*} x 上一个then的返回值
 * @param {Function} resolve promise2的resolve
 * @param {Function} reject promise2的reject
 */

function resolvePromise(promise2, x, resolve, reject) {
    //排除循环引用
    if (promise2 === x) {
        reject(new TypeError('Promise发生了循环引用'));
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => { resolvePromise(promise2, y, resolve, reject); }, (r) => { reject(r); });
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

function Promise(executor) {
    let _this = this;
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFullfilledFunc = [];
    this.onRejectedFunc = [];


    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e)
    }
    

    function resolve(value) {
        if (_this.state === 'pending') {
            _this.value = value;
            _this.onFullfilledFunc.forEach(fn => fn(_this.value));
            _this.state = 'resolved';
        }
    }

    function reject(reason) {
        if (_this.state === 'pending') {
            _this.reason = reason;
            _this.onRejectedFunc.forEach(fn => fn(_this.reason));
            _this.state = 'rejected';
        }
    }
}


Promise.prototype.then = function (onFullfilled, onRejected) {
    let _this = this;
    var promise2 = new Promise((resolve, reject) => {
        if (_this.state === 'pending') {
            if (typeof onFullfilled === 'function') {
                _this.onFullfilledFunc.push(()=>{
                    try{
                        const x = onFullfilled(_this.value);
                        resolvePromise(promise2,x,resolve, reject);
                    }catch(e){
                        reject(e);
                        }
                });
            }
            if (typeof onRejected === 'function') {
                _this.onFullfilledFunc.push(()=>{
                    try{
                        const x = onRejected(_this.reason);
                        resolvePromise(promise2,x,resolve, reject);
                    }catch(e){
                        reject(e);
                        }
                });
            }
        }
        if (_this.state === 'resolve'){setTimeout(()=>{
            try {
                let x = _this.onFullfilled(_this.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (reason) {
                reject(reason);
            }
        },0);}
        if (_this.state === 'reject'){setTimeout(()=>{
            try {
                let x = _this.onRejected(_this.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (reason) {
                reject(reason);
            }
        },0);}
    });
    return promise2;
};
Promise.prototype.catch = function (errFn){
  return this.then(null, errFn);
}
Promise.prototype.finally = function (fn){
    this.then(()=>{fn();},()=>{fn();});
    return this;
}

Promise.all = function(values){
    return new Promise((resolve, reject)=>{
        let results =[];
        let index = 0;
        function addArr(key , value){
            index++;
            results[key] = value;
            if(index === value.length){
                return resolve(results)
            }
        }
        for (let i = 0; i<values.length;i++){
            let current =values[i];
            if(current && current.then && typeof current.then === 'function'){
                current.then((value)=>{addArr(i, value)},reject);
            }else{
                addArr(i, current);
            }
        }
    })
}

Promise.race = function(values){
    return new Promise((resolve,reject)=>{
        for (let i = 0; i<values.length;i++){
            let current =values[i];
            if(current && current.then && typeof current.then === 'function'){
                current.then(resolve,reject);
            }else{
                resolve(values);
            }
        }
    })

}
Promise.resolve = function(value){
    return new Promise((resolve, reject)=>{resolve(value);})
}
Promise.reject = function(reason){
    return new Promise((resolve, reject)=>{reject(reason);})
}
Promise.defer = Promise.deferred =  function(){
    let dfd = {};
    dfd.promise = new Promise((resolve, reject)=>{
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
module.exports = Promise;

var promisesAplusTests =  require("promises-aplus-tests");

promisesAplusTests(Promise, function(err){
     //完成；输出在控制台中。或者检查`err`以了解失败的数量。 
});