//交集
var newArr2 = nums1 =>nums2 => nums1.filter((item) => {
    return nums2.includes(item);
});
//大小写取反
function processString (s) {
    var arr = s.split('');
    var new_arr = arr.map((item) => {
        return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
    });
    return new_arr.join('');
}
//字符串匹配
/**
 * 
 * @param {string} S 
 * @param {string} T 
 */
const find = (S, T) => {
    if (S.length < T.length) return -1
    for (let i = 0; i < S.length; i++) {
      if (S.slice(i, i + T.length) === T) return i
    }
    return -1
  }

//判断是否是一个正确的网址
/**
 * 
 * @param {string} url 
 */
function isUrl(url) {
	const a = document.createElement('a')
	a.href = url
	return [
		/^(http|https):$/.test(a.protocol),
		a.host,
		a.pathname !== url,
		a.pathname !== `/${url}`,
	].find(x => !x) === undefined
}


//简易版new
function create(){
	var constructor = [].shift.call(arguments);
	var obj = Object.create(constructor);
	var res = constructor.apply(obj, arguments);
	return res instanceof Object ? res:obj;
	
}


//模拟assign
if(typeof Object.assiGn !='function'){
	Object.defineProperty(Object,'assiGn',{
		value:function(target){
			'use strict';
			if(target==null){
				throw new TypeError('cannot convert defined or null to object!');
			}
			var to = Object(target);
			for(var i = 1;i< argumnets.length;i++){
				var nextSource = arguments[i];
				if(nextSource != null){
					for(var nextKey in nextSource){
						if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){
							to[nextKey]=nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		enumerable:false,
		writable:true,
		configurable:true
	});
}


/**
 * 列表转换属性，利用浅拷贝
 * @param {Array} list 
 */
function listToTree(list){
	let res = [];
	let map = list.reduce((res,v)=(res[v.id]=v, res),{});
	//利用浅拷贝
	for(const item of list){
		if(item.parentId==0){
			res.push(item);
			continue
		}
		if(item.parentId in map){
			const parent = map[item.partentId];
			parent.children = parent.children||[];
			parent.children.push(item);
		}
	}
	return res;
}


function create() { 
	let con = [].shift.call(arguments);
	let obj = Object.create(null);
	obj.__proto__ = con.prototype;
	let res = con.apply(obj,arguments)
	return res instanceof Object ? res:obj
}


function currying(fn, length) { 
    length = length || fn.length;
    return function (...args) { 
        return args.length >= length
            ? fn.apply(this, args)
            : currying(fn.bind(this, ...args),length-args.length)
    }
}






function add(...a) {
	let sum = [...a].reduce((x, y) => x + y);
	function least(...b) { 
		sum = [...b].reduce((x, y) => x + y, sum);
		return least
	}
	least.toString = () => { 
		return sum
	}
	return least
  }



var inherit = (function (c, p) {
	var F = function () { };
	return function (c, p) { 
		F.prototype = p.prototype;
		c.prototype = new F();
		c.uber = p.prototype;
		c.prototype.constructor = c;
	}
})();


function myFetch(url, mode = "GET", header = undefined) { 
	return new Promise((resolve, reject) => {
		const xhr = XMLHttpRequest(url);
		if (header !== undefined) {
			for (const item of header) { 
				xhr.setRequestHeader(item.type, item.params);
			}
		}
		xhr.open(mode, url);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.onerror = () => reject(xhr.statusText);
		xhr.send();
	})
}



export default tools;