## 一  迎接Vue3.0

#### 1.简介

```
make it faster
make it smaller
make ir more maintainable
make it easier to target native
make your lift easier
```

RFC  是一系列以编号排定的文件.

#### 2.新特性 

重点关注：

- 更快更省 

​     Object.defineProperty ——> Proxy 

​	重构 Virtual DOM 

- 完全的TypeScript 

​	团队开发更轻松 

​	架构更灵活，阅读源码更轻松 

​	可以独立使用Vue内部模块 

- Composition API（组合式API） 

  #### 一组低侵入式的、

  函数式的 API 

  更好的逻辑复用与代码组织 

  更好的类型推导 

## 二 初始化项目

#### 1.系统环境

```
npm -v
nrm ls
```

#### 2.安装@vue/cli  vue3.0通过vue2.x加一个插件完成的

```
npm install @vue/cli ­g
```

#### 3.创建项目  

```
vue create 项目名
```

#### 4.在项目中安装 vue­next 插件，试用Vue3 beta 

```
cd 项目名
vue add vue­next
```

#### 5.项目变化 

```
import { createApp } from 'vue';
import App from './App.vue'
createApp(App).mount('#app')
```

#### 6.启动项目 

```
npm run serve
```

##  三、setup函数 

setup 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。 

1. 调用时机 setup 函数会在 beforeCreate 钩子之前被调用 

2. 返回值 如果 setup 返回一个对象，则对象的属性可以在组件模板中被访问

3. 参数 

   - 第一个参数为 props ，接收当前组件props选项的值，即获取父组件传递过来的参数

   ```
   export default {
   props: {
   name: String,
   },
   setup(props) {
   console.log(props.name)
   },
   }
   
   ```

   -  第二个参数为 context ，接收一个上下文对象，该对象中包含了一些在 vue 2.x 中需要通过 this 才能 访问到属性 注：在 setup() 函数中无法访问 this  

   ```
   const MyComponent = {
       setup(props, context) {
       context.attrs
       context.slots
       context.emit
       }
   }
   ```

## 四  响应式系统API  

 Vue 3.0提供的一组具有响应式特性的函数式API，都是以函数形式提供的 

#### 1.reactive

 reactive() 函数接收一个普通对象，返回该普通对象的响应式代理对象 简单来说，就是用来创建响应式的数据对象，等同于 vue 2.x 的 Vue.observable() 函数 

步骤： 

1.按需导入 reactive 函数 

```
import { reactive } from 'vue'
```

2.调用 reactive 函数，创建响应式数据对象 

 ```
 setup() {
      // 创建响应式数据对象
      const data = reactive({count: 0})
      // 将响应式数据对象暴露出去
      return data;
 }
 ```

#### 2.ref  

 ref() 函数接收一个参数值，返回一个响应式的数据对象。该对象只包含一个指向内部值的 .value 属性 

- 基本用法 

- 在模板中访问时，无需通过.value属性，它会自动展开 

- 在reactive对象中访问时，无需通过.value属性，它会自动展开 

#### 3.computed 

 computed() 函数用来创建计算属性，函数的返回值是一个 ref 的实例 

​           只读的计算属性 

​           可读可写的计算属性 

#### 4.readonly

  readonly() 函数接收一个对象（普通或响应式），返回一个原始对象的只读代理对象 

#### 5.watch 

watch() 函数用来监视数据的变化，从而触发特定的操作，等同于 vue 2.x中的 this.$watch 

​				监视单个数据源

​				监视多个数据源 

​				取消监视 

​				清除无效的异步任务 