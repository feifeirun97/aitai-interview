# React

##### 虚拟DOM

虚拟dom是什么？

​	在js和真实dom中间加留意个缓存，利用dom diff算法避免了没有必要的dom操作，提高了性能

实现过程

	1. 用JS对象结构表示dom树的结构
	1. 用这个树构建一个真正的dom树,插到文档中当状态变更时, 重新构造一颗新的对象树
	1. 新旧对象树比较, 记录差异并把差异应用到1所构建的真正的dom树上, 视图就更新了

##### 虚拟DOM和DOM的区别 性能差异


