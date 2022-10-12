// let a;
// console.log(a)
// a = 2

var b;
b = 3;
console.log(b) // b = 3

var c
console.log(c) // c = undefined
c = 4

foo()

function foo() {
    c = 5
    console.log(c) // c = 5
    var c
}

//函数作用域


bar()

function bar() {
    var aa = 20
    console.log(aa)
}
console.log(aa)

//立即执行函数

//写法一
(function () {
    var bb = 2;
    console.log(bb)
})()

//写法二
(function () {
    var bb = 2;
    console.log(bb)
}())

//不具有块级作用域
// 例一
console.log(i)
for (var i = 0; i < 5; i++) {
    console.log(i)
}
//i 在 for外部作用域中也可以访问
console.log('===', i) //i = 5

//例二
if (true) {
    var m = 99
    console.log(m)
}
console.log(m) // m =99

// 块级作用域
for (let i = 0; i < 5; i++) {
    console.log(i)
}
//i 在 for外部作用域中也可以访问
console.log('===', i) //i  is not defined

if (true) {
    let m = 99
    console.log(m)
}
console.log(m) // m is not defined

//闭包

//例一
function foo1() {
    var a = 100

    function bar() {
        console.log(a)
    }
    return bar
}

var foo2 = foo1()
foo2() // 这就是闭包，函数bar脱离词法作用域仍然可以执行

//例二
function bar2() {
    var q = 9

    function bar() {
        console.log(q)
    }
    foo3(bar)
}

function foo3(fn) {
    fn()
}

bar2()


//闭包和循环

/**   
 * settimeout 定时器会在 for 循环结束之后执行，
 * 由于var i 在for 循环中不存在块级作用域，也就是这里的i是全局的
 * for 循环结束时 i = 5，所以定时函数会输出 5个 5
*/
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i) //此处的i输入5个5
    }, 1000);
}

/** 
 * let 会给for函数创建块级作用域
 * 也就是 i 只在 for(){}里面可用
 * 每次循环都会创建一个新的作用域
*/
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i) //此处的i输入 0,1,2,3,4
    }, 1000);
}

/**  
 * 每次循环都将i 传递到立即执行函数创建的封闭作用域中
 * 这样循环五次就会产生五个 i 的副本，0，1，2，3，4
 * 
*/
for (var i = 0; i < 5; i++) {
    (function (m) {
        setTimeout(() => {
            console.log(m) //此处的i输入 0,1,2,3,4
        }, m * 1000);
    })(i)
}

for (var i = 0; i < 5; i++) {
    (function () {
        var m = i
        setTimeout(() => {
            console.log(m) //此处的i输入 0,1,2,3,4
        }, m * 1000);
    })()
}

//模块
var module = function(){
    var something = 'cool'
    var another = [1,2,3,4]

    function doSomething(){
        console.log(something)
    }
    function doAnother(){
        console.log(another.join('-'))
    }
    return {
        doSomething,
        doAnother
    }
}

var mo = module()
mo.doSomething() //这其实就是闭包
mo.doAnother()