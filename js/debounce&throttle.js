function debounce(fn, delay, immediate) {
    let timer = null;
    function debounced() {
        let context = this;
        let args = arguments;
        if (timer && immediate) {
            fn.apply(context, args);
        }
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(() => { fn.apply(context, args) }, delay);
    }
    debounced.clearTimer = () => {
        clearTimeout(timer);
    }
    return debounced
}

function throttle(fn, delay, immediate) {
    let callNow = immediate,
        timer = null;
    
    function throttled() {
        let context = this;
        let args = arguments;
        if (callNow) { fn.apply(context, args); callNow = false }
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay);
        }
    }
    throttled.clearTimer = () => {
        clearTimeout(timer);
    }
    return throttled;

}

function currying(fn, length) { 
    length = length || fn.length;
    return function (...args) { 
        return args.length >= length
            ? fn.apply(this, args)
            : currying(fn.bind(this, ...args),length-args.length)
    }
}





export default debounce;
export default throttle;