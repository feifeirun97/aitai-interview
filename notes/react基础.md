1. 虚拟 DOM；
2. 组件化；
3. 声明式代码；
4. 单向数据流；
5. 纯粹的 JavaScript 语法；

### React基础

#### 虚拟DOM

##### 虚拟dom是什么？[document object model]

+ 在js和真实dom中间加了一个个缓存，利用dom diff算法避免了没有必要的dom操作，提高了性能

##### 实现过程

+ 用JS对象结构表示dom树的结构

+ 用这个树构建一个真正的dom树,插到文档中当状态变更时, 重新构造一颗新的对象树

+ 新旧对象树比较, 记录差异并把差异应用到1所构建的真正的dom树上, 视图就更新了

#### 虚拟dom和dom的区别 性能差异

减少dom操作虚拟dom可以将多次dom操作合并为一次操作

| Real dom            | Virtual dom       |
| :------------------ | :---------------- |
| 更新慢              | 更新快            |
| 可以直接更新html    | 无法直接更新html  |
| 元素更新创建新dom树 | 元素更新则更新JSX |
| dom操作代价高       | DOM操作简单       |
| 消耗内存多          | 内存消耗小        |

#### React组件间通讯

| 六种方式           | 实现                                                 |
| ------------------ | ---------------------------------------------------- |
| 父组件=>子组件通讯 | props通讯                                            |
| 子组件=>父组件通讯 | props+回调                                           |
| 兄弟组件通讯       | 由共同父节点组件转发通讯                             |
| 跨层通讯           | Context对于一个组件树而言是全局的数据(主题/首选语言) |
| 发布订阅模式       | 发布者发布事件，订阅者监听事件，event模块通讯        |
| 全局状态管理       | 借助Redux维护全局状态中心Store                       |

#### Redux Context对比

​	和组件props相比，新旧的Context API和Redux都解决了props存在的“只要是子组件需要的信息，即使父组件不需要，也必须先传给父组件然后一层层传到子组件”的问题

​	与redux对比，context适合很少修改，主要从根节点下发数据的情形，比如locale/主题/个人登录信息

​	但至少Redux解决的以下问题，在Context API中仍然没有得到解决：

- **逻辑/数据/视图分离的代码结构**（reducer/store/component），很好地划分了代码职责
- **在不同项目之间通用的存储和事件机制**，从而允许[redux-devtools](https://www.zhihu.com/search?q=redux-devtools&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A319565629})和time travel这种通用的开发工具、以及类似redux-observable这种强大[中间件](https://www.zhihu.com/search?q=中间件&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A319565629})的存在（store/action）

#### Redux

管理全局变量的开发库

##### 数据如何流动？

+ 用户通过view发出action，发出方式为dispatch方法
+ store自动调用Reducer，并且传入两个参数: 当前state和收到的action，reducer返回新的state
+ state变化，store调用监听函数来更新view

##### Redux遵循的三个原则？

+ 单一数据源：整个应用的 state 被储存在一棵对象树中，并且这个 object tree 只存在于唯一一个 store 中。The global state of your application is stored in an object tree within a single store.开发和调试更容易
+ State是只读的：The only way to change the state is to emit an action, an object describing what happened. 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
+ 使用纯函数更改：为了描述 action 如何改变 state tree ，你需要编写 reducers。纯函数是那些返回值仅取决于其参数值的函数。

**你对“单一事实来源Single source of truth“有什么理解？**

​	Redux 使用 “Store” 将程序的整个状态存储在同一个地方。因此所有组件的状态都存储在 Store 中，并且它们从 Store 本身接收更新。单一状态树可以更容易地跟踪随时间的变化，并调试或检查程序。

**Redux 由以下组件组成：**

1. **Action** – 这是一个用来描述发生了什么事情的对象。
2. **Reducer** – 这是一个确定状态将如何变化的地方。
3. **Store** – 整个程序的状态/对象树保存在Store中。
4. **View** – 只显示 Store 提供的数据。

**如何在 Redux 中定义 Action？**

​	React 中的 Action 必须具有 type 属性，该属性指示正在执行的 ACTION 的类型。必须将它们定义为字符串常量，并且还可以向其添加更多的属性。在 Redux 中，action 被名为 Action Creators 的函数所创建。以下是 Action 和Action Creator 的示例：

```js
function addTodo(text) {
       return {
                type: ADD_TODO,    
                 text
    }
}
```

**解释 Reducer 的作用**

​	Reducers 是纯函数，它规定应用程序的状态怎样因响应 ACTION 而改变。Reducers 通过接受先前的状态和 action 来工作，然后它返回一个新的状态。它根据操作的类型确定需要执行哪种更新，然后返回新的值。如果不需要完成任务，它会返回原来的状态。

**Store 在 Redux 中的意义是什么？**

​	Store 是一个 JavaScript 对象，它可以保存程序的状态，并提供一些方法来访问状态、调度操作和注册侦听器。应用程序的整个状态/对象树保存在单一存储中。因此，Redux 非常简单且是可预测的。我们可以将中间件传递到 store 来处理数据，并记录改变存储状态的各种操作。所有操作都通过 reducer 返回一个新状态。

**Redux 有哪些优点？**

- 结果的可预测性 - 由于总是存在一个真实来源，即 store ，因此不存在如何将当前状态与动作和应用的其他部分同步的问题。
- 可维护性 - 代码变得更容易维护，具有可预测的结果和严格的结构。
- 服务器端渲染 - 你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验。
- 开发人员工具 - 从操作到状态更改，开发人员可以实时跟踪应用中发生的所有事情。
- 社区和生态系统 - Redux 背后有一个巨大的社区，这使得它更加迷人。一个由才华横溢的人组成的大型社区为库的改进做出了贡献，并开发了各种应用。
- 易于测试 - Redux 的代码主要是小巧、纯粹和独立的功能。这使代码可测试且独立。
- 组织 - Redux 准确地说明了代码的组织方式，这使得代码在团队使用时更加一致和简单。

#### React组件生命周期

**React生命周期**

+ 挂载阶段Mount：即将开始生命周期进入DOM阶段

+ 更新阶段Update：一旦组件被添加到DOM，它只有在prop或状态发生改变时才会更新或重新渲染

+ 卸载阶段Unmount：生命周期的最后阶段，组件被销毁且从DOM删除 React 组件生命周期方法

####  React 组件生命周期方法

目前React 16.8 +的生命周期分为三个阶段,分别是挂载阶段、更新阶段、卸载阶段

挂载阶段:

- constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
- getDerivedStateFromProps: `static getDerivedStateFromProps(nextProps, prevState)`,这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
- render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
- componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

更新阶段:

- getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
- shouldComponentUpdate: `shouldComponentUpdate(nextProps, nextState)`,有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
- render: 更新阶段也会触发此生命周期
- getSnapshotBeforeUpdate: `getSnapshotBeforeUpdate(prevProps, prevState)`,这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
- componentDidUpdate: `componentDidUpdate(prevProps, prevState, snapshot)`,该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

卸载阶段:

- componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

**扩展：**

React 16之后有三个生命周期被废弃(但并未删除)

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

官方计划在17版本完全删除这三个函数，只保留UNSAVE_前缀的三个函数，目的是为了向下兼容，但是对于开发者而言应该尽量避免使用他们，而是使用新增的生命周期函数替代它们

#### react rounter

**什么是React 路由？**

​	React 路由是一个构建在 React 之上的强大的路由库，它有助于向应用程序添加新的屏幕和流。这使 URL 与网页上显示的数据保持同步。它负责维护标准化的结构和行为，并用于开发单页 Web 应用。 React 路由有一个简单的API。

```html
<switch>
    <route exact="" path="’/’" component="{Home}/">
    <route path="’/posts/:id’" component="{Newpost}/">
    <route path="’/posts’" component="{Post}/">
</route></route></route></switch>
```

**为什么需要 React 中的路由？**

​	Router 用于定义多个路由，当用户定义特定的 URL 时，如果此 URL 与 Router 内定义的任何 “路由” 的路径匹配，则用户将重定向到该特定路由。所以基本上我们需要在自己的应用中添加一个 Router 库，允许创建多个路由，每个路由都会向我们提供一个独特的视图

**为什么React Router v4中使用 switch 关键字 ？**

​	虽然`<div>`用于封装 Router 中的多个路由，当你想要仅显示要在多个定义的路线中呈现的单个路线时，可以使用 “switch” 关键字。使用时，`<switch>` 标记会按顺序将已定义的 URL 与已定义的路由进行匹配。找到第一个匹配项后，它将渲染指定的路径。从而绕过其它路线。

**React Router 的优点**

+ 就像 React 基于组件一样，在 React Router v4 中，API 是 'All About Components'。可以将 Router 可视化为单个根组件（），其中我们将特定的子路由（）包起来。

+  无需手动设置历史值：在 React Router v4 中，我们要做的就是将路由包装在 组件中。

+ 包是分开的：共有三个包，分别用于 Web、Native 和 Core。这使我们应用更加紧凑。基于类似的编码风格很容易进行切换。

#### JSX

##### JSX优点

JSX是一个 JavaScript 的**语法扩展**，它具有 JavaScript 的全部功能。

JSX用于创建react元素。

React认为渲染逻辑和ui天生耦合：事件如何处理，状态如何改变，数据是如何准备展示的

js和html可以在一起写，视觉上有辅助作用。

比起ui和逻辑隔开来，React则是把他们耦合起来其他形成一个个组件来分离关注点。

> React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

**原理**

JSX 可以在大括号内放置JavaScript表达式, 在编译后JSX会被转为普通的JS函数调用。

**JSX防止注入攻击**

> React DOM escapes转译 any values embedded嵌入 in JSX before rendering them to prevent injection attacks.

React Dom在渲染输入的内容前默认转义，防止了跨站脚本攻击XSS( cross-site-scripting )

**JSX表示对象**

Babel会把JSX转译为一个名为React.createElement()函数调用。

```jsx
//代码相等
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
//====
const element = React.createElement(
	'h1',
  {className:'greeting'},
  'Hello,World!'
)
```

React.createElement会预先执行检查来检测错误，实际上编写了这样一个对象。这些对象就是React元素，用于构建DOM并保持更新

```jsx
//简化后的结构，实际要复杂的多
const element ={
  type:'h1',
  props:{
    className:'greetings',
    children:'Hello World!'
  }
}
```

#### React元素渲染

元素是构成React应用的最小单位。ReactDom负责更新DOM。

**将一个元素渲染为DOM**

React应用有一个根节点`<div id='root'></div>`, 该节点内所有内容由ReactDom代管理。

React元素想要渲染到根DOM节点，需要传入`ReactDom.render()`

```jsx
const elm = <h1>'hello'</h1>;
ReactDom.render(elm,document.getElementById('root'))
```

**更新已渲染的元素**

React元素是不可变对象，它代表某个时刻的UI。更新UI的唯一方式是创建一个全新的元素并传入`ReactDom.render()`

**只更新变化的部分**

ReactDom会把元素和子元素之前的状态对比，只会进行必要的更新(Dom Diff)。

#### 组件&Props

UI拆分为独立可复用的代码片段即为组件

**创建组件**

组件分为函数组件和class组件，组件接受唯一带有数据的props对象，并返回一个React元素。

```jsx
const C1 =(props){ retunr <h1>{props.name}</h1>}
//等价
class C2 extends React.Component {
  render(){
    retunr <h1>{props.name}</h1>
  }
}
```

**渲染组件**

React元素不止是DOM标签，也可以是用户自定义的组件`const elm= <C1 name={'Fei'}>`，此时他会把JSX所接收的属性`attributes`以及子组件`children`转换为单个对象传递给组件，这个对象就是props

```jsx
const C1 =(props){ retunr <h1>{props.name}</h1>}
const element = <C1 name="fei" />;
ReactDOM.render(element,document.getElementById('root'));
```

+ 调用`ReactDom.render()`函数传入` <C1 name="fei" />`做参数
+ React调用Welcome组件，并将`{name:'fei'}`作为props传入
+ `C1`组件把` <h1>fei</h1>`作为元素作为返回值
+ ReactDom更新为`<h1>Hello, Sara</h1>`

**Props只读**

#### Diffing算法

> 在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何高效的更新 UI，以保证当前 UI 与最新的树保持同步。
>
> 此算法有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作次数。然而，即使使用[最优的算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)，该算法的复杂程度仍为 O(n 3 )，其中 n 是树中元素的数量。

React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以通过设置 `key` 属性，来告知渲染哪些子元素在不同的渲染下可以保存不变；

#### State & 生命周期

**State**

+ state是当前组件私有的，其他组件不关心且也无法访问
+ 数据向下流动/单向数据流

**setState**

+ state更新是异步的，多个setState会合并成一个调用

**生命周期**

![image-20211228205631279](https://s2.loli.net/2021/12/28/q6uZBn1YsFc2b5x.png)

**React生命周期**

+ 挂载阶段Mount：第一次被渲染到DOM，生命周期开始

+ 更新阶段Update：一旦组件被添加到DOM，它只有在prop或状态发生改变时才会更新或重新渲染

+ 卸载阶段Unmount：组件被销毁且从DOM删除 React 组件，生命周期结束

**生命周期方法**

挂载阶段:

- constructor: 构造函数，最先被执行,我们通常在构造函数里初始化state对象或者给自定义方法绑定this
- getDerivedStateFromProps: `static getDerivedStateFromProps(nextProps, prevState)`,这是个静态方法,当我们接收到新的属性想去修改我们state，可以使用getDerivedStateFromProps
- render: render函数是纯函数，只返回需要渲染的东西，不应该包含其它的业务逻辑,可以返回原生的DOM、React组件、Fragment、Portals、字符串和数字、Boolean和null等内容
- componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作，比如对canvas，svg的操作，服务器请求，订阅都可以写在这个里面，但是记得在componentWillUnmount中取消订阅

更新阶段:

- getDerivedStateFromProps: 此方法在更新个挂载阶段都可能会调用
- shouldComponentUpdate: `shouldComponentUpdate(nextProps, nextState)`,有两个参数nextProps和nextState，表示新的属性和变化之后的state，返回一个布尔值，true表示会触发重新渲染，false表示不会触发重新渲染，默认返回true,我们通常利用此生命周期来优化React程序性能
- render: 更新阶段也会触发此生命周期
- getSnapshotBeforeUpdate: `getSnapshotBeforeUpdate(prevProps, prevState)`,这个方法在render之后，componentDidUpdate之前调用，有两个参数prevProps和prevState，表示之前的属性和之前的state，这个函数有一个返回值，会作为第三个参数传给componentDidUpdate，如果你不想要返回值，可以返回null，此生命周期必须与componentDidUpdate搭配使用
- componentDidUpdate: `componentDidUpdate(prevProps, prevState, snapshot)`,该方法在getSnapshotBeforeUpdate方法之后被调用，有三个参数prevProps，prevState，snapshot，表示之前的props，之前的state，和snapshot。第三个参数是getSnapshotBeforeUpdate返回的,如果触发某些回调函数时需要用到 DOM 元素的状态，则将对比或计算的过程迁移至 getSnapshotBeforeUpdate，然后在 componentDidUpdate 中统一触发回调或更新状态。

卸载阶段:

- componentWillUnmount: 当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的DOM元素等垃圾清理工作

#### 事件处理

与DOM元素事件处理的区别：

+ 驼峰式camelCase事件命名
+ 使用JSX传入函数而不是字符串
+ 一般不需要使用 `addEventListener` 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。

```js
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
//React
<form onSubmit={handleSubmit}>
  <button type="submit">Submit</button>
</form>
```

#### 条件渲染

+ If
+ &&
+ State control
+ 三目运算符?:

#### 列表&key

map渲染列表元素时需要加一个key属性，这是英文key可以帮助react元素识别哪些元素被改变/添加/删除

#### 组合继承

**组合**

+ 有的组件无法提前知晓子组件的具体内容，可以使用`{props.children}`传入JSX。

+ 或`{props.left; props.right}`采取预留出几个位置传入多个组件。

```jsx
//porps传JSX
function FancyBorder(props) {
  return (<div className={props.color}> {props.children} </div>);
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1>Welcome</h1>
      <p> Thank you for visiting our spacecraft! </p>
    </FancyBorder>
  );
}


//空出位置传入组件,组合
function App() {
  return (
    <SplitPane left={<Contacts />} right={<Chat />} >
      <input />
      <p>input sth!</p>
    </SplitPane>
)}

function SplitPane(props) {
  return (<>
      			<div className="left">{props.left}</div>
      			<div className="right">{props.right}</div>
          	<div>{props.children}</div>
   				</>);
}
```

**继承**

React组件可以直接import而无需组件间继承extend。

注意：类组件不是组件间的继承, props是JSX传递下来的，这里的extends只是把props的属性都绑定到当前组件上。

```jsx
class Test extends React.Component{
  constructor(props){super(props) //super会调用原型的构造函数}
}
//React.Component本质上是一个函数
function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject; 
    this.updater = updater || ReactNoopUpdateQueue;
}

```

#### 代码分割

打包是将文件合并到一个单独文件的过程，最终形成一个bundle。

目前都是单页面应用，打包的bundle文件可能会比较大，首次加载会吧bundle里所有组件都加载了【即使不需要】。所以代码分割`chunk.js`的目的是按需加载。

webpack代码分割，虽然没有减少总体积，但是可以避免加载用户不需要的代码，并减少初始加载的代码量，'懒加载'提升性能。

**动态分割**

import()语法动态分割，`react-loadable;react-loadable`解析到就会自动进行分割。

> 不要把 `import`关键字和`import()`方法弄混了，该方法是为了进行动态加载才被引入的。`import`关键字的引入是静态编译且存在提升的，这就对我们按需加载产生了阻力（require是可以动态加载的），所以才有了`import()`。

```js
import { add } from './math';console.log(add(16, 26));
//使用
import("./math").then(math => {console.log(math.add(16, 26));});
```

**何时分割**

代码分割需要兼顾用户体验和性能。路由分割是一个不错的选择

#### Context

Context的目的是共享对于一个组件树而言全局的数据。避免了props的层层传递。

**Context会让复用性变差：**

+ 需要复用这个组件的地方必须要构建一个react context包裹来提供这部分组件需要的数据。
+ context要遵循hooks规范，只能在组件或hooks中使用，在普通函数中无法使用，也就是说在普通函数中，如果要获取到context中的数据，需要用参数传进来，或者把它放到hooks中
+ context只管数据传递，如要修改数据，修改的方法我们也要传递下去

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {return (
      <ThemeContext.Provider value="dark">        
        <Toolbar />
      </ThemeContext.Provider>
    );}}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {  return (<ThemedButton />);}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。  
  // React 会往上找到最近的 theme Provider，然后使用它的值。在这个例子中，当前的 theme 值为 “dark”。  
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;  }
}
```

#### Ref

操作数据流之外的DOM节点或者React元素。函数组价的useRef可以模拟class组件的this

用途：父组件查看子组件的state



#### Portals

> 通常而言组件render的React元素会被挂载到离它最近的DOM节点。Portal类似于在楼外安装电梯，在楼内需要传递状态的成本过高。详解https://segmentfault.com/a/1190000012325351

Portal可以让子节点渲染到其父组件之外的DOM节点。当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器，而不是被父节点的样式影响。

+ modal，tooltip，loading

+  portal 仍存在于 *React 树*， 且与 *DOM 树* 中的位置无关

+  portal 内部触发的事件会根据虚拟DOM冒泡至 *React 树*的祖先，与真实 *DOM 树* 无关。

```js
// 第一个参数 child 是任何可以被渲染的 ReactChild，比如 element, string 或者 fragment. 第二个参数 container 是 一个 DOM 元素
ReactDOM.createPortal(child, container)}
```

#### Profiler

用于测量一个 React 应用多久渲染一次以及渲染一次的“代价”。目的是识别出应用中渲染较慢的部分，并从相关优化中获益。

`Profiler` 能添加在 React 树中的任何地方来测量树中这部分渲染所带来的开销。 它需要两个 prop ：一个是 `id`(string)，一个是当组件树中的组件“提交”更新的时候被React调用的回调函数 `onRender`(function)。

```jsx
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

### React Hook

React希望组件不要成为复杂的容器，最好只是数据流的管道。**组件的最佳写法应该是函数而不是类**，Hook的目的就是加强函数组件。

组件尽量写成纯函数，如果**需要外部功能和副作用操作，就用Hook钩子把外部代码勾进来**

+ Hook 使你在无需修改组件结构的情况下复用状态逻辑。
+ Hook 是一个特殊的函数，它可以让你“钩入” React 的特性, 在函数组件里使用React state 及生命周期等特性的函数。
+ Hook 使用了 JavaScript 的**[闭包机制](https://blog.csdn.net/weixin_38080573/article/details/115178502)**

**StateHook**

纯函数不能有状态，所以把状态放在钩子里面。useState返回与`this.state.count` 和 `this.setState`类似，所以需要解构赋值。

**解决**

+ 复杂的声明周期
+ class的this需要绑定

**useContext()**

组件间共享状态

**useRef()**

`useRef`传入一个参数initValue，并创建一个对象{ current: initValue }给函数组件使用，在整个生命周期中该对象保持不变。

- useRef 用来获取DOM元素

- useRef 用来保存变量

```jsx
import './App.css';
import React , { useState, useRef } from 'react'
function App() {
  const inputEl = useRef(null)
  const save = useRef({value: 123}
  return (
    <>
     <h2>useRef</h2>
     <input type='text' inputRef={inputEl}/>
     <button onClick={()=> {
         save.current.value = inputEl.current.value
         console.log(save)
     }}>保存-age</button>
     </>
  );
}
export default App;
```

**useReducer()**

Reducer的函数形式是`(state,action)=>newState`, 搭配Redux使用.

```jsx
//接受reducer函数和初始值，返回newStte和dispatch函数
const [state, dispatch] = useReducer(reducer, initialState);
```

**EffectHook**

> 纯函数只进行数据计算，不涉及计算的操作如数据获取、订阅或者手动修改过 DOM称为sideEffect。

`useEffect` 让函数组件也能操作副作用，它与`componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

Class组件对于加载和更新可能需要写两段重复的代码，而Effect不用再去考虑“挂载”还是“更新”。React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

**React 何时清除 effect？** 

> React 会在组件卸载的时候执行清除操作。
>
> 由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。比如异步请求并赋值时组件已经被销毁，后续的操作突然被打断，可能会造成内存泄漏。





### React优点

> React2013年FaceBook推出的前端框架

+ 大量的第三方工具

+ 最好的社区支持和生态圈

+ 组件模式：代码复用和团队分工

+ 虚拟DOM：性能优势

+ 移动端支持：跨终端

### React核心思想

View是State的输出`view = f(state)`

React本质是吧GUI图形界面函数化，即React本省只是一个函数，一个UI解决方案，它的职能范围只到ModelAndView。在React层面没有VM的概念，强调的是单向数据流

### React没有解决的问题

React本身只是一个DOM的抽象层，使用组件构建虚拟DOM。如果开发大型应用，还需要解决两个问题

**架构问题**

React只是视图层的解决方案，大型应用程序如何组织代码？它可以使用任何一种架构, 哪一种最适合React？

+ MVC
+ MVVM
+ Reactive
+ ...

**通讯问题**

通讯的本质是状态同步。React只提供了一种通讯手段：传参，对于大应用很不方便【后续提供了Context】

**Flux架构**

MVC对于大型应用时复杂性会成指数增加[双向数据流], FaceBook提出了Flux架构的**概念**，被认为是React应用的标准架构。

其最大特点：**数据单项流动，与MVVM的数据双向绑定形成鲜明对比**

核心思想：

+ 不同组件的State存在一个外部的公共的Store上面

+ 组件订阅Store的不同部分
+ 组件发送（dispatch）动作（action）引发Store的更新

![image-20211231180331832](/Users/xufei/Library/Application Support/typora-user-images/image-20211231180331832.png)

| Store(s)       | **应用状态和逻辑的容器**    |
| -------------- | --------------------------- |
| **Action**     | **数据传递给DIspatcher**    |
| **View**       | **视图，React组件上下文内** |
| **Dispatcher** | **协调Actions&更新Store**   |

**主流React架构**

React架构最重要的作用：管理Store与View之间的关系

+ MobX: 响应式管理(Reactive)，state是可变对象，适合中小型项目

+ Redux：函数式管理(Functional)，state是不可变对象，适合大型项目

**MobX**

核心概念： **观察者模式**，Store是被观察者Observable，组件是观察者Observer。一旦Store有变化，立刻被组件观察到从而引发渲染。

Store 所有的属性，分成两大类：直接被观察的属性和自动计算出来的属性。

```js
const {observable} = mobx;
const {observer} = mobxReact;

const person = observable({name: "张三", age: 31});

const App = observer(
  ({ person }) => <h1>{ person.name }</h1>
);

ReactDOM.render(<App person={person} />, document.body);
person.name = "李四";
```

**Redux**

核心概念：

+ 所有状态存放在Store，组件每次重新渲染，都必须由状态变化引起
+ 用户在UI上发出Action

+ reducer纯函数接受action，然后根据当前的state，计算出新的state

![image-20211231185914206](/Users/xufei/Library/Application Support/typora-user-images/image-20211231185914206.png)![image-20211231185932651](/Users/xufei/Library/Application Support/typora-user-images/image-20211231185932651.png)











# JS基础

#### **闭包应用**

能够访问其他函数内部变量的函数，被称为 **闭包**。

减少全局变量，模块化

```js
const mathCust=(()=>{
  let [a,b]=[1,2]
  const add = ()=>a-b
  const sub = ()=>b-a
  return { add,sub }
})()
```

#### 防抖

减少用户触发，只执行最后一次操作

```js
//有全局变量的方式
let inp = document.querySelector("input")
let t=null
inp.oninput = function(){
  if(t !== null){
    clearTimeout(t)
  }
  t = setTimeout(()=>{
    console.log(this.value)
  },500)
}

//优化：闭包
//消除了全局变量，同时让代码逻辑更清楚
let inp = document.querySelector("input")

inp.oninput = debpunce(function(){
  console.log(this.value) //这里this指向window
},500)


function debounce(callback,delay){
  let t=null
  return function(){
    if(t !== null){
      clearTimeout(t)
    }
    t = setTimeout(()=>{
      callback.call(this) //改变谁来调用fn
    },500)
  }
}
```

#### 节流

控制执行次数

```js
let flag = true
window.onscroll = function(){
  if (flag) setTimeout(()=>{console.log('hello'); flag=true},1000)
  flag=false
}

//优化
const throttle = (callback, delay) => {
  let flag = true
  return function () {
    if (flag) setTimeout(() => {
      callback.call(this)
      flag = true
    }, delay)
    flag = false
  }
}
window.onscroll = throttle(function () { console.log('hello') }, 1000)

//疑问闭包内在使用的变量不会被销毁，那多次调用时会产生多少个flag，还是始终就一个？
//答：理解错误，并非每次onscroll就调用throttle，而是调用throttle返回的函数，let flag=true只在window.onscroll赋值时执行过一次


window.onscroll=function(){console.log('hello')}
```







#### 页面的渲染流程

1. 浏览器通过请求得到一个HTML文本
2. 渲染进程解析HTML文本，构建DOM树
3. 解析HTML的同时，如果遇到内联样式或者样式脚本，则下载并构建样式规则（stytle rules），若遇到JavaScript脚本，则会下载执行脚本。
4. DOM树和样式规则构建完成之后，渲染进程将两者合并成渲染树（render tree）
5. 渲染进程开始对渲染树进行布局，生成布局树（layout tree）
6. 渲染进程对布局树进行绘制，生成绘制记录
7. 渲染进程的对布局树进行分层，分别栅格化每一层，并得到合成帧
8. 渲染进程将合成帧信息发送给GPU进程显示到页面中















#### Map & Foreach

es5出现用于遍历数组，Foreach修改数据不返回，Map返回新数组

##### Map

**纯函数**

不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果的函数

```jsx
//pure
function sum(a, b) {return a + b;}
//not pure
function withdraw(account, amount) {account.total -= amount;}
```

#### 前端历史

**JavaScript**

> 脚本语言是一种解释性的语言,例如[Python](https://baike.baidu.com/item/Python)、vbscript、javascript、installshield script、ActionScript等等,它不象c\c++等可以编译成二进制代码,以[可执行文件](https://baike.baidu.com/item/可执行文件)的形式存在，脚本语言不需要编译，可以直接用，由解释器来负责解释。
>
> 脚本语言一般都是以文本形式存在,类似于一种命令。

JavaScript一种直译式**脚本语言**，是一种**动态类型、弱类型、基于原型**的语言。它的**解释器被称为JavaScript引擎，为浏览器的一部分**，广泛用于客户端的脚本语言，最早是在HTML（标准通用标记语言下的一个应用）网页上使用，用来给HTML网页增加动态功能。

**后端MVC**

早期的前端代码是后端代码的一部分，后端收到浏览器请求后生成静态页面模版后发送到浏览器。前端只是后端MVC中的V。

![image-20211231140028048](https://s2.loli.net/2021/12/31/HSCcj2qFxesKUXE.png)

| Model          | 模型层     | 提供/保存数据              |
| -------------- | ---------- | -------------------------- |
| **Controller** | **控制层** | **数据处理，业务逻辑**     |
| **View**       | **视图层** | **展示数据，提供用户界面** |

**Ajax**

> 2004 Gmai 2005 Google Map

ajax之后前端不再是后端的模版，可以独立得到各种数据，并促成了web2.0的诞生。

| **web1.0** | **静态纯内容**                     |
| ---------- | ---------------------------------- |
| **web2.0** | **动态网页，富交互，前端数据处理** |

**前端MVC**

> 2010 Backbone.js

前端通过Ajax得到数据后也开始出现处理数据，保存数据，生成视图的需求，所以前端MVC框架诞生了。

Backbone将前端分为两个基本部分：Model管理数据，View展示数据

**前端Controller**

Backbone只有MV没有C，这是因为前端Controller与后端不同

+ 不需要，也不应该处理业务逻辑
+ 只需要处理UI逻辑，影响用户的一举一动

所以前端Controller相对比较简单，Backbone没有C，只用事件来处理UI逻辑

**MVVM**

另一些框架提出MVVM模式，用ViewModel代替Controller，具有数据双向绑定的特性

| View-Model | 简化的Controller,唯一的作用是为view提供处理好的数据，不含其他逻辑 |
| ---------- | ------------------------------------------------------------ |

![image-20211231135525092](https://s2.loli.net/2021/12/31/WhHjKGOiw5AqVQc.png)

**Router**

前端有一种天然方法URL来切换视图，这就是Router的作用

**SPA**

> SPA = Single-page application
>
> 2010后前端从开发页面=>开发浏览器应用

前端可以做到1. 读写数据  2. 切换视图 3. 用户交互

这意味着网页已经成为了一个应用程序。

![image-20211231142411537](https://s2.loli.net/2021/12/31/liuxBt5GhjswJDd.png)

**Angular**

谷歌推出的Angular是最流行的MVC前端框架。风格是HTML的增强，核心是**双向绑定**。双向绑定没有State概念，变量修改后页面直接改变

**Vue **

与Angular类似，但是用法更简单而且引入了响应式编程的概念。

**前后端分离**

> Ajax->前端应用兴起
>
> 智能手机->多终端支持

这两个原因促使前端开发方式发生根本变化，前端不再是后端MVC中的V而是单独的一层。

**H5**

为什么H5会赢得移动端？

+ 开发快速：Native需要重新编译，H5即时输出
+ 开发成本低：Native需要多一个开发团队
+ 发布快速：H5随时更新

**Node**

> 2009 Node诞生

Node是服务器上的JavaScript运行环境。Node = JavaScript + 操作系统API

+ JavaScript称为服务器脚本语言，与Python和Ruby一样
+ JavaScript成为唯一的浏览器和服务器读支持的语言
