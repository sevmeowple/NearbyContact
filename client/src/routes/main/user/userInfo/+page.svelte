<script lang="ts">
    import type {User} from '$lib/stores/userStore';
    //sth
    import {userStore} from '$lib/stores/userStore';
    import {onDestroy, onMount} from 'svelte';
    import {slide} from 'svelte/transition';

    let userH: User = {username: '', email: '', password: ''};

    onMount(() => {
        const user = $userStore;
        userH.username = user.username;
        userH.email = user.email;
        userH.password = user.password;
    });
    onDestroy(() => {
        userStore.set({
            username: userH.username,
            email: userH.email,
            password: userH.password
        });
    });

    function Edit() {
        //sth 不知道怎麽实现将两个页面的数据同步，这里仅仅是实现了页面跳转
        window.location.href = "/main/user/userInfo/edit";
    }

    let activeTab = "发起"//默认显示发起的事件
    let eventUrl = "/main/user/eventCreated"

    function changeTab(tab: string) {
        activeTab = tab;
        if (activeTab == "发起") {
            eventUrl = "/main/user/eventCreated"
        } else {

            eventUrl = "/main/user/eventTaken"
        }
    }
</script>

<div class="container" transition:slide>
    <div class="commonInfo">
        <img alt="Avatar" class="avatar" src="https://via.placeholder.com/150">
        <div class="user">
            <span class="username">USERNAME{userH.username}</span>
            <span class="email">example@Program.com{userH.email}</span>
        </div>
        <button class="editButton" on:click={Edit}>Edit</button>
    </div>

    <div class="detailInfo">
        <div class="infoI">
            <span>学号:PB2311697</span>
            <span>QQ:123456789</span>
            <span>电话:13812345678</span>
        </div>
        <div class="infoII">
            <span>性别:男</span>
            <span>地址:中区五号楼618宿舍</span>
        </div>
    </div>

    <div class="event">
        <div class="eventTitle">
            <span
                    class:active="{activeTab == '发起'}" on:click={() => changeTab("发起")}>
            我发起的事件
            </span>

            <span
                    class:active="{activeTab == '承接'}" on:click={() => changeTab("承接")}>
                我承接的事件
            </span>
        </div>
        <div class="eventContent">
            <iframe class="eventUrl" frameborder="0" src="{eventUrl}">Event</iframe>
        </div>
    </div>

    <div class="footer">
        <span><a href="/main">Home</a></span>
        <span><a href="/main/user/eventCreated">Event Created</a></span>
        <span><a href="/main/user/eventTaken">Event Taken</a></span>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
        width: 100%;
        height: 100%;
        padding: 1rem;
        background: linear-gradient(to bottom, #708862 50%, #3f5831 100%);
    }

    .commonInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #3f5831;
        padding: 1rem;
        border-radius: 20px 20px 0px 0px;
    }

    .avatar {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border-width: 1px;
        border-color: white;
        border-style: solid;

        margin-right: 1rem;
        margin-left: 1.5rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        color: white;
    }

    .email {

        font-size: 0.8rem;
        color: white;
    }

    .editButton {
        width: 4rem;
        height: 2rem;
        background-color: #337C6B;
        color: white;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        font-size: 0.8rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }

    .detailInfo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: #4a673a;
        padding: 1rem;
        /* font-size: 0.8rem; */
    }

    .infoI {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-right: 15px;
    }

    .infoII {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .event {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 60%;
        /* justify-content: center; */
        background-color: #547642;
        padding: 1rem;
    }

    .eventTitle {
        display: flex;
        justify-content: space-around;
    }

    .eventTitle span {
        font-size: 1rem;
        color: white;
        cursor: pointer;
        flex: 1;
        text-align: center;
        margin: 0.5rem 1rem;
    }

    .eventTitle span.active {
        text-decoration: underline;
        text-underline-offset: 10px;
        text-decoration-color: white;
        text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.8);
    }

    .eventContent {
        display: flex;
        justify-content: center;
        /* align-items: center; */
        height: 100%;
        width: 100%;
    }

    .eventUrl {
        margin: 0.5rem;
        border-radius: 15px;
        width: 100%;
        height: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #5d8048;
        padding: 1rem;
        border-radius: 0px 0px 20px 20px;
    }
</style>