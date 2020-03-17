const test2 = (name) => {
    return (target) => {
        target.uname = '李云龙' // name是class的关键词，不能使用。
        target.prototype.name = name
    }
}
var a = 2;
{ 
    console.log(test2,a);
    a = 3;
    var b = 4;
    console.log(test2,a,b);
}
function test2Class() { }

test2('testname')(test2Class);
let test2Obj = new test2Class()

// 结果
console.log(test2Class.name,
    test2Class.uname,
    test2Obj.name)