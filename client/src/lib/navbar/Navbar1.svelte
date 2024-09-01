<script>
    import {fly} from "svelte/transition";
</script>

<footer class="navbar">
    <<<<<<< HEAD
    <a class="link" href="/main" transition:fly={{ x: 1000 }}>首页</a>
    <a class="link" href="/main/take/event/buy" transition:fly={{ x: 1000 }}>代买服务</a>
    <a class="create" href="/main/create/event" transition:fly={{ x: 1000 }}>+</a>
    <a class="link" href="/main/take/event/lost" transition:fly={{ x: 1000 }}>失物招领</a>
    <a class="link" href="/main/take/event/trade" transition:fly={{ x: 1000 }}>二手交易</a>
</footer>
=======
<a class="link" href="/main" transition:fly={{ x: 1000 }}>首页</a>
<a class="link" href="/main/take/event/2" transition:fly={{ x: 1000 }}>代买服务</a>
<a class="create" href="/main/create/event/1" transition:fly={{ x: 1000 }}>+</a>
<a class="link" href="/main/take/event/3" transition:fly={{ x: 1000 }}>失物招领</a>
<a class="link" href="/main/take/event/4" transition:fly={{ x: 1000 }}>二手交易</a>
</footer>
>>>>>>> 6dfbe78be80c720ee8a285192883a888c682c4ae

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

    .create {
        transition: all 0.3s ease;
        text-align: center;
        align-items: center;
        width: 15%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: #fdfffc;
        color: #708862;
        text-decoration: none;
    < < < < < < < HEAD font-size: 1.8 em;
        padding-bottom: 6%;
    = = = = = = = font-size: 2 em;
        padding-bottom: 6%;
    >>> >>> > 6 dfbe78be80c720ee8a285192883a888c682c4ae padding-top: 5 %;
        border: #737373 0.1em solid;
        border-radius: 100px;
    }

    .link {
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