## 1.首页

### 1.1轮播图

```
<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
    <swiper-item v-for="carousel in carouselList" :key="carousel.id">
        <image :src="carousel.src" class="carousel"></image>
    </swiper-item>   
</swiper>
```

```
uni.request({
    url: common.serverURL +'index/carousel/list',
    method: "POST",
    success: (res) => {
        // console.log(res);
        console.log(res.data);
        if(res.data.state !== 200){
            // this.carouselList = res.data.data;
            this.carouselList = data.carouselList;
            console.log(this.carouselList)

        }
    },
    error: (err) =>{
        console.log(err)
    }
});
```

### 1.2 热门超英

```
<scroll-view scroll-x="true" class="page-block hot">
    <view class="single-poster" v-for="superHero in hotSuperHeroList" :key="superHero.id">
        <view class="poster-wrapper">
            <image :src="superHero.src" class="post"></image>
            <view class="movie-name">
                {{superHero.name}}
            </view>
            <trailerStars :innerScore="superHero.score" :showNum="1"></trailerStars>
        </view>
    </view>

</scroll-view>
```

```
// 查询热门超英
uni.request({
    url: common.serverURL +'index/movie/hot?type=superhero',
    method: "POST",
    success: (res) => {
        // console.log(res);
        console.log(res.data);
        if(res.data.state !== 200){

            this.hotSuperHeroList = data.hotSuperHeroList;
            console.log(this.hotSuperHeroList)

        }
    },
    error: (err) =>{
        console.log(err)
    }
});
```

### 1.3热门预告

```
<view class="hot-movies page-block">
    <video
        v-for="trailer in hotTrailerList"
        :key="trailer.id"
        :id="trailer.id + ''"
        :data-playIndex="trailer.id"
        @play="meIsPlaying"
        :src="trailer.trailer"
        :poster="trailer.poster"
        class="hot-movie-single"
    ></video>
</view>
```

```
// 查询热门预告
uni.request({
    url: common.serverURL +'index/movie/hot?type=trailer&qq=404107262',
    method: "POST",
    success: (res) => {
        // console.log(res);
        console.log(res.data);
        if(res.data.state !== 200){

            this.hotTrailerList = data.hotTrailerList;
            console.log(this.hotTrailerList)

        }
    },
    error: (err) =>{
        console.log(err)
    }
});
```

### 1.4 猜你喜欢

```
<view class="guess-u-like page-block">
    <view class="single-like-movie" v-for="(guess,index) in gessULikeList" :key="guess.id">
        <image :src="guess.cover" class="like-movie"></image>
        <view class="movie-desc">
            <view class="movie-title">{{guess.name}}</view>
            <block v-if="guess.score >= 0">
                <trailerStars :innerScore="guess.score" showNum="0"></trailerStars>
            </block>
            <view class="movie-info">
                {{guess.baseInfo}}
            </view>
            <view class="movie-info">
                {{guess.releaseInfo}} 
            </view>
        </view>
        <view class="movie-oper" :data-guessIndex="index" @click="praiseMe">
            <image src="../../static/icos/praise.png" class="praise-icon"></image>
            <view class="praise-me">点赞</view>
            <view class="praise-me animation-opacity" 
            :animation="animationData" 
            >+1</view>
        </view>
    </view>
</view>
```

```
refresh(){
    console.log('下拉刷新')
    let serverURL = common.serverURL;
    uni.showLoading({
        mask: true
    });
    uni.showNavigationBarLoading();//开启导航栏才有效果
    // 查询猜你喜欢
    uni.request({
        url: serverURL +'/index/guessULike?qq=404107262',
        method: "POST",
        success: (res) => {
            // console.log(res);
            console.log(res.data);
            if(res.data.state !== 200){

                this.gessULikeList = data.gessULikeList;
                console.log(this.gessULikeList)

            }
        },
        error: (err) =>{
            console.log(err)
        },
        complete:()=>{
            console.log('请求完成')
            uni.stopPullDownRefresh();
            setTimeout(function(){
                uni.hideLoading();
            }, 1000);
            uni.hideNavigationBarLoading();

        }
    });
},
```

下拉刷新

在 js 中定义 onPullDownRefresh 处理函数（和onLoad等生命周期函数同级），监听该页面用户下拉刷新事件。

- 需要在 `pages.json` 里，找到的当前页面的pages节点，并在 `style` 选项中开启 `"enablePullDownRefresh": true
- 当处理完数据刷新后，`uni.stopPullDownRefresh` 可以停止当前页面的下拉刷新。



### 1.5点赞  

动画

动画: 创建一个动画实例 [animation](https://uniapp.dcloud.io/api/ui/animation?id=animation)。调用实例的方法来描述动画。最后通过动画实例的export方法导出动画数据传递给组件的animation属性 

#### 1.第一步创建动画

```
this.animation = uni.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0
});
//创建动画对象赋值给data中animaton
```

#### 2.编写动画行为并导出赋值给animationData

```
this.animation.translateY(-80).opacity(1).step({duration: 1000});
this.animationData = this.animation.export(); //没有使用数组时
// this.animationData = this.animation;
// this.animationDataArr[gIndex] = this.animationData.export();//使用数组
```

#### 3.绑定动画anmationData

```
<view class="praise-me animation-opacity" 
    :animation="animationData" 
    :animation="animationDataArr"//使用数组 
    >+1</view>
```

#### 4.动画执行完恢复原来

```
setTimeout(function(){
    this.animation.translateY(-50).opacity(0).step({duration:0});
    this.animationData = this.animation.export();//没有使用数组
    // this.animationData = this.animation;
    // this.animationDataArr[gIndex] = this.animationData.export();//使用数组
}.bind(this),500);
```

完整代码

```
praiseMe(e) {
    console.log('点赞');
    var gIndex = parseInt(e.currentTarget.dataset.guessindex);
    console.log(gIndex);

    this.animation.translateY(-80).opacity(1).step({duration: 1000});
    this.animationData = this.animation.export(); //没有使用数组时
    // this.animationData = this.animation;
    // this.animationDataArr[gIndex] = this.animationData.export();

    console.log(this.animation)
    console.log(this.animationData)
    console.log(this.animationDataArr)
    // 还原动画
    setTimeout(function(){
        this.animation.translateY(-50).opacity(0).step({duration:0});
        this.animationData = this.animation.export();
        // this.animationData = this.animation;
        // this.animationDataArr[gIndex] = this.animationData.export();
    }.bind(this),500);
    return;
}
```

## 2.搜索页面实现

### 2.1搜索按钮

```
<input text="text" 
    class="search-text" 
    placeholder="搜索预告" 
    maxlength="10"
    confirm-type="search"//键盘弹起,下方显示搜索  手机端
    @confirm="serverMe"  //点击搜索或者h5回车键触发
    />
//渲染列表
<view class="page-block movie-list">
        <view class="movie-wapper" v-for="(trailer,index) in trailerList" :key="index">
            <image 
            :src="trailer.cover"
            :data-trailerId="trailer.id"
            @click="showTrailer"
             class="post"></image>
        </view>	
    </view>	
```

### 2.2生命周期函数 onReachBottom 实现向下滑动自动加载更多内容

```
onReachBottom(){
    this.page++;
    // this.keywords;
    if(this.page > this.totalpages){
        return;
    }
    this.pagedTrailerList(this.keywords,this.page,15);
},
```

### 2.3进入调用渲染方法

```
onLoad(){
			this.pagedTrailerList('',1,15);
}
```



### 2.4 pagedTrailerList方法编写

```
pagedTrailerList(keywords,page,pageSize){
    let serverURL = common.serverURL;
    uni.showLoading({
        mask: true,
        title: "请稍后!"
    });
    uni.showNavigationBarLoading();//开启导航栏才有效果
    // 查询猜你喜欢
    uni.request({
        url: serverURL +'search/list?keywords='+keywords+'&page='+page+'&pageSize='+pageSize,
        method: "POST",
        success: (res) => {
            // console.log(res);
            console.log(res.data);
            if(res.data.state !== 200){
                // debugger;
                console.log(keywords,page,pageSize)
                if(keywords == '' || keywords == undefined) {
                	//追加内容到已有列表中
                    this.trailerList = this.trailerList.concat(data.trailerList.slice(page-1,pageSize));//没有输入搜索内容时
                    this.totalpages = data.trailerList.length / 9;
                }else{
                	//输入搜索内容时
                    var filterList = data.trailerList.filter((item,index) => {
                        return item.name.includes(keywords);
                    });
                    this.totalpages = this.filterList.length / 9;
                    //追加内容到已有列表中
                    this.trailerList = this.trailerList.concat(filterList).slice(page-1,pageSize);
                    console.log(this.trailerList);
                }
                console.log(this.totalpages)

            }
        },
        error: (err) =>{
            console.log(err)
        },
        complete:()=>{
            setTimeout(function(){
                uni.hideLoading();
            }, 1000);
            uni.hideNavigationBarLoading();

        }
    });
}
```

### 2.5 点击搜索内容进入详情页面

```
showTrailer(e) {
    var trailerId = e.currentTarget.dataset.trailerid;
    uni.navigateTo({
    	//传递参数  trailerId
        url: "../movie/movie?trailerId="+ trailerId
    });
},
```

## 3.详情介绍页面

### 3.1加载机制问题 传递给子组件的innerScore 为undefined, 解决办法使用v-if

```
<block v-if="trailerInfo.score >= 0">
	<trailerStars :innerScore="trailerInfo.score" showNum="0"></trailerStars>
</block>
```

### 3.2导航栏设置

```
//(1)通过设置pages.json
"app-plus": {
    "titleNView": {
        "type": "transparent"
    }
}
(2)通过api设置
uni.setNavigationBarColor({
    frontColor: "#ffffff",
    backgroundColor: "#000"
});
```

### 3.3演职人员

```
<view class="scroll-block">
        <view class="plots-title">演职人员</view>
        <scroll-view class="scroll-list" scroll-x="true">
            <view v-for="(director,index) in directorArr" class="actor-wapper">
                <image 
                :src="director.photo"
                :key="director.id"
                mode="aspectFill" //图片的mode
                class="single-actor"
                @click="lookStaffs"       //点击预览
                :data-staffIndex="index"  //放大预览索引
                ></image>
                <view class="actor-name">{{director.name}}</view>
                <view class="actor-role">{{director.actName}}</view>
            </view>
            <view v-for="(actor,index) in actorArr" class="actor-wapper">
                <image 
                :src="actor.photo"
                :key="actor.id"
                mode="aspectFill"
                class="single-actor"
                @click="lookStaffs"
                :data-staffIndex="index + directorArr.length"
                ></image>
                <view class="actor-name">{{actor.name}}</view>
                <view class="actor-role">{{actor.actName}}</view>
            </view>
        </scroll-view>
    </view>
```

### 2.4图片预览功能  api => 媒体

```
//预览事件
lookMe(e) {
    //1.获取索引
    var imageindex = parseInt(e.currentTarget.dataset.imageindex);
    console.log(imageindex);
    //定义previewImage
    uni.previewImage({
        current: imageindex,
        urls: this.plotPicsArr
    });
},
lookStaffs(e) {
    //1.获取索引  导演和演员已经拼接到一起了
    var staffindex = parseInt(e.currentTarget.dataset.staffindex);
    console.log(staffindex);
    //拼接导演和演员列表
    var totalList = this.directorArr.concat(this.actorArr);
    var urls = [];
    //遍历得到图片裂变
    totalList.forEach((item,index)=>{
        urls.push(item.photo)
    });
    console.log(urls)
    uni.previewImage({
        current: staffindex,
        urls: urls
    });
}
```

### 2.5视频处理

##### 1.自动播放视频

```
onShow(){
    console.log('播放视频')
    if(this.videoContent){
        this.videoContent.play();
    }	
},
```

##### 2.初次加载, 获取视频上下文

```
onReady(){
    // 页面初次加载完成  获得视频上下文
    this.videoContent = uni.createVideoContext("myTrailer");
},
```

##### 3.隐藏视频,包括点击预览, 回退页面

```
onHide(){
    this.videoContent.pause();
},
```

##### 4. 分享图文

```
onNavigationBarButtonTap(e){
    var me = this;
    var index = e.index;
    console.log(index);
    if(index == 0){
        // 分享
        uni.share({
            provider: "weixin",
            scene: "WXSceneSession",
            type: 0,
            href: "http://localhost:8080/#/pages/movie/movie?trailerId=" + me.trailerInfo.id,
            title: "NEXT超英预告: <<"+ me.trailerInfo.name + ">>",
            summary: "NEXT超英预告: <<"+ me.trailerInfo.name + ">>",
            imageUrl: me.trailerInfo.cover,
            success: function (res) {
                console.log("success:" + JSON.stringify(res));
            },
            fail: function (err) {
                console.log("fail:" + JSON.stringify(err));
            }
        });
    }
},
```

##### 5.分享页面

 小程序中用户点击分享后，在 js 中定义 onShareAppMessage 处理函数（和 onLoad 等生命周期函数同级），设置该页面的分享信息 

```
onShareAppMessage(res){	
    return {
          title: this.trailerInfo.name,
          path: '/pages/movie/movie?trailerId=' + this.trailerInfo.id
    }
},
```

### 2.6首页视频处理

1.注册@play="meIsPlaying"事件, 遍历创建视频上下文并暂停,播放点击了的视频

```
meIsPlaying(e){
    // 播放视频暂停其他在播放的视频
    var me = this;
    if(e) {
        // debugger;
        var playIndex = e.currentTarget.dataset.playindex;
        console.log(e.currentTarget);
        var id = e.currentTarget.id;
        console.log(id);
        this.viedeoContent = uni.createVideoContext(id);
        // this.viedeoContent.play();
    }
    this.hotTrailerList.forEach(function(item,index){
        if(item.id != playIndex){
            uni.createVideoContext(item.id+'').pause();
        }
    });
},
```

2.跳转页面隐藏时,暂停视频

```
onHide(){
    this.viedeoContent.pause();
},
```

### 2.7自定义预览页面

#### 1.跳转

```
<navigator :url="'../cover/cover?cover='+ trailerInfo.cover">
    <image 
    :src="trailerInfo.cover"
    class="cover"
    ></image>
</navigator>
```

#### 2.cover页面(自定义预览页面)

```
<image 
    :src="cover" mode="widthFix" 
    class="cover"></image>
    
this.cover = params.cover;
```

#### 3.长按longpress,保存到本地,h5不可行 ,小程序和android,ios可以

````
operator(){
    var me = this;
    uni.showActionSheet({
        itemList: ["保存图片到本地"],
        success: (res)=>{
            // debugger;
            // res = {tapIndex: 1, errMsg: "showActionS"}
            if(res.tapIndex === 0) {
                uni.showLoading({
                    title: "图片保存中"
                })
                uni.downloadFile({
                    url: me.cover,
                    success: function(result) {
                        // 拿到临时路径
                        console.log(result);
                        var tempPath = result.templatePath;
                        // blob:http://localhost:8080/78442226-5f67-4c0f-a2a7-387a98c6d5c1
                        uni.saveImageToPhotosAlbum({
                            filePath: tempPath,
                            success: function(){
                                uni.showToast({
                                    title: "保存成功",
                                    duration: 2000
                                });
                            },
                            complete:function(){
                                uni.hideLoading();
                            }
                        });

                    }
                });
            }
        }
    });
}
````

## 4.我的(me)页面

### 4.1显示登录信息或者显示登录

```
<view class="header">
	//用户头像或者默认图片
    <view v-if="userIsLogin" class="login-block">
        <image :src="userInfo.faceImage" class="face"></image>
    </view>
    <view v-else>
        <image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
    </view>
    //用户信息模块或者默认模块
    <view class="info-wapper"  v-if="userIsLogin">
        <view class="nickname">
            {{userInfo.nickname}}
        </view>
        <view class="nav-info">{{userInfo.id}}</view>
    </view>
    <view v-else>
        <navigator url="../registLogin/registLogin">
            <view class="nickname regist-login">
                注册/登录
            </view>
        </navigator>
    </view>
    <view class="set-wapper" v-if="userIsLogin">
        <navigator url="../meInfo/meInfo">
            <image src="../../static/icos/settings.png" class="settings"></image>	
        </navigator>
    </view>
</view>
```



```
onShow(){
    try {
    	//全局注册方法Vue.prototype.getGlobalUser= function(){}
        this.userInfo = this.getGlobalUser('global-user');
        console.log(this.userInfo);
        if (this.userInfo != null) {
            this.userIsLogin = true;   //显示登陆信息 信号量
            console.log(this.userInfo);
        }else {
            this.userIsLogin = false;
        }
    } catch (e) {
        // error
    }
},
```

### 4.2登陆注册页面

#### 2.1用户密码登录

```
<form @submit="formSubmit">
        <view class="face-wapper">
            <image src="../../static/icos/default-face.png" class="face"></image>
        </view>

        <view class="info-wapper">
            <label class="words-lbl">账号</label>
            <input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
        </view>

        <view class="info-wapper" style="margin-top: 40upx;">
            <label class="words-lbl">密码</label>
            <input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
        </view>

        <button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
    </form>
```

```
formSubmit(e){
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    console.log(username, password);

    uni.request({
        url: common.serverURL + 'user/registOrLogin',
        data: {
            "username": username,
            "password": password
        },
        method: "POST",
        success: function(res) {
            if(res.data.data != 200){
                console.log(res.data);

                try {
                    if(username == 'bang' && password == '123456'){
                    	//存储登录用户信息
                        uni.setStorageSync('global-user', {"faceImage":"/static/icos/default-face.png","nickname": username,"id":'124sdaf8sdaf',"sex": 0,"birthday":"1996-02-03"});
                        // 页面跳转
                        uni.switchTab({
                            url: '../me/me'
                        });
                    }else {
                    	//用户登录错误提示
                        uni.showToast({
                            title: "用户名或者密码错误",
                            duration: 2000,
                            image: "../../static/icos/error.png"
                        });
                    }

                } catch (e) {
                    console.log(e);
                }

            }
        }
    });
}
```

#### 2.2 第三方登录功能  小程序(微信)  app端(微信,微博,QQ)

重要的是要有appid, 这个后台做获取好的.

##### (1)小程序(微信)

```
<view class="third-icos-wapper">
    <!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
    <!-- #ifdef APP-PLUS -->
        <image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
        <image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
        <image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
        <button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
        </button>
    <!-- #endif -->
</view>
```

```
wxLogin(e){
    // 微信小程序端的微信登录
    var me = this;
    // console.log(e);
    var userInfo = e.detail.userInfo;
    console.log(userInfo);
    // 实现微信登录
    uni.login({
        provider: 'weixin',
        success: function(result) {
            console.log(result);
            // 获得微信登录的code: 授权码
            var code = result.code;
            console.log(code);//04398J9c1ZwxRz0Ouzbc1Ky4ac198J96

            // 设置登录哪一个对应的微信小程序
            uni.request({
                url: common.serverURL + "stu/mpWXLogin/" + code,
                method: "post",
                data:{
                    "avatarUrl": userInfo.avatarUrl,
                    "nickName": userInfo.nickName,
                    "whichMP": userInfo.whichMP
                },
                success: function(userResult) {
                    console.log(userResult); //data: id:"1903039NB05B4H94"
                    uni.setStorageSync('global-user', {"faceImage":"/static/icos/default-face.png","nickname": "weixin-user","id":'1903039NB05B4H94',"sex": 0,"birthday":"1996-02-03"});
                    // 页面跳转
                    uni.switchTab({
                        url: '../me/me'
                    });
                }
            })
        }
    });
}
```

##### (2)app授权登录 微信 qq  微博

face  nickname  openIdOrUid 获取的方式不相同

```
appOAuthLogin(e) {
    var me = this;
    // 获取用户的登录类型
    var logintype = e.currentTarget.dataset.logintype;
    // 注意要使用appid  测试可以随便填写
    // 授权登录
    uni.login({
        provider: logintype,
        success: function(loginRes){
            // 授权登录以后  获取用户的信息
            console.log(loginRes);
            uni.getUserInfo({
                provider: logintype,
                success: function(info){
                    // 被授权(微信,qq,微博)用户的信息
                    // console.log(JSON.parse(info));
                    var userInfo = info.userInfo; //获取用户信息
                    var face = '';
                    var nickname = '';
                    var openIdOrUid = '';
                    // 拿到后台具体需要的用户信息face nickname  openIdOrUid
                    if(logintype == 'weixin'){
                        face = userInfo.avatarUrl;
                        nickname = userInfo.nickname;
                        openIdOrUid = userInfo.openid;
                    }else if(logintype = 'qq') {
                        face = userInfo.figureurl_qq_2;
                        nickname = userInfo.nickName;
                        openIdOrUid = userInfo.openid;
                    }else if(logintype == 'sinaweibo'){
                        face = userInfo.avator_large;
                        nickname = userInfo.nickName;
                        openIdOrUid = userInfo.id;
                    }
                    // 调用开发者后台
                    uni.request({
                        url: common.serverURL + "appUnionLogin/" + logintype,
                        method: "POST",
                        data: {
                            "face": face,
                            "nickname": nickname,
                            "openIdOrUid": openIdOrUid
                        },
                        success: function(result){
                            if(result.data.status != 200) {
                                console.log(logintype,face,nickname,openIdOrUid);
                                uni.setStorageSync('global-user', {"faceImage":"/static/icos/default-face.png","nickname": "weixin-user","id":'1903039NB05B4H94',"sex": 0,"birthday":"1996-02-03","userUniqueToken": "asdgeg"+ Math.ceil(Math.random()*1000)});
                                // 页面跳转
                                uni.switchTab({
                                    url: '../me/me'
                                });
                            }
                        }
                    })

                }
            });
        }
    });
},
```

### 4.3用户信息页面meInfo.vue

#### (1)获取用户信息并显示, 需要写在onShow中 ,不能写在onLoad中.

```
onShow(){
    // this.globalUser = uni.getStorageSync('global-user');
    // 使用全局挂载
    this.globalUser = this.getGlobalUser('global-user');
},
```

#### (2)清除全部缓存

```
cleanStorage(){
    uni.clearStorage();
    uni.showToast({
        title: "清除缓存成功",
        duration: 1000,
        mask: true
    });
},
```

#### (3)退出登录

```
logout(){
				
    uni.request({
        url: common.serverURL + '/user/logout?userId=' + this.getGlobalUser('global-user').id,
        method: "POST",
        success: (res) => {
            // 获取真实数据之前，务必判断状态是否为200
            if (res.data.status != 200) {
                // 如果服务器返回200，代表用户在服务端退出登录成功
                // console.log(common.serverURL,this.getGlobalUser('global-user').id);
                uni.removeStorageSync("global-user");
                //跳转页面
                uni.switchTab({
                    url: "../me/me"
                });
            }
        }
    });
}
```

#### (4)预览和修改头像功能

4.1预览和上传头像

```
<view class="item-wapper face-line-upbottom" @click="operator">
    <view class="info-words">头像</view>

    <view class="right-wapper">
        <image :src="globalUser.faceImage" class="face"></image>
        <view class="arrow-block">
            <image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
        </view>
    </view>
</view>
```

4.2预览头像和上传头像功能函数

```
operator(){
    var me = this;
    uni.showActionSheet({
        itemList: ["查看我的头像","从相册选择上传"],
        success:function(res){
            if(res.tapIndex == 0){
                var faceArr = [];
                faceArr.push(me.globalUser.faceImage);
                uni.previewImage({
                    urls: faceArr,
                    current: faceArr[0]
                });
            }else if(res.tapIndex ==1) {
                uni.chooseImage({
                    count: 1,
                    sizeType: ["compressed"],
                    sourceType: ["album"],
                    success:function(res){
                        var tempPath = res.tempFilePaths[0];
                        // #ifdef H5
                        uni.navigateTo({
                            url: "../meFace/meFace?tempPath=" + tempPath
                        });
                        // #endif
                        // #ifndef H5
                        uni.navigateTo({
                            url: "../faceCrop/faceCrop?tempPath=" + tempPath
                        });
                        // #endif
                    }
                })

            }
        }
    })
},
```

#### (5)修改用户名功能

5.1点击用户名块 跳转到

```
modifyNick(){
    console.log('修改昵称');
    uni.navigateTo({
        url: '../meNickname/meNickname'
    });
},
```

5.2 meNickname.vue

```
<form
@submit="formSubmitNickname">
    <view class="page-block" style="margin-top: 20rpx;">
        <input type="text" name="nickname"
        class="input"
        placeholder="请输入昵称"
        :value="globalUser.nickname"
        placeholder-class="graywords"
        maxlength="10"/>
    </view>
    <button type="primary" form-type="submit" class="submitBtn">修改</button>
</form>
```

```
//点击修改,获取修改后的用户名
formSubmitNickname(e){
    var me = this;
    var nickname = e.detail.value.nickname;
    // 修改接口
    uni.request({
        url: common.serverURL + "/user/modifyUserinfo",
        data: {
            "userId": me.globalUser.id,
            "nickname": nickname
        },
        header: {
            "headerUserId": me.globalUser.id,
            "headerUserToken": me.globalUser.userUniqueToken
        },
        method: "POST",
        success(res) {

            if ( res.data.status != 200) {
                // 获得最新的用户数据
                // var userInfo = res.data.data;
                // 修改昵称
                me.globalUser.nickname = nickname;
                console.log(me.globalUser);
                uni.setStorageSync("global-user", me.globalUser);
                uni.navigateBack({
                    delta: 1
                });
            } else if (resData.status == 502 || resData.status == 500) {
                uni.showToast({
                    title: res.data.msg,
                    image: "../../static/icos/error.png",
                    duration: 2000
                })
            }
        }
    });
}
```

#### (6)修改生日功能

6.1 点击跳转

```
modifyBirthday(){
    console.log('修改生日');
    uni.navigateTo({
        url: '../meBirthday/meBirthday'
    });
},
```

6.2 meBirthday.vue

```
<form @submit="formSubmitBirthday">	
    <view class="page-block" style="margin-top: 20upx;">
        <picker mode="date" @change="dateChange">
            <view class="birthday">{{birthday}}</view>
        </picker>
    </view>
    <button type="primary" form-type="submit" class="submitBtn">提交</button>	
</form>
```

```
//及时更新修改后的信息
dateChange(e) {
    // 改变显示日期
    this.birthday = e.detail.value;
},
//点击修改处理函数
formSubmitBirthday() {
    var me = this;

    uni.request({
        url: common.serverURL + "/user/modifyUserinfo",
        data: {
            "userId": me.globalUser.id,
            "birthday": me.birthday
        },
        header: {
            "headerUserId": me.globalUser.id,
            "headerUserToken": me.globalUser.userUniqueToken
        },
        method: "POST",
        success(res) {
            var resData = res.data;
            // console.log(typeof(resData));
            if (resData.status != 200) {
                // 获得最新的用户数据
                // var userInfo = resData.data;
                // 修改日期
                me.globalUser.birthday = me.birthday;
                uni.setStorageSync("global-user", me.globalUser);
                uni.navigateBack({
                    delta: 1
                })
            } else if (resData.status == 502 || resData.status == 500) {
                uni.showToast({
                    title: res.data.msg,
                    image: "../../static/icos/error.png",
                    duration: 2000
                })
            }
        }
    });
}
```

(7) 修改性别功能

7.1 点击跳转

```
modifySex(){
    console.log('修改性别');
    uni.navigateTo({
        url: '../meSex/meSex'
    });
},
```

7.2 meSex.vue

```
<form @submit="formSubmitSex">	
    <view class="page-block" style="margin-top: 20upx;">	
        <radio-group class="radio-sex" @change="sexChange">
            <label class="radio-single">
                <radio value="1" :checked="sex == 1"/>男
            </label>
            <label class="radio-single">
                <radio value="0" :checked="sex == 0"/>女
            </label>
        </radio-group>		
    </view>
    <button type="primary" form-type="submit" class="submitBtn">提交</button>
</form>
```

```
//及时获取修改后的性别信息函数
sexChange(e){
    this.sex = e.detail.value;
},
//点击修改处理函数
formSubmitSex(){
    var me = this;	
    uni.request({
        url: common.serverURL + "/user/modifyUserinfo",
        data: {
            "userId": me.globalUser.id,
            "sex": me.sex
        },
        header: {
            "headerUserId": me.globalUser.id,
            "headerUserToken": me.globalUser.userUniqueToken
        },
        method: "POST",
        success(res) {
            var resData = res.data;
            // console.log(typeof(resData));
            if (resData.status != 200) {
                // 获得最新的用户数据
                // var userInfo = resData.data;
                // 修改日期
                me.globalUser.sex = me.sex;
                uni.setStorageSync("global-user", me.globalUser);
                uni.navigateBack({
                    delta: 1
                })
            } else if (resData.status == 502 || resData.status == 500) {
                uni.showToast({
                    title: res.data.msg,
                    image: "../../static/icos/error.png",
                    duration: 2000
                })
            }
        }
    });
}
```













