## Http Ajax 服务器

###昨日内容总结

- bootstrap 的基本使用
- bootstrap table 的使用
- 添加讲师业务逻辑代码实现
- 查询讲师+分页业务逻辑的实现

### 今天内容

- 删除讲师数据
- echars.js 报表数据库可视化展示数据  报表图
- 移动端下拉刷新，滚动加载  zepto.js   iscroll js 库.

### echarts.js

ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的矢量图形库 [ZRender](https://github.com/ecomfe/zrender)，提供直观，交互丰富，可高度个性化定制的数据可视化 

- 5 分钟快速上手echarts.js

  ```
   柱状图
   <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 600px;height:400px;"></div>
      <script type="text/javascript">
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
          // 指定图表的配置项和数据
          var option = {
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                  data:['销量']
              },
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20]
              }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
      </script>
      
   饼状图   
   <div id="main" style="width: 600px;height:400px;"></div>
   <script>
   // 绘制图表。
       echarts.init(document.getElementById('main')).setOption({
           series: {
           type: 'pie',
               data: [
                   {name: 'A', value: 1212},
                   {name: 'B', value: 2323},
                   {name: 'C', value: 1919}
               ]
           }
       });
   </script>
  ```

- 讲师系统echarts.js 报表的实现

### zepto.js 的使用

**Zepto**是一个轻量级的**针对现代高级浏览器的JavaScript库，** 它与jquery**有着类似的api**。 如果你会用jquery，那么你也会用zepto。 

**Zepto**的设计目的是**提供 jQuery 的类似的API**，但并不是100%覆盖 jQuery 。**Zepto**设计的目的是有一个5-10k的通用库、**下载并快速执行**、有一个熟悉通用的API，所以你能把你**主要的精力放到应用开发上**。 



jquery  针对pc 端 ===>zepto.js 移动端.   



主要是zepto.js 比jquery 的体积更小.

小的原因:zepto.js 是基于模块化的，它里面的模块可以打散，也可以定制.

zepto.js 是针对高级浏览器，zepto.js 不需要考虑兼容性代码。

```
zepto.js 定制的步骤
1、安装Nodejs环境
2、下载zepto.js
3、解压缩
4、cmd命令行进入解压缩后的目录
5、执行npm install 命令
6、编辑make文件，没有后缀,添加自定义模块并保存，如下图 41行
7、然后执行命令 npm run-script dist
8、查看目录dist即构建好的zepto.js
```

### iscroll 的使用

#### 概念

 iScroll是一个高性能，资源占用少，无依赖，多平台的javascript滚动插件。

它可以在桌面，移动设备和智能电视平台上工作。它一直在大力优化性能和文件大小以便在新旧设备上提供最顺畅的体验。

iScroll不仅仅是 滚动。它可以处理任何需要与用户进行移动交互的元素。在你的项目中包含仅仅4kb大小的iScroll，你的项目便拥有了滚动，缩放，平移，无限滚动，视差滚动，旋转功能。给它一个扫帚它甚至能帮你打扫办公室。即使平台本身提供的滚动已经很不错，iScroll可以在此基础上提供更多不可思议的功能。

####版本介绍

针对iScroll的优化。为了达到更高的性能，iScroll分为了多个版本。你可以选择最适合你的版本。

目前我们有以下版本：

**iscroll.js**，这个版本是常规应用的脚本。它包含大多数常用的功能，有很高的性能和很小的体积。

**iscroll-lite.js**，精简版本。它不支持快速跳跃，滚动条，鼠标滚轮，快捷键绑定。但如果你所需要的是滚动(特别是在移动平台) iScroll 精简版 是又小又快的解决方案。

**iscroll-probe.js**，探查当前滚动位置是一个要求很高的任务,这就是为什么我决定建立一个专门的版本。如果你需要知道滚动位置在任何给定的时间,这是iScroll给你的。（我正在做更多的测试,这可能最终在常规iscroll.js脚本，请留意）。

**iscroll-zoom.js**，在标准滚动功能上增加缩放功能。

**iscroll-infinite.js**，可以做无限缓存的滚动。处理很长的列表的元素为移动设备并非易事。 iScroll infinite版本使用缓存机制,允许你滚动一个潜在的无限数量的元素



#### iScroll 的基本使用

```
2: iscroll 的基本使用
1：你需要引入js 文件
<script src="./js/iscroll-probe.js"></script>
2: 需要的页面最基本的页面结构
<div id="wrapper">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
</div
3:需要编写的样式代码
#wrapper{
      width: 300px;
      height: 400px;
      border: 1px solid #ccc;
      overflow: hidden;
      position: relative;
}
4:需要对滚轮插件进行初始化
var iscroll=new IScroll("#wrapper",{
      mouseWheel: true, //监听鼠标的滚轮进行滚动
      scrollbars:true,    //让当前的元素出现滚动条
      /*添加这个属性，就可以支持 scroll 事件了。*/
      probeType: 2
});
支持事件滚动时候触发，或者滚动结束的时候触发
```

####iscroll 事件

````
iscroll.on("scroll",function(){
      //console.log("在滚动的时候触发")
    console.log(iscroll.y);
})
iscroll.on("scrollEnd",function(){
      //console.log("在滚动结束的时候触发")
})
````

### 下拉刷新以及滚动加载的代码实现

```
/*初始化下拉滚动条*/
      var iscroll=new IScroll(".wrapper",{
           scrollbars:true,
           probeType:2
      });

      //下拉的时候触发. 这个行为是在用户拉动这个滚动条的时候进行判断.
      //在y 轴上面距离，垂直方向上面移动的距离
      iscroll.on("scroll",function(){
           //对这个y值进行判断
           if(this.y>60){
                document.querySelector(".pullDown span").innerHTML="释放刷新";
                document.querySelector(".pullDown img").style.display="inline-block";
                document.querySelector(".pullDown span").classList.add("loading");
           }
           //对用户的行为进行判断，做好一个标记
           //获取内容的高度
           var contentHeihgt=$(".content").height();
           //滑动的高度.
           var scrollHegiht=Math.abs(this.y);
           //获取到窗口的高度
           var winHeight=$(window).height();
           if((scrollHegiht+winHeight-contentHeihgt)>100){
                 //用户是想滚动加载
                 document.querySelector(".pullUp span").innerHTML="释放加载";

                 document.querySelector(".pullUp img").style.display="inline-block";
                 //做标记处理.
                 document.querySelector(".pullUp span").classList.add("loading");
           }
      });

      //下拉结束的时候触发
      iscroll.on("scrollEnd",function(){
            //下拉刷新我要去做什么事情
            if(document.querySelector(".pullDown span").classList.contains("loading")){
                    //发送ajax 请求.
                  document.querySelector(".pullDown span").innerHTML="下拉刷新";
                  document.querySelector(".pullDown img").style.display="none";
                  document.querySelector(".pullDown span").classList.remove("loading");
                  console.log("下拉刷新数据:=正在发送请求，正在加载数据.");
            };
            //滚动加载我要处理的逻辑
            if(document.querySelector(".pullUp span").classList.contains("loading")){
                //发送ajax 请求.
                document.querySelector(".pullUp span").innerHTML="滚动加载";
                document.querySelector(".pullUp img").style.display="none";
                document.querySelector(".pullUp span").classList.remove("loading");
                console.log("滚动加载数据:=正在发送请求，正在加载数据.");
            };
      });
```

