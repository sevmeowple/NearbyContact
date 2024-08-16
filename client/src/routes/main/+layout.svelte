

<div class="container">
    <!-- 内容 -->
    <div class="content">
        
        <!-- 动态侧边栏 -->
        <div class="content-left">
            <!-- 信息 -->
            <div class="info">
                <h1>个人信息</h1>
            </div>

            <div class="seg"></div>
            
            <!-- 导航 -->
            <div class="nav">
                
                <div class="nav-menu">
                    <div class="title">主页</div>
                </div>

                <div class="seg"></div>

                <div class="nav-menu">
                    <div class="title">发起请求</div>
                </div>

                <div class="seg"></div>

                <div class="nav-menu">
                    <div class="title">接收请求</div>

                    <div class="seg"></div>

                    <div class="subtitle"><a href="#">外卖代取</a></div>

                    <div class="subseg"></div>

                    <div class="subtitle"><a href="#">快递代取</a></div>

                    <div class="subseg"></div>

                    <div class="subtitle"><a href="#">肥西路代买</a></div>

                    <div class="subseg"></div>

                    <div class="subtitle"><a href="#">二手市场交易</a></div>
                </div>

                <div class="seg"></div>

                <div class="nav-menu">
                    <div class="title">个人中心</div>

                    <div class="seg"></div>

                    <div class="subtitle"><a href="#">我发起的请求</a></div>

                    <div class="subseg"></div>

                    <div class="subtitle"><a href="#">我承接的请求</a></div>

                    <div class="subseg"></div>

                    <div class="subtitle"><a href="#">我的信息</a></div>

                </div>
            </div>
        </div>
        
        <!-- 主要内容 -->
        <div class="content-right">
            <h1>这是主要内容</h1>
        </div>
    <div>
</div>

<style>
    * {
  margin: 0;
  padding: 0;
}

.container {
    max-width: 100%;
    max-height: 100%;
    margin: 0 0 0 0;
    padding: 0px;
    color: #000000;
    background-color: #ffffff;
  }

  .header {
    background-color: #000000;
    color: #fff;
    height: 10%;
    width: 100%;
    line-height: 50px;
  }

.content {
    height: 90%;
    width: 100%;
}

.content-left {
    height: 800px;
    width: 25%;
    float: left;
    background-color: #1b1b1b;
}
.content-right {
    height: 800px;
    width: 75%;
    float: right;
    background-color: #f2f2f2;
}

.info {
    height: 100px;
    width: 100%;
    color: #ffffff;
}

.seg{
    height: 1px;
    background-color: #f2f2f2;
}

.subseg{
    height: 1px;
    background-color: #e7e7e7;

}

.nav {
    margin-top: 10px;
}



.title{
    height: 40px;
    width: 100%;
    color: white;
    text-align: center;
    line-height:40px;
    /* 鼠标滑过，鼠标手型*/
    cursor: pointer;
}

.subtitle{
    width: 100%;
    height: 100%;
    background-color: #4f4f4f;
}

.subtitle>a{
    display: block;
    height: 30px;
    width: 100%;
    color: rgb(222, 222, 222);
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
}

.subtitle>a:hover{
    display: block;
    height: 30px;
    width: 100%;
    color: rgb(255, 255, 255);
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    background-color: #333333;
    transition: .4s;
}
</style>

<slot></slot>