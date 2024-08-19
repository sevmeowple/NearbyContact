
<div class="container">
    <header>
        <div>编辑用户信息</div>
    </header>

    <main>
        <div>sth here</div>
    </main>

    <footer>
        <button type="submit">保存</button>
    </footer>
    
</div>

<style>
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background:linear-gradient(to bottom, #708862 50%, #3f5831 100%);
    }

    header{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10%;
        background-color:#3f5831;
        border-radius: 20px 20px 0px 0px;
    }

    footer{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 10%;
        background-color:#3f5831;
        border-radius: 0 0 20px 20px ;
    }

    main{
        display: flex;
        width: 100%;
        height: 70%;
        background-color: #5e7452;
    }
</style>