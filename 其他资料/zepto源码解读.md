### 1.诡异的数组

Array.prototype  查看数组方法

### 2.原型链

#### 1.每一个函数都有prototype

#### 2.每一个new出来的实例的隐式原型指向构造函数显示原型

#### 4.引用类型本身没有属性方法, 在原型上找

```js
[].concat === Array.prototype.concat;
[].push === Array.prototype.push;
[].map === Array.prototype.map;
```

### 3.源码结构

#### 1.Zepto结构   指明Zepto 和 $ 都是一个函数, 函数内返回zepto.init()调用

```
var Zepto = (function(){
	var $;
	var zepto = {};  //$.zepto = zepto这个对象可以通过$.zepto获取
	$ = function (selector, context){
		return zepto.init(selector, context);
 	}
	return $;
})();

window.Zepto = Zepto   //是$函数
window.$ === undefined && (window.$ = Zepto)
```

#### 2.zepto.init()函数调用, 确定dom结果  最后使用返回return zepto.Z(dom, selector)调用

分为多种情况:

(1) 没有参数 返回return zepto.Z()

(2)第一个: 字符串 '<div><div>'    返回dom

(3)第一个: 字符串 ,且context不等于undefined ,  return $(context).find(selector)

(4)第一个: 字符串   else dom =  zepto.qsa(document, selector)  通过querySelectorAll()查找

(5)第一个: 函数   return $(document).ready(selector)

(6)第一个: zepto对象    直接返回  return selector

(7)第一个: 数组    返回dom = compact(selector)   去除null  undefined

(8)第一个: 对象    返回dom = [selector],  selector = null

```
zepto.init = function(selector, context) {
    var dom
    // $()没有写参数时  直接返回
    if (!selector) return zepto.Z()
    // Optimize for string selectors
    else if (typeof selector == 'string') {
      selector = selector.trim()
      // $('<div><div>')
      if (selector[0] == '<' && fragmentRE.test(selector))
        dom = zepto.fragment(selector, RegExp.$1, context), selector = null
      // $('p','div')   在div中找p
      else if (context !== undefined) return $(context).find(selector)
      // $('p')   querySelectorAll去找
      else dom = zepto.qsa(document, selector)
    }
    // $(function(){})   相当于ready方法
    else if (isFunction(selector)) return $(document).ready(selector)
    // $($('p'))  传入的是zepto对象  直接返回
    else if (zepto.isZ(selector)) return selector
    else {
      // 如果是数组  将null undefined去除
      if (isArray(selector)) dom = compact(selector)
      // Wrap DOM nodes.
      else if (isObject(selector))
        dom = [selector], selector = null
      // If it's a html fragment, create nodes from it
      else if (fragmentRE.test(selector))
        dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
      // If there's a context, create a collection on that context first, and select
      // nodes from there
      else if (context !== undefined) return $(context).find(selector)
      // And last but no least, if it's a CSS selector, use it to select nodes.
      else dom = zepto.qsa(document, selector)
    }
    // create a new Zepto collection from the nodes found
    return zepto.Z(dom, selector)
  }
```

#### zepto.Z()函数调用, 把$.fn中的方法赋值给dom的__proto__隐式原型, 最后返回dom

```
zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn //$.fn =  zepto.Z.prototype
    dom.selector = selector || ''
    return dom
}
zepto.Z.prototype = $.fn
```

#### 上一个步骤涉及$fn = zepto.Z.prototype,

 $.fn = {
    forEach: emptyArray.forEach,
    reduce: emptyArray.reduce,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,

​	/*   其他一些方法 */

}

1.1.6

dom  =  类似数组.__proto____ = $.fn  = zepto.Z.prototype

```
 zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn //$.fn =  zepto.Z.prototype
    dom.selector = selector || ''
    return dom
  }
```



1.2.0

返回对象   new Z()     Z.prototype   =  $.fn = zepto.Z.prototype

```
zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }
function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
  }
```



### 插件写法

单个插件

```
;(function($){
    //一个插件的写法  $.fn可以给Zepto添加扩展。
	$.fn.color = function(option){
		var options = $.extend({
			col: "blue",
			fz : "20px"
		}, option);
		this.css("color", options.col);
		this.css("fontSize", options.fz);

		return this;  //保证能够链式调用
	}
})(Zepto); //这里的$就代表Zepto了，这是zepto中定义的一个函数
```

多个插件

```
 //多组插件写法
;(function($){	
	$.extend($.fn, {
		color: function(option){
			var options = $.extend({
				col: "blue",
				fz : "20px"
			}, option);
			this.css("color", options.col);
			this.css("fontSize", options.fz);
			return this; //保证链式调用
		},
		background: function(option){
			var options = $.extend({
				bg: "blue"
			}, option);

			this.css("background", options.bg);
			return this;  //保证链式调用
		}
	})
})(Zepto);

```

