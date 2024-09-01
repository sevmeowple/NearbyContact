<!-- 我创建的事件和我承接的事件布局模板 -->
<script>
    export let title = "默认的事件标题";
    export let className = "Layout"

    export let switchTo = "/main";

</script>

<div class="{className}">
    <header>
        <a class="return" href="/main">返回主页</a>
        <h1>{title}</h1>
        <a class="switch" href="{switchTo}">切换</a>
    </header>

    <main>
        <slot></slot>
        //显示具体的内容
    </main>
    <footer>
        <p>©2024 NearbyContact</p>
    </footer>
</div>

<style>
    .Layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10% 0px 10% 0px;
        background-color: #547642;
    }

    header, footer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #333;
        color: white;
        padding: 1rem;
        z-index: 1;
    }

<<<<<<< HEAD
    header{
        display: flex;
=======
    header {
>>>>>>> 6dfbe78be80c720ee8a285192883a888c682c4ae
        height: 10%;
        border-radius: 20px 20px 0 0;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #5e8449
    }

    .return{
        position: absolute;
        left: 1rem;
        font-size: small;
        pointer: cursor;
    }

    .switch{
        position:absolute;
        right:1rem;
        font-size: small;
        pointer: cursor;
    }
    


<<<<<<< HEAD
    footer{
        display: flex;
        flex-direction: column;
=======
    footer {
>>>>>>> 6dfbe78be80c720ee8a285192883a888c682c4ae
        height: 10%;
        border-radius: 0 0 20px 20px;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #5e8449;
    }

<<<<<<< HEAD
    .footer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 1rem;
        margin-top:1rem;
    }

    main{
=======
    main {
>>>>>>> 6dfbe78be80c720ee8a285192883a888c682c4ae
        flex: 1;
        width: 100%;
        overflow-y: auto;
        padding: 10% 0px 10% 0px;
        background-color:#6b9654;
    }

</style>