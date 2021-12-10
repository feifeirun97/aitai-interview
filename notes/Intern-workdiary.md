## Axios

> 2层错误码，http外封装自己的代码
>
> 错误也返回200，包含data【0000，。。。】
>
> 跨域proxy

##### Example

```jsx
  const handleClose = () => {
    if (query.version === undefined) {
      request("service-postInvestment/businessProcessNode/deleteTempProcess", {
        method: "GET",
        params: {
          id: data.id,
        },
      }).then((res) => {
        callback();
      });
    } else {
      handlerClose(index)
    }
  };
  
  
    useEffect(() => {
    if (!reqType) return;

    request('service-postInvestment/projectMaintain/getDictByType', 
    {
      method: 'GET',
      params: {
        type: reqType
      }
    })
    .then(res => {
      setList([...res.data.data])
    })

  }, reqType)



  useEffect(() => {
    // get GP info list
    request('service-postInvestment/childfund/getGpSelectList', {
      method: 'get'
    }).then((res) => {
      setGpList(res.data.data);
    }).catch((err) => {
      console.log(err);
      message.error("获取GP数据失败");
    });

```



```jsx
    await request('service-postInvestment/childfund/saveChildfundPre', {
      method: 'post',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      console.log(res);
      message.success("子基金创建成功！");
      setLoading(false);

      props.handleCancel();
      props.queryFunds();
    }).catch(err => {
      console.log(err);
      message.error("创建失败！");
      setLoading(false);
    });
  }
  
  const getlistGp = async (params) => {
    let res = await getData(API.listGp, {
      data: params,
      method: 'POST'
    })
    let shortNameArr = [];
    res.dataList.forEach(item => {
      shortNameArr.push({ text: item.shortName, value: item.shortName })
      item.gpStrategy = formatGpStrategyData(item.gpStrategy)
    })
    setGpList(res)
    setFlterData({ shortNameArr })
  }
```

##### Mine

```jsx
// console.log(dataSwitch)
const getURL = 'http://192.168.8.165:5020/service-itdd-get/get_drive_user_arpu_doc'
const postURL = 'http://192.168.8.165:5020/service-itdd-post/get_drive_user_arpu'
axios.get(getURL)
.then(
res => console.log(res.data.content)
)
.catch(
err=>console.log('err:',err)
)

axios.post(postURL, {
proj_id: 'gc_dxm',
period: 'Y'
})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
```

## JavaScript

##### 对象循环

```

```



## React

##### 渲染

```jsx
//首次加载先从上往下执行，遇到useEffect跳过
//按顺序运行useEffect，运行完刷新一次
//state变化刷新一次
```













## Questions

#### Week2-day2

> Class extends--- this.state  和 function的选择
>
> 是大组件用class extends + this.state, 小组件用function + hook吗 【model文件夹下观察得到】

```jsx
//页面级用class， 看个人习惯
```



> utils文件夹下是什么

```jsx
//公用文件
```



> import { history } from "umi". umi的history和react-router-dom的history是一个东西吗？

```jsx

history.push("/modifyPSW");
//一个东西
```



> routes理解？

```jsx
//config.js调试
```



> 结构理解？
>
> + Src下的Components是自定义的组件吗
>
> + utils文件夹下是什么

```jsx
//pages当前页面组件
//src下是公用的，用的比较多
//utils公用
```



> Layout理解？
>
> antd官网的layout是<Sider><Content><Header>,开发中也是按这样的来吗
>
> model里的代码是前人自己写的css布局的的

```jsx
//content部分自己写
```





##### Week2-day5

> ::before理解？
>
> 点击后加一个before元素表示被激活
>
> 是通过getElements去设定style.before, 还是通过判断新加一个classname

```jsx
//一般通过classname去判断
//：before比div简单
```

> antdPro学习路线/先后顺序？
>
> 重要程度 a- b- c-
>
> less	
>
> axios	
>
> proxy	
>
> dva [redux plus]	
>
> webpack	
>
> umi	

```jsx
//优先级向下
//webpack  less,proxy都是webpack里去配置
//umi			 一些封装
//dva;less;axios
```



##### Week3-day1

> 渲染顺序
>
> UseEffect中的异步函数运行顺序？

```jsx
//从上而下执行同步代码，包括了子组件渲染
//运行useEffect异步函数
```

> Cookie，Session，LocalStorage
>
> 储存在哪

```jsx
//打开调试工具[Network->Fetch/XHR->Preview]
//登陆后后端返回一系列的参数
//需要手动的把数据挑选出来，按需存进localStorage，Cookie
//token可以理解为session
```

![image-20211115220819263](https://i.loli.net/2021/11/30/nANu8fRdTYEBkSG.png)

##### Week3-day5

> less类名会自动加‘-’吗？获取类名
>
> less书写格式

```jsx
//import styles from './style.less';
//styles等于是变成了一个变量，style.xxx就是去调用
//与less无关，换成css也行
```

> @media screen屏幕变化

```jsx
//可以在js中加一个state，获取window.screen.width
//宽度小了吧state设置为false
//通过state来判断需不需要展示该组件


//media screen也可以
```

> Reduce

```jsx
//数组转对象，累加时用到
```

> includes字符串判断

```jsx
//'abcd'.includes('ad')
```

> includes字符串判断

```jsx
//'abcd'.includes('ad')   ES7
```

##### Week4 day2

> 原型

```jsx
//__proto__、 constructor属性是对象所独有的；
//prototype属性是函数独有的；

//prototype设置原型方法属性，所有子级都可以使用，类似一块储存空间
//__proto__可以指向父级存在prototype里的方法
//constuctor属性获取创造自己的构造函数
```

![](https://segmentfault.com/img/remote/1460000021232137)

> for in为什么需要object.hasOwnProperty(variable)
>
> 如果对象是来自原形链会怎么样？
>
> ![image-20211130195013523](https://i.loli.net/2021/11/30/3DTJnodyA4ki81Q.png)

```jsx
//for in 会遍历原型链上prototype的key，value
//必须要object.hasOwnProperty

 function Obj() {
    this.name = "fei";
    this.age = "24";
  }
  Obj.prototype.job = "SDE";
  function NewObj() {
    Obj.call(this);
    this.color = "yellow";
  }
  NewObj.prototype.city = "shanghai";
  const bbb = new NewObj();

  console.log(bbb)

  for (let key in bbb) {
    console.log('key', key,bbb[key])
    if (bbb.hasOwnProperty(key)) {
      console.log('hasOwnProperty', key,bbb[key])
    }
  }

```

> 多个回调函数时，以集合形式返回

```jsx
//onChange={(data1,data2)=> {setDimension(data1); setDataSwitch(data2)}}/
//和组建内的state区分开来
```

> npm 和 npx的区别

```jsx
//npM - Manager
//npX - Execute - easy to remember

//NPM 是一个包管理器，你可以使用 NPM 安装 node.js 包
//NPX 是一个执行 node.js 包的工具。

//无论您是全局安装还是本地安装该软件包都没有关系。NPX 将临时安装并运行它。如果您配置 package.json 文件并将其包含在脚本部分中，NPM 也可以运行包。
```

##### Week5-day2

> 对象，列表state刷新问题
>
> state改变不刷新
>
> ![image-20211130193522928](https://i.loli.net/2021/11/30/eCFnyBYi6JN5E3l.png)

```jsx
//原因：
//state监听单属性, 在栈中检测值有无变化,
//对象和列表。在栈中监听的地址的变化，无法捕获值的变化

//解决：
//1.简单情况：通过监听对象的某个属性值的变化
//2.复杂state：深浅拷贝，然后stringfy判断修改后字符串是否相等，变化再去setState
```

##### Week5-day5

> Context为什么会让复用性变差？
>

```jsx
//原因是需要复用这个组件的地方必须要构建一个react context包裹来提供这部分组件需要的数据。
const ComponentA = (props)=>{
    const data = useContext(context)
    return <A data={data}></A>
}

//1、context要遵循hooks规范，只能在组件或hooks中使用，在普通函数中无法使用，也就是说在普通函数中，如果要获取到context中的数据，需要用参数传进来，或者把它放到hooks中
//2、context只管数据传递，如要修改数据，修改的方法我们也要传递下去

```

##### Week6-day1

> yield是什么？如何理解这段代码？
>
> ​    *fetchFunds({ *payload* = {} }, { *call*, *put* }) {
>
> ​      yield put({
>
> ​        type: 'changeLoading',
>
> ​        payload: true,
>
> ​      });

```jsx
//
```

> 函数被调用时自带的arguments是类数组，类数组有什么区别？

```jsx
//
```

> new返回的是什么？new的过程？

```jsx
//
```

> 服务器端渲染 - 你只需将服务器上创建的 store 传到客户端即可。这对初始渲染非常有用，并且可以优化应用性能，从而提供更好的用户体验

```jsx
//发送的不再是单个state，而是一个模版
```

> 在style.less里修改某个全局css？

```jsx
//对于absolute元素，必须修改全部下的css
//而import styles会默认加上前缀
//想要不影响其他全局，只针对该组件内absolute时的修改它的css
   :global(.ant-cascader-picker-label){
      color: #7171A6;
      font-weight: 500;
      font-size: 15px;
      letter-spacing: -0.006em;
      padding: 0 0.7rem;
    }
```

> 如何理解state更新？
>
> ![image-20211207195751516](/Users/xufei/Library/Application Support/typora-user-images/image-20211207195751516.png)

```jsx
//this.setState的时候，对对象中的某个值做更新,但原有的state仍保存
//但hook如果对某个值去改变，原有的state直接消失，所以需要...浅拷贝

```



##### Week6-day5

> Charts onresize同一页面出现多个图，只针对一个生效

```jsx
//这段代码所有图都有，但只跑了一次
window.onresize = function () {
        console.log('resize:',index)
        myChart.resize();
 }
//用addListener二级绑定，onresize会被替换掉
```

> 

```jsx
//
```

> 

```jsx


189, 230, 166
```



# AntD Pro

#### Dva

![image-20211115220140546](https://i.loli.net/2021/11/30/4LusAweWOmJo7ib.png)



*dimension*.requestValue=== *s* ? styles.active : null

```
function Employee () {
this.name = "";
this.dept = "general";
}

function WorkerBee () {
this.projects = [];
}

function SalesPerson () {
this.dept = "sales";
this.quota = 100;
}

WorkerBee.prototype = new Employee;
SalesPerson.prototype = new WorkerBee;
new SalesPerson
```

