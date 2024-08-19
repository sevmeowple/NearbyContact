<!-- 我创建的事件和我承接的事件布局模板 -->
<script>
    export let title = "默认的事件标题";
    export let className = "Layout"
</script>

<div class="{className}">
    <header>
        <h1>{title}</h1>
    </header>

    <main>
        <slot></slot>//显示具体的内容
    </main>
    <footer>
        <p>©2021 NearbyContact</p>
    </footer>
</div>

<style>
   .Layout {
        display:flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10% 0px 10% 0px;
        background-color: #f5f5f5;
    }

    header, footer{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: #333;
        color:white;
        padding: 1rem;
        z-index: 1;
    }

    header{
        height: 10%;
        border-radius: 20px 20px 0 0;
        position:absolute;
        top: 0;
        left: 0;
    }


    footer{
        height: 10%;
        border-radius: 0 0 20px 20px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    main{
        flex: 1;
        width: 100%;
        overflow-y: auto;
        padding: 10% 0px 10% 0px;
        background-color: rgb(70, 70, 70);
    }

</style>