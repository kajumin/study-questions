## Vue2.x学习

### 基础

 1.vue实例和方法暴露

除了数据 property，Vue 实例还暴露了一些有用的实例 property 与方法。它们都有前缀 `$`，以便与用户定义的 property 区分开来。 

```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

2.指令系统  v-html  v-text   v-if  v-show

```
// 切换不同的登录方式
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```

v-if  和  v-show比较

v-if的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

v-show就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

3.数据绑定

单向数据绑定

```
<p class ='po' :class=" {active:isRed} " >bind绑定</p>

// 动态参数
<a v-on:[eventName]="doSomething"> ... </a>
```

双向数据绑定

```
<div>
    <input type="text" :value="something" @input="something = $event.target.value">
    <input type="text" :value="something" @input="changeSomething($event)">
    {{something}}
    <p>你喜欢的开发语言?</p>
    <select v-model="selectValue">
        <option value="">请选择</option>
        <option value="java">java</option>
        <option value="php">php</option>
        <option value="javascript">javascript</option>
    </select>

    <p>你最喜欢的运动?</p>
    <input type="radio" value="music" v-model="love">音乐
    <input type="radio" value="dance" v-model="love">跳舞
    {{love}}
    <p>你爱吃的事物?<p/>
    <input type="checkbox" value="茄子" v-model="food">茄子
    <input type="checkbox" value="土豆" v-model="food">土豆
    {{food}}

    <br>
    <textarea v-model="text">

    </textarea>
    {{text}}


    <p><input type="checkbox" id="checkbox" v-model="checked"></p>
    <label for="checkbox">{{ checked }}</label>

    <p><input type="radio" v-model="pick" v-bind:value="a"></p>				
    // 当选中时 vm.pick === vm.a
    {{pick}}

    

</div>	
```

修饰符  lazy  number  trim

```
//change之后才出发   text有影响  失去焦点才触发
<p><input  v-model.lazy="msg">{{msg}}</p>	
//修饰符.number
<p><input v-model.number="age" type="number" @change="changeAge">{{age}}</p>

//修饰符.trim
<p><input v-model.trim="msg2" @change="changeMsg2">{{msg2}}</p>	
```

4.计算属性

 计算属性是基于它们的响应式依赖进行缓存的

```
// 当msg2修改时 msg3就修改
computed: {
  msg3: function (oldV,newV) {
    return this.msg2 + 'msg3';
  }
}
```

 Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 `watch` 回调 , 细想一下这个例子： 

```
// watch
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
// computed
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

计算属性提供setter 和 getter函数

```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

5.watch监听属性

 使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。 

```
watch:{
    msg: function(newV,oldV){
        // console.log(newV,oldV);
        if(newV ==='bang') {
            console.log('bang 出来了');
        }
    },
    // 监听复杂数据类型  object array 深度监视  
    stus:{
        deep:true,//深度监视
        handler: function(newV,oldV) {
            // console.log(newV);
            // console.log(oldV);
            // console.log(newV[0].name);
            console.log(oldV[0].name);
        }
    }
    
}
```

7.class与style绑定

class对象方式

```
<div  class="static" v-bind:class="{ active: isActive, 'text-danger':hasError }"
></div>

// 绑定的数据对象不必内联定义在模板里：
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}

// 计算属性
<div v-bind:class="classObject"></div>
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

class数组语法

```
<div v-bind:class="[activeClass, errorClass]"></div>
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

// 三元表达式
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
//始终有errorClass
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

class在组件中使用

当在一个自定义组件上使用 `class` property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。 

```
<my-component class="baz boo"></my-component>
// 同样可行
<my-component v-bind:class="{ active: isActive }"></my-component>
```

style对象语法

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
// 不必写在内联定义在模板里
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

```

style数组写法

```
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

vue会自动加前缀

```
// 多重值
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

8.组件基础

组件复用  data必须是函数   组件的组织

子组件必须有一个根元素

```
// 父子传递
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>

//父监听子组件事件v-on
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
//子通过$emit触发事件
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

在组件上使用v-model

插槽使用

```
<alert-box>
  Something bad happened.
</alert-box>

Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

解析模板注意事项

 诸如table select ul  ol ，对于哪些元素可以出现在其内部是有严格限制的 

li tr option，只能出现在其它某些特定的元素内部。 

```
// 错误
<table>
  <blog-post-row></blog-post-row>
</table>
// 正确使用is
<table>
  <tr is="blog-post-row"></tr>
</table>
```

### 10.深入组件

组件注册命名: 使用 kebab-case   使用 PascalCase

全局注册和局部注册   导入

props:

 camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名： 

```
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

```
// 指明类型
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

可以静态传递也可以动态传递

```
<blog-post title="My journey with Vue"></blog-post>
你也知道 prop 可以通过 v-bind 动态赋值，例如：

<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post
  v-bind:title="post.title + ' by ' + post.author.name"
></blog-post>
```

传数字

```
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

传布尔值

```
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

传数组

```
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

传对象

```
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```





11.生命周期函数

生命周期的钩子函数
		beforeCreate
		created
		beforeMount
		mounted
		beforeUpdate
		updated
		activated
		deactivated
		beforeDestroy
		destroyed