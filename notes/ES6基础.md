### ES6

+ 块级作用域let,const

+ 模块化import,export

+ 箭头函数=>

+ 解构赋值[a,b]=[b,a] 

+ 运算符`...`

+ 模板字符串``  [可以换行, $变量, 不需要频繁++]

+ 字符串拓展`includes`,`startWith`,`endsWith`

+ 新增对象方法`Object.assign()/is()`

+ Proxy代理对象

+ Promise

##### 作用域context

**声明变量的六种方法**

ES5只有var和function声明。ES6新增let，const，import和class

### let,var, const:

​	var和function存在变量提升，在代码执行前的编译阶段var会被提升且初始化为undefined，function会被提升且初始化赋值，他们无视块级作用域。const定义的对象属性可以改变，原因是指向对象的堆地址没变

#### Let

**暂时性死区TDZ**

​	在块级作用域内，用let声明的变量在被初始化之前不能被读取或修改，不然会报错。同时let声明的变量不再受外部的影响。`RefrenceError`。从块级作用域开头直到变量初始化完成的区域就叫暂时性死区。

+ TDZ让`typeof`不再百分百安全`typeof(a); let a; RefError` .作为比较，如果一个变量根本没有被声明，使用`typeof`反而不会报错。

```js
{ // TDZ starts at beginning of scope
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2; // End of TDZ (for foo)
}
{
    // TDZ starts at beginning of scope
    const func = () => console.log(letVar); // OK
    // Within the TDZ letVar access throws `ReferenceError`
    let letVar = 3; // End of TDZ (for letVar)
    func(); // Called outside TDZ!
}

```

**块级作用域**

​	ES5只有函数和全局作用域。可能会变量覆盖或者循环变量泄露。`let,const`实际上为 JavaScript 新增了块级作用域, 块级作用域让匿名立即执行函数不在必要了。

```jsx
// IIFE 写法
(function () {var tmp = ...;...}());
// 块级作用域写法 
{ let tmp = ...; ...}
```

**块级作用域和函数声明**

​	考虑到环境导致的行为差异太大，避免在块级作用域内声明函数，写也应该写成函数表达式

```js
// 块级作用域内部的函数声明语句，建议不要使用
{ function f() {return 'fei' }}
// 块级作用域内部，优先使用函数表达式
{ let f = function () {return 'fei'}
```

*拓展*

​	ES5 的函数只能在**顶层作用域**和**函数作用域**之中声明，不能在块级作用域声明。ES6的函数声明类似`let`，对作用域外没影响，但实际上为了兼容老代码，ES6规定浏览器可以有自己的行为方式。

所以实际上，浏览器的ES6块级声明函数类似`var`的声明

```JS
function f() { console.log('I am outside!'); }
(function () {
  //var f = undefined; f被变量提升了
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

#### Const

**基本特点**

+ const声明变量不能改变值，且一旦声明立即初始化，不能留到以后赋值`const a ;报错`

+ 存在暂时性死区

**本质**

​	const保证的是变量指向的**内存地址所保存的数据**不变。对于简单类数据，其指向内存地址保存的数据等同于常量。对于复杂数据，变量指向的内存地址保存的是指向实际数据的指针，至于他指向的数据结构如何变化，就不受控制了。

​	要完全冻结对象，可以递归使用`Object.freeze()`

```jsx
const constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
```

#### 变量提升hoisting

> JavaScript's default behavior of moving all declarations to the top of the current scope. JavaScript only hoists declarations, not initializations.

var声明的变量被提升到当前作用域顶层，但是没有初始化。func会提升并且初始化。都在window对象内。

**注意点**

+ var无视块级作用域，但限制于函数作用域

    ```js
    console.log(a)//undefined
    if (0) {var a }
    console.log(b)//error
    function test(){var b }
    ```

+ var优先级高于func

    ```js
    console.log(a); var a; function a(){};
    //f()
    console.log(a); function a(){}; var a;
    //f()
    ```

+ 块级作用域内的函数声明

    + 对于块级作用域外视为var提升
    + 对于块级作用域内视为func提升
    + usestrict时块级作用域内不影响外部

    ```js
    console.log(a) //undefined
    if (1) {
        console.log(a) // f()
        function a (){}
    }
    //等价于
    var a 
    console.log(a)
    if (1) {
        a = function(){}
        console.log(a)
    }
    ```

+ 立即执行函数LIFE声明的变量外界无法访问

    ```js
    console.log(b);//error
    var a;
    (function a() {a=10;var b;})()
    console.log(a)//un  10没有赋值因为函数立即执行无法赋值
    ```

**综合题目**

```JS
console.log(b)//un
var b=10;
(function b(){
    console.log(b) //f()
    b=20;
    console.log(b)//f()
})()
console.log(b)//10


//--------------------------------------
//难点是最后的为什么是1 不是5, 因为func后面到}为止
//形成了虚拟作用域
console.log(a); //un
if (1){
    console.log(a) //f()
    a=1
    console.log(a) //1
    function a() {}
    console.log(a) //1
    a=5
    console.log(a)//5
}
 console.log(a) //1
//等价于
var a 
console.log(a)
if (1) {
    a = function () {}
    a = 1
    //虚拟作用域开始 a=5不影响外面
    a=5
}


//---------------------------
var a;
if (1) {
    function a () {}
    a =1 //虚拟作用域
}
console.log(a)//f()
```





### 顶层对象属性

顶层对象，在浏览器环境指的是`window`对象，在 Node 指的是`global`对象。顶层对象与全局变量挂钩是JS最大的败笔之一。

[ES2020](https://github.com/tc39/proposal-global) 在语言标准的层面，引入**globalThis**作为顶层对象。确保任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

**问题：**

+ 程序员很容易不知不觉地就创建了全局变量
+ 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
+ 另一方面`window`对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。

ES6规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于顶层对象的属性。[储存在script不在global]也就是说，**从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。**

```js
var a = 1;window.a // 1  

let b = 1;window.b // undefined  不在顶层属性里了，在script里
```

### 字符串数值主流新增方法

```javascript
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.4

Number.isInteger(25) // true
Number.isInteger(25.1) // false

let s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

```

### 函数拓展

**可以指定默认值**

**与解构赋值结合使用**

```javascript
//注意这个是解构的默认赋值不是函数默认赋值
function foo({x, y = 5}) {console.log(x, y);}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

**rest参数**

`...变量名`可以获取多余的参数，这样就无须使用arguments对象。rest参数搭配了一个数组，arguments是类数组。rest 参数只能是最后一个参数。

```js
//必须使用Array.from先将类数组其转为数组。
// arguments变量的写法
function sortNumbers() {
  return Array.from(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```

**aruguments**

类数组实际上是一个对象，转为数组需要Array.from()，同样来自ES6

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};
```

**箭头函数**

+ 无this，不可以当成构造函数，不能call，apply，bind
+ 不可以使用arguments，用rest代替
+ 不可以使用yield，不能用作Generator函数

+ 不适合场景
  + 对象方法不适合用箭头函数定义
  + 需要动态this比如监听事件click

```javascript
const cat = {lives: 9,
  jumps: () => {this.lives--;}}
//因为对象不构成单独作用域，jumps的this获取到的是全局

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});//this永远指向globalThis

```

**调用栈/帧**

函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数`A`的内部调用函数`B`，那么在`A`的调用帧上方，还会形成一个`B`的调用帧。等到`B`运行结束，将结果返回到`A`，`B`的调用帧才会消失。如果函数`B`内部还调用函数`C`，那就还有一个`C`的调用帧，以此类推。**所有的调用帧，就形成一个“调用栈”**（call stack）。

递归非常耗费内存，**就是因为需要同时保存成千上百个调用帧，很容易发生“栈溢出”错误（stack overflow）**。但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生“栈溢出”错误。

**柯里化**currying

多参函数转为单参函数



### 运算符拓展

好比rest的逆运算，把一个数组转为用逗号分割的参数序列。

```js
console.log(...[1, 2, 3])// 1 2 3

Math.max(...[14, 3, 77]);// 等同于
Math.max(14, 3, 77);
```

**主要用途**

+ 合并数组`[...arr1,...arr2]`
+ 浅拷贝`[...arr1]`
+ 字符串转数组`[...'hello']`



### 数组拓展

**includes**

判断是否包含

**fill**

补足元素

**Array.from**

类数组转数组

**Array.of**

弥补Array的不足，可以直接讲一组值转为数组

```jsx
Array(3) // [Empty x 3]
Array.of(3) // [3]
```

**at**

> JS不支持负索引是因为[]不仅用于数组还用于对象，由于 JavaScript 的数组是特殊的对象，所以方括号里面的负数无法再有其他语义了

`at()`支持负索引，可以用于字符串和类型数组, 超出范围返回`undefined`.    `arr.at(-1)`

*拓展*

**entries()，keys() , values**

```javascript
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
//如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

**flat()，flatMap()** 

拉平数组flat默认只拉一层，`flat(2)`拉两层，若拉到底可以`flat(infinity)`

`flatMap()`方法对原数组的每个成员执行一个函数（相当于执行`Array.prototype.map()`），然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组, 只能展开一层数组。

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
```

### 对象拓展

**简洁表示法**

ES6允许直接在大括号里写变量

```javascript
let birth = '2000/01/01';
const Person = {
  name: '张三',
  birth,  //等同于birth: birth
  hello() { console.log('我的名字是', this.name); }  // 等同于hello: function ()...
};
```

**属性名表达式**

注意不能和简洁表示法同时使用，而且表达式不能放对象

```js
let lastWord = 'last word';
const a = {[lastWord]: 'world'};
a[lastWord] // 等价于 a['last word'] // "world"
```

**属性的遍历**

ES6 一共有 5 种方法可以遍历对象的属性。遍历先后次序：数值>字符串>symbol

（1）for...in 循环遍历对象自身的**和继承的**可枚举属性（不含 Symbol 属性）。

（2）Object.keys(obj)  返回一个数组，包括对象自身的（**不含继承的**）所有可枚举属性（不含 Symbol 属性）的键名。

*拓展*

（3）Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是**包括不可枚举**属性）的键名。

（4）Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

（5）Reflect.ownKeys(obj)返回一个数组，包含对象自身的（**不含继承的**）所有键名。

**super关键字**

super指向当前对象的原型，注意*只能用在对象方法中*

```javascript
const proto = {foo: 'hello'};
const obj = {foo: 'world',find() { return super.foo;}};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

#### 对象新增方法

**Object.is()**

`===`运算符存在缺陷，`NaN`不相等，`+0-0`相等。【两边操作数相等且类型相同时返回true】`Object.is()`可以解决这个问题

```javascript
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

**Object.assign()**

用于对象的合并，把源对象的可枚举属性都复制到目标对象。只有一个参数就是返回该参数

```javascript
const target = { a: 1 };const source1 = { b: 2 };const source2 = { c: 3 };
Object.assign(target, source1, source2);// target: {a:1, b:2, c:3}
```

















# 新知识点

yield

严格模式

