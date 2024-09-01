<script>
    import {fly} from "svelte/transition";
</script>

<footer class="navbar">
<<<<<<< HEAD
    <<<<<<< HEAD
    <a class="link" href="/main" transition:fly={{ x: 1000 }}>首页</a>
    <a class="link" href="/main/take/event/fetch" transition:fly={{ x: 1000 }}>承接事件</a>
    <a class="link" href="/main/user/userInfo" transition:fly={{ x: 1000 }}>个人信息</a>
</footer>
=======
<a class="link" href="/main" transition:fly={{ x: 1000 }}>首页</a>
<a class="link" href="/main/take/event/1" transition:fly={{ x: 1000 }}>代取服务</a>
<a class="link" href="/main/take/event/2" transition:fly={{ x: 1000 }}>代买服务</a>
<a class="link" href="/main/take/event/3" transition:fly={{ x: 1000 }}>失物招领</a>
</footer>
>>>>>>> 6dfbe78be80c720ee8a285192883a888c682c4ae
=======
    <a href="/main" transition:fly={{ x: 1000 }} class="link">首页</a>
    <a href="/main/take/event/fetch" transition:fly={{ x: 1000 }} class="link">承接事件</a>
    <a href="/main/user/userInfo" transition:fly={{ x: 1000 }}  class="link">个人信息</a>
 </footer>
>>>>>>> f31195d437448e77c9e180944177c5c594b89084

<style>
    .navbar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #708862;
        color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        z-index: 1000; /* 确保导航栏在其它内容之上 */
    }
<<<<<<< HEAD

    <
    <
    <
    <
    <
    <
    <
    HEAD
    .link {
    = = = = = = = . link {
    >>> >>> > 6 dfbe78be80c720ee8a285192883a888c682c4ae transition: all 0.3 s ease;
=======
 
    .link{
        transition: all 0.3s ease;
>>>>>>> f31195d437448e77c9e180944177c5c594b89084
        text-align: center;
        align-items: center;
        width: 25%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: #708862;
        color: white;
        text-decoration: none;
        font-size: 1em;
        padding-bottom: 5%;
        padding-top: 5%;

    }

        .link:hover {
            background-color: #5c7055;
            cursor: pointer;
        }
</style>