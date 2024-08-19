<script>
    import { fly } from "svelte/transition";
</script>

<footer class="navbar">
    <a href="/main" transition:fly={{ x: 1000 }} class="link">首页</a>
    <a href="/main/take/event/1" transition:fly={{ x: 1000 }} class="link">代取服务</a>
    <a href="/main/take/event/2" transition:fly={{ x: 1000 }}  class="link">代买服务</a>
    <a href="/main/take/event/3" transition:fly={{ x: 1000 }}  class="link">失物招领</a>
 </footer>

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

 
    .link{
        transition: all 0.3s ease;
        text-align: center;
        align-items: center;
        width: 25%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: #708862;
        color: white;
        text-decoration: none;
        font-size: 1em;
        padding-bottom:5%;
        padding-top: 5%;
        border-left: #737373 0.1em solid;

    }

    .link:hover{
        background-color: #5c7055;
        cursor: pointer;
    }
</style>