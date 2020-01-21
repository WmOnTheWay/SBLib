//交集
var newArr2 = nums1.filter((item) => {
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
const find = (S, T) => {
    if (S.length < T.length) return -1
    for (let i = 0; i < S.length; i++) {
      if (S.slice(i, i + T.length) === T) return i
    }
    return -1
  }

//判断是否是一个正确的网址
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

//list转树
function convert(list) {
	const res = []
	const map = list.reduce((res, v) => (res[v.id] = v, res), {})
	for (const item of list) {
		if (item.parentId === 0) {
			res.push(item)
			continue
		}
		if (item.parentId in map) {
			const parent = map[item.parentId]
			parent.children = parent.children || []
			parent.children.push(item)
		}
	}
	return res
}
//简易版new
function create(){
	var constructor = [].shift.call(arguments);
	var obj = Object.create(constructor);
	var res = constructor.apply(obj, arguments);
	return res instanceof Object ? res:obj;
	
}


export default tools;
