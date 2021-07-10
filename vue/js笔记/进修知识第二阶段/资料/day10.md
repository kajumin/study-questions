##Http Ajax 服务器



###昨天内容回顾

- 删除讲师信息
- 移动端zepto.js 的介绍
- 移动端iscroll 的介绍 
- 下拉刷新以及滚动加载的实现
- 扩展  mui  mescroll js 库
###今天内容
- 瀑布流的结构分析

​       瀑布流大部分情况下都是用来展示图片数据,图片高度大小不一样。通过滚动加载的方式去进行展示。

- 瀑布流的编写思路

  我要怎么去对页面的代码进行布局.

- 瀑布流布局jquery 插件的封装
  ```
  $.fn.waterFall=function(){
         var $items=$(this);
         var parentWidth=$items.width();
         var $children=$items.children(".item");
         var width=$children.width();
         var column=5;
         //指定间距.
         var space=(parentWidth-column*width)/(column-1);
         var arr=[];
         $children.each(function(index,dom){
                  var $dom=$(dom);
                  if(index<column){
                        $dom.css({
                             left:index*(width+space),
                             top:0
                        })
                        arr.push($dom.height());
                  }else {
                        var minIndex=0;
                        var minHeight=arr[minIndex];
                        for(var i=0;i<arr.length;i++) {
                              if(minHeight>arr[i]){
                                   minHeight=arr[i];
                                   minIndex=i;
                              }
                        }
                        $dom.css({
                             left:minIndex*(width+space),
                             top:minHeight+space
                        })
                        arr[minIndex]=minHeight+space+$dom.height();
                  }
         });
         var maxIndex=0;
         var maxHeight=arr[maxIndex];
         for(var i=0;i<arr.length;i++){
               if(arr[i]>maxHeight){
                    maxHeight=arr[i];
               }
         }
         $items.css("height",maxHeight+100);
  }
  ```

- 配合ajax 实现滚动加载以及点击加载pc 端

  ```
  			//提炼成全局，这个是参数
              var params={
                  page:1,
                  pageSize:10
              };
              //1：  页面加载完毕，我需要去获取第一屏瀑布流的数据
              //1.1: 发送请求到服务器，获取第一屏的数据。
              //1.2：获取到数据之后解析数据，解析数据渲染到页面。【模板技术】
              var render=function(){
              $.ajax({
                  url:"/php/waterFall/data.php",
                  type:"get",
                  data:params,
                  success:function(data){
                  //给当前页赋值.
                  params.page=data.page;
                  //我获取到后台的数据的，也跟标签进行组装了，通过模板的组装的
                  var html=template("waterFallId",data);
                  //将内容填充到items 区域
                  $(".items").append(html);
                  //定位.items 里面的内容.
                  $(".items").waterFall();
                  //去掉这个按钮的loading 样式，让按钮可以再次点击.
                  $(".btn").removeClass("loading").text("点击加载");
              }
              })
              }
                    //加载首屏的数据.
                     render();
                     // 2：点击一下，去加载一次瀑布流的数据.每次点击，都可以加载一次
                     $(".btn").on("click",function(){
                             //问题:防止用户多次点击重复提交
                             //思路：当点击了这个按钮之后，在服务器的数据没有加载完成之前，我是不让你点击再次提交的.
                             var $btn=$(this);  //这个是当前点击的按钮
                             //变成立即加载中的这样的一个状态.
                             $btn.text("正在加载中....");
                             if($btn.hasClass("loading")){ //如果它有这样的一个样式，
                                 return; //return，不让执行下面的代码.
                             }
                             $btn.addClass("loading"); //数据加载完成了之后，按钮可以恢复点击.
                             render();
                     })
                  /*
                   注意:
                  * 图片的布局刚刚发生错乱，思考
                  *     错乱的就是这个定位有问题，里面的 .item 的定位。
                  *     .item 的 定位是通过 waterFall 的方法里面去定位的.
                  *     它是通过什么去定位的，依赖上面的元素，计算每一列的高度.
                  *     每一列的高度现在是由图片本身的高度去决定的，图片在加载的时候有一个延迟.
                  *     它还没有加载完，你就去获取它的高度。获取不到. 所以我们怎么解决，把这个高度固定
                  *     实际上这个高度从后台传递过来的，传递之后赋给这个img  的height
                  *
                  * */
                  //3：滚动的时候，滚动距离到达某个位置的时候，也可以完成一个加载.
                  //滚动条的事件需要添加上.
                  $(window).on("scroll",function(){
                              //获取.container 的高度. +距离页面顶部的距离 获取的是内容高度.
                              var cheight=$(".container").height();
                              //距离页面上面的位置
                              var top=$(".container").offset().top;
                              //获取到的是整个内容的高度.
                              var contentHeight=cheight+top+40;
                              //获取被卷曲进去的高度，页面被卷曲进去的高度
                              var scrollheight=$(document).scrollTop();
                              //获取到的是窗口的高度.
                              var winheight=$(window).height();
                              if(contentHeight-(winheight+scrollheight)<100){
                                    //加载数据. 必须是去触发事件，防止用户滚动的时候多次提交
                                    //render();
                                    $(".btn").click();
                              }
                  });
  ```

![1530973351326](1530973351326.png)

###web 图形学

数据库可视化:flash,canvas  svg,webGL。

游戏/图形报表.

#### echarts.js（图形化） 

结合我们的整个案例，做了一个柱状图还有饼状图。非常方便，基本没有学习成本. 可定制化就非常低.

svg html 标签.

#### d3.js  

```
svg	它是一个html 标签
<!--指定画布的大小-->
    <svg width="1000" height="1000">
         <!--
               定义矩形的宽高.
         -->
         <rect width="300" height="200" style="fill: red;"></rect>
         <!--
                cx 圆心距离x 轴的距离
                cy 圆心距离y 轴的距离
                r 指的是半径
         -->
         <circle cx="140" cy="140" r="140"  fill="blue"></circle>
    </svg>
```

```
先关学习网站
https://d3js.org
d3 是一个针对数据可视化的javascript 库，它能帮你的数据快速的在HTML的svg
```

### d3.js 的使用

```
d3 是一个 专门用来操作svg 的库.
它的用法有点类似于jquery
引入d3 之后 可以得到一个对象 d3，通过d3 开放的一系列方法或属性实现图标的绘制

可以像jquery 一样操作普通dom
d3.selectAll("h3").style("color","red");
//用法类似jquery
d3.select("body").append("p").text("这个是一个d3库").style("color","blue");
//添加事件.
d3.select("button").on("click",function(){
                console.log(this);
});
//attr 方法切换属性
```

通过上面的案例我们发现d3 可以类似jquery 一样操作dom,但是这个不是d3 的主要任务，d3的主要任务是根据数据生成图标

```
基本小案例
//通过js 往页面上面创建svg 元素.
    d3.select("body").append("svg").attr("width",300)
        .attr("height",300).style("background","red")
        .selectAll("svg")
        .data(data)
        //根据数据进行填充.	
        .enter()
        .append("rect");
```

#### d3.js生成柱状图

- api 介绍

  scaleBand() 生成X轴的刻度

  domain([]) 根据具体的数据去生成刻度

  rangeRound([0,width]) 按照0-width 的长度生成多少等份

  axisBottom(xScale); 将x轴的刻度放在最底部

  d3.scaleLinear()  生成y 轴的刻度

  .domain([0, d3.max(data)]) 根据谁去生成刻度，数据的最大值.

  .range([0,height]); 表示的范围

  //坐标轴的位置. 坐标轴的位置
  d3.axisLeft(yScale);

  svg.append("g") 创建g 标签
  .attr("transform","translate(20,280)")
  .call(xAxis); 生成x 轴的坐标.

```
1:准备数据
var data=[11,22,33,44,55,66];
2:创建svg 标签
var height=300;
var width=500;
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
3:创建坐标轴
3.1 生成x坐标轴的刻度
api scaleBand 生成刻度,domain 根据谁去生成刻度,rangeRound刻度分成多少等份
var xScale=d3.scaleBand()
//根据谁去生成相应刻度
.domain(["php","go","java","python","node.js",".net"])
//刻度放的位置 Round 取整
//按照0-width 的长度分为6等份.
.rangeRound([0,width]);
//x轴的坐标轴添加在最底部
var xAxis=d3.axisBottom(xScale);
3.2 生成y坐标轴的刻度
var yScale=d3.scaleLinear()
// 根据谁生成刻度
.domain([0, d3.max(data)])
.range([0,height]);
//坐标轴的位置.
var yAxis=d3.axisLeft(yScale);
3.3 添加到svg 里面显示
//创建一组标签，分组
svg.append("g")
.attr("transform","translate(20,280)")
.call(xAxis);
svg.append("g")
.attr("transform","translate(20,-20)")
.call(yAxis);
```

