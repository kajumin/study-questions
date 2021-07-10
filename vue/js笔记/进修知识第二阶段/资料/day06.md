## HTTP服务&AJAX编程  

###上次内容复习

```
xml数据格式的概念
服务端怎么响应xml
客户端怎么解析xml
json数据格式的概念
json客户端的解析方式
xml,json 只是常见的两种数据格式，开发当中，实际还有其它的数据格式，还可以自定义数据.
需要单独开发客户端，以及单独开发服务端的时候需要使用到自定义的数据格式. 游戏开发过程当中.
ajax封装 底层是封装的 XMLHttpRequest 对象.

作业:

```

#### 上节课作业

```
 	让封装的方法data 的值支持 {} 。
 	//新增的函数，函数的功能，将一个对象转换成字符串
    params:function(obj){
        //将对象的key 作为参数名，key 对应的值作为参数值。这个地方怎么编写逻辑.
        var str="";
        //username=zhangsan&age=11&sex=nan
        for(var key in obj){
            str+=key+"="+obj[key]+"&";
        }
        //组装的字符串多了一个&,截取之后返回一个新的字符串
        str=str.substr(0,str.length-1);
        return str;//出来是要发送到后台的数据，参数名，参数值.
    }
```

###jQuery  ajax 封装

```
$.ajax({
   type: "POST",
   url: "some.php",
   data: "name=John&location=Boston",
   success: function(msg){
       alert( "Data Saved: " + msg );
   }
});
```

table 样式

```
 <style>
        table {
            width: 600px;
            border-collapse: collapse;
        }
        td {
            height: 40px;
            text-align: center;
            border: 1px solid #CCC;
        }
 </style>
```

## 模板引擎

​       模板作用:我们ajax 开发一般都是通过XMLHttpRequest 发送请求，然后服务器返回数据，当我们通过js 得到数据之后，然后通过解析json 的方式去解析数据，解析完json 之后，我们再将数据通过dom 的方式放在页面上面。如果json 的数据格式特别复杂，我们可能要做很多的js 凭借，非常麻烦，性能也非常低下。这个时候我们就需要用到模板：我们可以在模板里面解析json，然后跟html 内容拼接，性能会更好。

###流行模板引擎

**BaiduTemplate**：http://tangram.baidu.com/BaiduTemplate/  b百度

**ArtTemplate：**https://github.com/aui/artTemplate  t腾讯

**velocity.js**：https://github.com/shepherdwind/velocity.js/ a阿里

**Handlebars：**http://handlebarsjs.com/

**参考资料:**

http://blog.jobbole.com/56689/

## 1.3 **artTemplate**

1、引入template-native.js

2、<% 与  %> 符号包裹起来的语句则为模板的逻辑表达式

3、<%= content %>为输出表达式

使用步骤:

- 引入模板文件
- 创建模板
- 将数据跟模板进行绑定
- 在模板里面编写代码解析数据
- 绑定数据和模板之后得到内容
- 将数据内容写到页面上面。

# 同源&跨域

###跨域的概念

从一个站点访问一个资源，然后在这个资源当中又去访问另外的一个站点的资源，这个就是跨域。

### 同源

同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同。

### 跨域

不同源则跨域

例如http://www.example.com/

| http://api.example.com/detail.html       | 不同源 | 域名不同       |
| ---------------------------------------- | ------ | -------------- |
| https//www.example.com/detail.html       | 不同源 | 协议不同       |
| http://www.example.com:8080/detail.html  | 不同源 | 端口不同       |
| http://api.example.com:8080/detail.html  | 不同源 | 域名、端口不同 |
| https://api.example.com/detail.html      | 不同源 | 协议、域名不同 |
| https://www.example.com:8080/detail.html | 不同源 | 端口、协议不同 |
| http://www.example.com/detail/index.html | 同源   | 只是目录不同   |

1、JSONP 跨域

其本质是利用了<script src=""></script>标签具有可跨域的特性，由服务端返回一个预先定义好的Javascript函数的调用，并且将服务器数据以该函数参数的形式传递过来，此方法需要前后端配合完成。

jQuery 的$.ajax() 方法当中集成了JSONP的实现，可以非常方便的实现跨域数据的访问。

作业:去请求360 搜索接口的数据，通过script 标签。

2·  CORS 跨域（跨域资源共享）

```
通过服务端响应头的方式
通过想客户端输出一个响应头
header("Access-Control-Allow-Origin:*");
```
