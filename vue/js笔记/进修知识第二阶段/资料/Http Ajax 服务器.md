## Http Ajax 服务器

### 上节课内容回顾

- 360 搜索案例 

  这个是基于跨域去做的，然后使用底层的script 标签去发送请求. 带src 的标签都可以发送请求.

- cors 跨域的原理

  script 标签

- jsonp 跨域 与 cors 跨域的区别

- 前后端分离的优缺点  好好理解的

- session 验证与 token验证的区别

  ![1530631835242](1530631835242.png)

### 数据库环境搭建以及表结构

### php 后台环境搭建

#### queryTeacher.php

```
<?php
                //我需要把所有的employee 数据都获取到，然后通过一个表格输出到客户端.
                header("Content-Type:text/html;charset=utf-8");
                $con = mysql_connect("127.0.0.1","root","");

                /*
                   客户端必须给两个参数
                   一个参数 page 当前页
                   一个参数 pageSize 每页显示多少条.
                */

                $pageNum=$_GET['page']; //3
                $pageSize=$_GET['pageSize']; //10
                $startIndex=($pageNum-1)*$pageSize;
                $endIndex=$pageSize;
                if (!$con){
                    die('Could not connect: ' . mysql_error());
                }
                $sql="select * from teacher limit ".$startIndex.",".$endIndex;
                //连接那个数据库  pdj 数据
                mysql_select_db("huike", $con);

                //查询，响应一个结果。返回的结果都在这个$result
                $result = mysql_query($sql);
                $list=array();
                //怎么去获取这个结果.
                while($row=mysql_fetch_array($result)){
                        // $row 代表的是一条记录，代表是一行.
                        $item=array(
                             "id"=> $row['id'],
                             "username"=>$row['username'],
                             "age"=> $row['age'],
                             "lesson"=> $row['lesson'],
                             "lifePhoto"=> $row['lifePhoto'],
                             "teadesc"=>$row['teadesc']
                        );
                        array_push($list,$item);
                }

                //如果是分页的数据. 我们传递到客户端的数据格式必须
               /* {
                     "rows":[具体的记录],
                     "total":8
                }*/

               $json=array("rows"=>$list,"total"=>15);
               echo json_encode($json);
?>
```



#### addTeacher.php

```
<?php

        header("Content-Type:text/html;charset=utf-8");
         /*   //接收请求，处理请求，完成响应*/
        $username=$_POST['username'];
        $age=$_POST['age'];
        $lesson=$_POST['lesson'];
        $lifePhoto=$_POST['lifePhoto'];
        $desc=$_POST['desc'];
        //处理请求 把客户端的数据往数据库里面存放.
        //建立连接
        $con = mysql_connect("127.0.0.1","root","");
        //判断是已经建立连接.
        if (!$con){
        	die('Could not connect: ' . mysql_error());
        }
        //连接具体的那个数据库
        mysql_select_db("huike", $con);
        $sql="insert into teacher (username,age,lesson,lifePhoto,teadesc) values('$username','$age','$lesson','$lifePhoto','$desc')";

        //使用mysql_query  函数 通过$con 连接 把$sql 发送到数据库.
        if (!mysql_query($sql,$con)){
         	die('Error: ' . mysql_error());
        };
        mysql_close($con);
        echo '{"status":"ok","code":200}'
?>
```



#### removeTeacher.php

#### uploadTeacher.php

### 前端界面环境搭建 

#### pc 端 后台 管理系统

 环境搭建，jquery+bootstrap+jquery.fileupload.js+bootstrap-table.js

#### pc 端前台瀑布流环境

 jquery+artTemplate.js

#### 移动端数据展示环境搭建

zepto.js+iscroll.js+artTemplate.js