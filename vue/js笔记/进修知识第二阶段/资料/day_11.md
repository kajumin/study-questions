##图形学

###d3.js

一个专门用来操作svg 标签的js库，用法类似jQuery

```
SVG 形状
SVG 有一些预定义的形状元素，可被开发者使用和操作：
矩形 <rect>
圆形 <circle>
椭圆 <ellipse>
线 <line>
折线 <polyline>
多边形 <polygon>
路径 <path>
```

#### dom 操作部分

```
d3.selectAll("h3").style("color","red");
d3.select("body").append("p").text("这个是一个d3库").style("color","blue");

d3.select("button").on("click",function(){
        console.log(this);
});
```

#### 操作svg 部分

```
var data=[11,22,33,44,55,66];
//通过js 往页面上面创建svg 元素.
d3.select("body").append("svg").attr("width",300)
.attr("height",300).style("background","red")
.selectAll("svg")
.data(data)
.enter()
.append("rect");
```

####  绘制柱状图

```
var height=400;
             var width=400;
             var padding={
                   left:20,
                   top:20,
                   bottom:20
             }
var data=[11,23,44,22,55];
//创建svg 元素
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
//设置x轴的刻度.
var xScale=d3.scaleBand().domain(["angular","react","vue","bootstrap","mysql"])
.rangeRound([0,width-padding.left]);
//将 x 轴添加到底部.
var xAxis=d3.axisBottom(xScale);
//设置y 轴的刻度.
var yScale=d3.scaleLinear().domain([0,d3.max(data)]).range([height-padding.top-padding.bottom,0]);
//将y 轴的刻度添加在左边
var yAxis=d3.axisLeft(yScale);
//x 轴的刻度.
svg.append("g") //添加 x 轴到svg
.attr("transform","translate("+padding.left+","+(height-padding.bottom)+")")
.call(xAxis);
//添加y轴到 svg
svg.append("g")
      .attr("transform","translate("+padding.left+","+padding.top+")")
      .call(yAxis);
//填充数据.
svg.selectAll("rect")
	   //设置数据
       .data(data)
       //填充.
       .enter()
       //添加到页面.
       .append("rect")
       //设置rect 的位置.
       .attr("transform","translate("+padding.left+","+padding.top+")")
       //填充颜色
       .attr("fill","pink")
       //设置宽度
       .attr("width",xScale.step()-8)
       //设置高度
       .attr("height",function(h){
            return height-padding.top-padding.bottom-yScale(h);
       })
       //设置x 轴的位置。
       .attr("x",function(h,i){
              return i*xScale.step()+5;
        })
        //设置y 轴的位置。
        .attr("y",function(h){
              //根据比例尺得到剩余的高度。		
       	      return yScale(h);
        })
```

WebGL

​		WebGL（全写Web Graphics Library）是一种3D绘图协议，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。

做webGL 的动画

​		1： 舞台 

​		2：立方体(盒子，一张图片，一个视频，要执行动画的元素)

​		3:  立方体要执行动画 改这个几何体的位置, x,y,z 的位置,

不间断的去修改.requestAnimationFrame 修改

​		4:摄像机，对准这个舞台在进行录制，做这个动画，摄像机也可以动,

鼠标去移动，改变摄像机的位置，滚轮滚动调整与舞台的距离

​		5:摄像机在摄像之后要往舞台上面去进行渲染



![three_render](three_render-1531203593826.jpg)

2D的canvas 我们叫做canvas，3d 的canvas 我们叫做webGL,three.js 是一个用来操作canval 的webGL 库

```
在WebGL 当中
需要有一个“舞台”来放置元素
需要有一台“摄像机”记录“舞台”上发生的事情
舞台上需要有“演员”
创建演员需要一些操作
首先创建一个 “几何体”
再次对几何体进行 “包装”
通过 canvas 标签来对“摄像结果”进行展示
```

案例 立方体

```
var width=window.innerWidth; //宽度
var height=window.innerHeight; //高度
//创建舞台.
var scene=new THREE.Scene();
//创建摄像机.  设置透视的相机(近大远小).
/*
* 50 能够录的角度,角度越大，录的面越广
* 舞台的宽高比
* 从摄像机到0.1 的距离录不进去.
* */
var camera=new THREE.PerspectiveCamera(50,width/height,0.1,800);
//调整摄像机的位置. 不调位置也可以. 是一个3纬立体的，我们要确定一个点的位置
//需要三个坐标
camera.position.x=0;
camera.position.y=0;
camera.position.z=0;
//开着舞台，对准舞台.
camera.lookAt(scene.position);
/*
开始录制，开始录制的时候需要一个canvas 的标签对结果进行显示
* 所以我们需要创建一个渲染器. 相当于创建了一个canvas 标签
* */
var renderer=new THREE.WebGLRenderer();
//设置宽度高度.
renderer.setSize(width,height);
//将canvas 标签放在页面上
document.body.appendChild(renderer.domElement);
 //控制相机.
 var orbitControls=new THREE.OrbitControls(camera);
 //自动旋转.
 orbitControls.autoRotate = true;
/*所有的准备工作准备完成,缺少演员表演动作*/
/*演员登场.*/
//创建几何体 立方体。 Geometry 几何体
/*设置大小，长宽高都是4的立方体*/
var box = new THREE.BoxGeometry(4, 4, 4);
//给几何体化妆， 给六个面不同的颜色.
var materials = [
    new THREE.MeshBasicMaterial({color: 'blue'}),
    new THREE.MeshBasicMaterial({color: 'red'}),
    new THREE.MeshBasicMaterial({color: 'pink'}),
    new THREE.MeshBasicMaterial({color: 'green'}),
    new THREE.MeshBasicMaterial({color: 'yellow'}),
    new THREE.MeshBasicMaterial({color: 'orange'})
];
//将颜色添加到几何体上 给这个几何体使用这些材料.
var cube = new THREE.Mesh(box,materials);
//舞台上放好已经化妆好的演员。
scene.add(cube);
//放到舞台上以后，人要向看到舞台上面的东西，摄像机必须开始工作
//开始摄像.
//渲染scene 上面的内容，到 camera 的射线机.
render();
// cube.rotation.y = 0.3;
// cube.rotation.x = 0.1;
// renderer.render(scene, camera);
render();
function render(){
    renderer.render(sence,carma);
    //调整几何体的位置
    cube.rotation.x+=0.01;
    cube.rotation.y+=0.01;
    cube.rotation.z+=0.01;
    当你需要更新屏幕画面时就可以调用此方法。在浏览器下次重绘前执行回调函数。回调的次数通常是每秒60次，但大多数浏览器通常匹配 W3C 所建议的刷新频率。在大多数浏览器里，当运行在后台标签页或者隐藏的<iframe> 里时，requestAnimationFrame() 会暂停调用以提升性能和电池寿命。
    requestAnimationFrame(render);
}
```

雪花案例

```
<script src="./js/three/OrbitControls.js"></script>
var width=window.innerWidth;
var height=window.innerHeight;
//创建舞台
var scene = new THREE.Scene();
//创建摄像机.
var camera = new THREE.PerspectiveCamera(50,width/height,0.1,800);
//调整相机位置
camera.position.x=0;
camera.position.y=0;
camera.position.z=100;
//摄像机的位置对准舞台.
camera.lookAt(scene.position);
//开始录制，往页面上面添加渲染
var renderer=new THREE.WebGLRenderer();
//设置大小
renderer.setSize(width,height);
往页面上面添加一个canvas 标签
document.body.appendChild(renderer.domElement);
// 摄像机插件 控制摄像机的缩放。
var orbitControls = new THREE.OrbitControls(camera);
orbitControls.autoRotate = true;
//演员登场.  创建一个几何体.
var geometry=new THREE.Geometry()
//加载纹理
var texture=new THREE.TextureLoader().load("./images/snow.jpg");
//材质，用来控制图片的.
var material=new THREE.PointsMaterial({
    size:20,
    map:texture,
    //用来调整雪花的透明度.
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
});
//创建更多的几何体（来承载许多雪花） 创建雪花， 雪花出现的位置
var range = 500;
for (var i = 0; i < 400; i++) {
	var	 particle = new THREE.Vector3(
    Math.random() * range - range / 2,
    Math.random() * range * 1.5,
    Math.random() * range - range / 2);
    particle.velocityY = 0.1 + Math.random() / 5;
    particle.velocityX = (Math.random() - 0.5) / 3;
    particle.velocityZ = (Math.random() - 0.5) / 3;
    geometry.vertices.push(particle);
}
//将几何体跟装饰合并.
	var points = new THREE.Points(geometry, material);
//把装饰添加到舞台上
	scene.add(points);
	render();
function render(){
	renderer.render(scene,camera);
//每朵雪花移动的轨迹。
    scene.children.forEach(function (child) {
    if(child instanceof THREE.Points) {
            var vertices = child.geometry.vertices;
            child.geometry.verticesNeedUpdate = true;

            vertices.forEach(function (v) {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);
            v.z = v.z - (v.velocityZ);
            // y 的边界值
            if(v.y <= -height / 2) {
            	v.y = height / 2;
            }

            // x 的边界值
            if(v.x <= -width / 2 || v.x >= width / 2) {
            	v.velocityX = v.velocityX * -1;
            }

            // z 的边界值
            if(v.z <= -60 || v.z >= 60) {
           		 v.velocityZ = v.velocityZ * -1;
            }
            })
       }
    })
	requestAnimationFrame(render);
}
```





