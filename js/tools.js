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


if (typeof Object.assiGn !== 'function') { 
	Object.defineProperty(Object, "assiGn", {
		value: function (target) { 
			'use strict'
			if (target == null) { 
				throw new TypeError("cannot convert undefind or null to object!");
			}
			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) { 
				var nextSource = arguments[i];
				if (nextSource != null) { 
					for (var nextKey in nextSource) { 
						if (Object.hasOwnProperty.call(nextSource, nextKey)) { 
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to
		},
		enumerable: true,
		writable: false,
		configurable:false,
	})
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

//使用cookie来模仿localstorage
if (!window.localStorage) {
	Object.defineProperty(window, "localStorage", new (function () {
		var aKeys = [], oStorage = {};
		Object.defineProperty(oStorage, "getItem", {
			value: function (sKey) {
				return sKey ? this[sKey] : null;
			},
			writable: false,
			configurable: false,
			enumerable: false
		});
		Object.defineProperty(oStorage, "key", {
			value: function (nKeyId) { return aKeys[nKeyId]; },
			writable: false,
			configurable: false,
			enumerable: false
		  });
		  Object.defineProperty(oStorage, "setItem", {
			value: function (sKey, sValue) {
			  if(!sKey) { return; }
			  document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
			},
			writable: false,
			configurable: false,
			enumerable: false
		  });
		  Object.defineProperty(oStorage, "length", {
			get: function () { return aKeys.length; },
			configurable: false,
			enumerable: false
		  });
		  Object.defineProperty(oStorage, "removeItem", {
			value: function (sKey) {
			  if(!sKey) { return; }
			  document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			},
			writable: false,
			configurable: false,
			enumerable: false
		  });
		  this.get = function () {
			var iThisIndx;
			for (var sKey in oStorage) {
			  iThisIndx = aKeys.indexOf(sKey);
			  if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
			  else { aKeys.splice(iThisIndx, 1); }
			  delete oStorage[sKey];
			}
			for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
			for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
			  aCouple = aCouples[nIdx].split(/\s*=\s*/);
			  if (aCouple.length > 1) {
				oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
				aKeys.push(iKey);
			  }
			}
			return oStorage;
		  };
		  this.configurable = false;
		  this.enumerable = true;
	})());
}
//并不那么严谨的localStorage对象的实现
if (!window.localStorage) {
	window.localStorage = {
	  getItem: function (sKey) {
		if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
	  },
	  key: function (nKeyId) {
		return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
	  },
	  setItem: function (sKey, sValue) {
		if(!sKey) { return; }
		document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
		this.length = document.cookie.match(/\=/g).length;
	  },
	  length: 0,
	  removeItem: function (sKey) {
		if (!sKey || !this.hasOwnProperty(sKey)) { return; }
		document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		this.length--;
	  },
	  hasOwnProperty: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	  }
	};
	window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
  }



  if (!Object.is) {
	Object.is = function(x, y) {
	  // SameValue algorithm
	  if (x === y) { // Steps 1-5, 7-10
		// Steps 6.b-6.e: +0 != -0
		return x !== 0 || 1 / x === 1 / y;
	  } else {
		// Step 6.a: NaN == NaN
		return x !== x && y !== y;
	  }
	};
  }


function cloneDeep(x) { 
	const root = {};

	const loopList = [
		{
			parent: root,
			key: undefined,
			data: x,
		}
	];

	while (loopList.length) {
		const node = loopList.pop();
		const parent = node.parent;
		const key = node.key;
		const data = node.data;

		let res = parent;

		if (typeof key !== 'undefined') {
			res = parent[key] = {};
		}

		for (let k in data) {
			if (data.hasOwnProperty(k)) {
				if (typeof data[k] === 'object') {
					
					loopList.push({
						parent: res,
						key: k,
						data: data[k],
					});
				} else {
					res[k] = data[k];
				}
			}
		}
	}

	return root
}

(function(NS){
	var simpleTypes=["number","boolean","undefined","string","function"]
	function stringify(object){
		var type=typeof object
		if(indexOf(simpleTypes,type)>-1){
			return parseSimpleObject(object);
		}
		if(object instanceof Array){
			var len=object.length;
			var resArr=[];
			for(var i=0;i<len;i++){
				var itemType=typeof object[i];
				if(indexOf(simpleTypes,itemType)>-1){
					if(itemType!="undefined"){
						resArr.push(parseSimpleObject(object[i]));
					}
					else{
						resArr.push('null')
					}
				}
				else{
					resArr.push(stringify(object[i]))
				}
			}
			return "["+resArr.join(",")+ "]"
		}
		if(object instanceof Object){
			if(object==null){
				return "null"
			}
			var resArr=[]
			for(var name in object){
				var itemType=typeof object[name];
				if(indexOf(simpleTypes,itemType)>-1){
					if(itemType!='undefined'){
						resArr.push("\"" + name + "\":" + parseSimpleObject(object[name]))
					}
				}
				else{
					resArr.push("\"" + name +"\":" +stringify(object[name]))
				}
			}
			return "{" +resArr.join(",") +"}"
		}
	}
	function parseSimpleObject(object){
		var type=typeof object;
		if(type=="string"||type=="function"){
			return "\"" + object.toString().replace("\"","\\\"") + "\""
		}
		if(type=="number"||type=="boolean"){
			return object.toString()
		}
		if(type=="undefined"){
			return  "undefined"
		}
		return  "\"" +object.toString().replace("\"","\\\"") +"\""
	}
	function indexOf(arr,val){
		for(var i=0;i<arr.length;i++){
			if(arr[i]===val){
				return i;
			}
		}
		return -1
	}
	NS.stringify=function(object,isEncodeZh){
		var res=stringify(object)
		if(isEncodeZh){
			var encodeRes="";
			for(var i=0;i<res.length;i++){
				if(res.charCodeAt(i)<Oxff){
					encodeRes+=res[i]
				}
				else{
					encodeRes+="\\u"+res.charCodeAt(i).toString(16);
				}
			}
			res=encodeRes
		}
		return res;
	}
	})(window);

export default tools;