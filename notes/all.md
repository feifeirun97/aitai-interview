nextTick

Emit on

useRef, useMemo, useContext

# HTML

### SVG和Canvas

#### SVG

可伸缩的**矢量**图形，**基于XML**进行图形绘制

**HTML标签绘图**[Rect, Path]，放大缩小**不失真**

复杂度高**渲染速度慢[**过度使用DOM]

适合**大面积小数量**

#### Canvas

**H5**新特性，**基于JS**进行图形绘制[canvas本身只是一个画布]，基于像素点会**失真**，支持**颜色更多**

Canvas是一个整体，其**内部元素不能DOM操作**/添加事件。绘制完成后不可修改,

适合多对象**频繁重绘**的场景，适合小面积大数量















# JavaScript

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

**useState**

```jsx
// 我们实现一个简易版的useState
let memoizedStates = [ ]  // 多个useState 时需要使用数组来存
let index = 0
function useState (initialState) {
   memoizedStates[index] = memoizedStates[index] || initialState
   let currentIndex = index;
   function setState (newState) {
      memoizedStates[currentIndex] = newState
      render()
   }
   return [memoizedStates[index++], setState]
} 
```



























# React

### Render Props

> 具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。
>
> 代码复用，比如很相似的代码

**定义：**

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

**缺点：**

​	嵌套地狱

​	不能在return外使用数据

**优点：**

​	清楚知道这个state来自哪里

​	动态构建



### HOC

> 高阶组件入参为组件[也可以有其他参数]，返回值为新组件
>
> HOC 是纯函数，没有副作用。HOC 通过将组件*包装*在容器组件中来*组成*新组件
>
> https://juejin.cn/post/6940422320427106335#heading-9

**用途：**

​	复用逻辑

​	强化props	[属性代理]

​	赋能组件	[额外生命周期，方法]

​	控制渲染 	[劫持渲染，在包装组件中可以对原组件进行条件渲染，分片渲染或者懒加载]

​	反向继承。高阶组件继承于被包裹的React组件

**正向/属性代理：**

​	通过包裹的React组件来操作props，在代理组件上，我们可以做一些，对源组件的代理操作。我们可以理解为父子组件关系，父组件对子组件进行一系列强化操作，通过传递给被包装的组件props得名

- 强化props & 抽离state。
- 条件渲染，控制渲染，分片渲染，懒加载。
- 劫持事件和生命周期
- ref控制组件实例
- 添加事件监听器，日志

```jsx
/*
怎么在高阶组件里面访问组件实例？https://segmentfault.com/a/1190000016394640
	答：可以通过 ref 获取关键词 this（WrappedComponent 的实例）
当 WrappedComponent 被渲染后，ref 上的回调函数 proc 将会执行，此时就有了这个 WrappedComponent 的实例的引用
*/

function refsHOC(WrappedComponent) {
  return class RefsHOC extends React.Component {
    proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }
    render() {
      const props = Object.assign({}, this.props, {ref:this.proc.bind(this)})
      return <WrappedComponent {...props}/>
    }
  }
} 
const Newcom = refsHOC(COM) //静态赋值


function withRef(wrappedComponent) {
  return class extends Component{
    constructor(props) {
      super(props);
      this.someMethod = this.someMethod.bind(this);
    }

    someMethod() {
      this.wrappedInstance.comeMethodInWrappedComponent();
    }

    render() {
      // 为被包装组件添加 ref 属性，从而获取组件实例并赋值给 this.wrappedInstance
      return <wrappedComponent ref={(instance) => { this.wrappedInstance = instance }} {...this.props}/>
    }
  }
}
```

**反向代理：**

​	继承自传递过来的组件, 反向继承允许高阶组件通过 this 关键词获取 WrappedComponent，意味着它可以获取到 state，props，组件生命周期（component lifecycle）钩子，以及渲染方法（render），所以我们主要用它来做渲染劫持，比如在渲染方法中读取或更改 React Elements tree，或者有条件的渲染等。

- 劫持渲染，操纵渲染树
- 控制/替换生命周期，直接获取组件状态，绑定事件。

```jsx
//继承原组件
function iiHOC(WrappedComponent) {
  return class Enhancer extends WrappedComponent {
    render() { return super.render() }
  }
} 
```

**缺点：**

​	嵌套地狱

​	props，内部方法相同的话会覆盖

​	溯源不清晰，很难知道这个参数来自哪里	

​	使用静态构建，在 render 中调用构建方法才是react所倡导的动态构建思想。此外，在 render 中构建还可以更好地利用react的生命周期。

**优点：**

​	提取公共逻辑，降低耦合度



### 路由懒加载

```jsx
/* 路由懒加载HOC */
export default function AsyncRouter(loadRouter) {
  return class Content extends React.Component {
    state = {Component: null}
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
        .then(module => module.default)
        .then(Component => this.setState({Component},
         ))
    }
    render() {
      const {Component} = this.state
      return Component ? <Component {
      ...this.props
      }
      /> : null
    }
  }
}

const Index = AsyncRouter(()=>import('../pages/index'))
```



#### HOC & Render Props总结

**背景：**

​	HOC`higher-order component` & Render Props 用于 Class组件 的代码复用。本质上都是将复用逻辑提升到父组件。并不是API只是一种开发模式





#### 什么是Hook，背景，优点？

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

​	取代HOC和Render Props，无需修改组件就能复用，不用强行提升到父组件，没有嵌套地狱

​	可以在return之外 使用数据

​	溯源清晰，方便定位	

​	useEffect合成了所有生命周期

​	逻辑更清晰

​	无this问题





#### 常用Hook

- useState()，状态钩子。为函数组建提供内部状态
- useContext()，共享钩子。该钩子的作用是，在组件之间共享状态。可以解决react逐层通过Porps传递数据，它接受React.createContext()的返回结果作为参数，使用useContext将不再需要Provider 和 Consumer。
- useReducer()，Action 钩子。useReducer() 提供了状态管理，其基本原理是通过用户在页面中发起action, 从而通过reducer方法来改变state, 从而实现页面和状态的通信。使用很像redux
- useEffect()，副作用钩子。它接收两个参数， 第一个是进行的异步操作， 第二个是数组，用来给出Effect的依赖项
- useRef()，获取组件的实例；渲染周期之间共享数据的存储(state不能存储跨渲染周期的数据，因为state的保存会触发组件重渲染）。useRef传入一个参数initValue，并创建一个对象{ current: initValue }给函数组件使用，在整个生命周期中该对象保持不变。

+ useMemo和useCallback：可缓存函数的引用或值，useMemo用在计算值的缓存，注意不用滥用。经常用在下面两种场景（要保持引用相等；对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo/useCallback）

- useLayoutEffect：会在所有的 DOM 变更之后同步调用 effect，可以使用它来读取 DOM 布局并同步触发重渲染





#### Hook中的坑
