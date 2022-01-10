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





























# React

#### 1.什么是Hook，背景，优点？

**背景：**

​	class组件复用状态逻辑很难，一般采用高阶组件HOC和Render Props，它们本质是将复用逻辑提升到父组件中，很容易产生很多包装组件，带来嵌套地狱。

​	组件越来越复杂的生命周期

​	this指向忘记绑定导致bug	

**Hook：**

> React希望组件不要成为复杂的容器，最好是数据流的管道，尽量写成纯函数。
>
> 纯函数只涉及到计算，如果需要使用外部功能和副作用操作，就用Hook把外部代码勾进来。

​	Hook在函数组件中引入了状态管理和生命周期方法

​	利用闭包机制实现

**优点：**

​	取代HOC和Render Props，无需修改组件就能复用，不用强行提升到父组件

​	useEffect合成了所有生命周期的

​	逻辑更清晰

#### 2. HOC & Render Props

**背景：**

​	HOC`higher-order component` & Render Props 用于 Class组件 的代码复用。本质上都是将复用逻辑提升到父组件。

**Render Props：**

> 具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。

​	render prop = 告知组件需要渲染什么内容的函数prop

​	把特定行为或功能封装成一个组件。把组件可以动态渲染的地方暴露给外部，你不用再关注组件的内部实现，只要把数据通过函数传出去就好。

```jsx
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  render() {
    return (
      <div>{this.props.render(this.state)}</div>
    );
  }
}
// 调用方式:
<Mouse render={mouse => (<p>鼠标的位置是 {mouse.x}，{mouse.y}</p>)}/>

```

