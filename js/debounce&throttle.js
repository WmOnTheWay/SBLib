function debounce(fn, delay, immediate) {
    let timer = null;
    return function () {
        let context =  this;
        let args = arguments;
        if(timer&&immediate){
            fn.apply(context, args);
        }
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(()=>{fn.apply(context,args)}, delay);
    }
}

function throttle(fn, delay,immediate) {
    let callNow = immediate,
        timer=null;
    return function () {
        let context =this;
        let args = arguments;
        if(callNow){fn.apply(context,args);callNow=false}
        if(!timer){
            timer=setTimeout(()=>{
                fn.apply(context, args);
                timer=null;
            }, delay);
        }
    }
}

export default debounce;