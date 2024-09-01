<script>
    import {fly} from "svelte/transition";
</script>

<footer class="navbar">
    <a href="/main" transition:fly={{ x: 1000 }} class="link">首页</a>
    <a href="/main/take/event/fetch" transition:fly={{ x: 1000 }} class="link">代取服务</a>
    <a href="/main/create/event" transition:fly={{ x: 1000 }} class="create">+</a>
    <a href="/main/take/event/buy" transition:fly={{ x: 1000 }}  class="link">代买服务</a>
    <a href="/main/take/event/lost" transition:fly={{ x: 1000 }}  class="link">失物招领</a>
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
    .create{
        transition: all 0.3s ease;
        text-align: center;
        align-items: center;
        width: 15%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: #fdfffc;
        color: #708862;
        text-decoration: none;
        font-size: 2em;
        padding-bottom:6%;
        padding-top: 5%;
        border: #737373 0.1em solid;
        border-radius: 100px;
    }

    .link{
        transition: all 0.3s ease;
        text-align: center;
        align-items: center;
        width: 20%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: #708862;
        color: white;
        text-decoration: none;
        font-size: 1em;
        padding-bottom: 5%;
        padding-top: 5%;
        font-size: small;

    }

    .link:hover {
        background-color: #5c7055;
        cursor: pointer;
    }
</style>