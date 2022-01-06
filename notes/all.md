nextTick

Emit on

useRef, useMemo, useContext



### 判断数据类型

**数据类型Primitive and Reference value**

原始数据：string, boolean, null, undefined, bigInt, symbol. [Stack Memory]

引用数据：object. [Heap Memory]

只有对象才能new，原始数据类型只能声明

**原始类型包装对象Primitive wrapper objects**

> Except for `null` and `undefined`, all primitive values have object equivalents that wrap around the primitive values:

除了null和undefined, 其余原始类型对象在读取时后台会创建对应的包装类型对象，这个实例会调用指定方法，调用完会被销毁。这种短暂的生命周期也决定了我们不能为基本类型添加自定义的属性和方法。

| 方法                                 | 特点                                                         | 用法                                    |
| ------------------------------------ | ------------------------------------------------------------ | --------------------------------------- |
| **typeof**                           | 1. func返回func, 应用类型返回object <br />2. 不能区分null和object <br />3. 返回字符串 | `typeof  'sda'`                         |
| **instanceof**                       | 1. 用于测试构造函数的`prototype`原型属性是否出现在当前实例的原型链上 <br />2. 返回boolean <br />3. 不适用原始类型l<br />4. 可以区分复杂数据类型`[] instanceof Array` | `object instanceof constructor `        |
| **constructor**                      | 1. 直接查看构造函数本身，不受原型链干扰                      | `object.constructor === class`          |
| **Object.prototype.toString.call()** | 1. 适用于所有类型的判断<br />2. 返回列表`[object xxx]`       | `Object.prototype.toString.call('123')` |

### 原型链

只有函数才有`prototype`原型属性，它指向该函数的原型对象

只有对象才有`__proto__`属性，它指向的是其构造函数的`prototype`原型对象。

**注意：**

1. 当一个实例通过new被该函数创建，这个函数就称为构造函数。
2. `prototyoe`本身就是一个对象，它也有`__proto__`属性
3. `Object.prototype === null`

![](https://segmentfault.com/img/remote/1460000018874484)

### 内存

内存分为堆空间，栈空间，代码空间。



### 执行阶段





# 手撕代码

**Instanceof**

```js
function myInstanceof (obj, func){
  while (true) {
  	if (obj.__proto__ === null) return false
  	if (obj.__proto__ === func.prototype) return true
    obj = obj.__proto__
  } 
}
```

