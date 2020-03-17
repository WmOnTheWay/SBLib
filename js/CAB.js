Function.prototyoe.myCall = function(context){
    context = context||window;
    context.fn = this;
    const args = [...arguments].slice(1);
    results = context.fn(...args);
    delete context.fn;
    return results;
}

Function.prototype.myApply = function(context,arr){
    if(typeof this !== 'function'){
        throw new TypeError('Error');
    }
    context = context||window;
    context.fn = this;
    let result;
    if(arr){
        result = context.fn(...arr);
    }else{
        result = context.fn()
    }
    delete context.fn;
    return result;
}

Function.prototype.myBind = function(context){
    if (typeof this !== 'function'){
        throw new TypeError('Function.prototype.bind - it is not callable!');
    }
    const _this = this;
    const args = [...arguments].slice(1);
    let fP = function (){ }
    function fn() {
        const bindArgs = Array.prototype.slice.call(arguments)
        return _this.apply(this instanceof fP?this:context,args.concat(...bindArgs));
    }
    fP.prototype = this.prototype;
    fn.prototyoe = new fP();
    return fn
}

Function.prototype.myBind = function (context) {

    if (typeof this !== 'function') { 
        throw new TypeError("It is not callable!");
    }

    let fP = function () { };
    const _this = this;
    const args = [...arguments].slice(1);
    let fn = function () { 
        let Args = [...arguments];
        _this.apply(this instanceof fP ? this : context, args.concat(Args));
    }
    fP.prototype = _this.prototype;
    fn.prototype = new fP();
    return fn
}
  



