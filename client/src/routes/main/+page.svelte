<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import type { User } from '$lib/stores/userStore';
	import { onMount, onDestroy } from 'svelte';
	let userH: User = { username: '', email: '', password: '' };
	import { fade } from 'svelte/transition';
	import { slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
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

	function Logout() {
		//logout logic here
	}
	// let events = ["代取服务","代买服务","失物招领","二手交易"];
	let events = [
		{ id: 1, name: '代取服务', url: '/event/1' },
		{ id: 2, name: '代买服务', url: '/event/2' },
		{ id: 3, name: '失物招领', url: '/event/3' },
		{ id: 4, name: '二手交易', url: '/event/4' }
	];

	let userInfo = [
		{ id: 1, name: '个人信息', url: '/main/user/userInfo' },
		{ id: 2, name: '我发起的事件', url: '/main/user/eventCreated' },
		{ id: 3, name: '我承接的事件', url: '/main/user/eventTaken' },
	];

	let show = true;
	let i = 0;
	let j = 0;
	let p = 0;

	function showEventOfTake() {
		i == 0 ? (i = 4) : (i = 0);
        if(j==4){
            j = 0;
        }

        if(p==3){
            p = 0;
        }
	}

	function showEventOfCreate() {
		j == 0 ? (j = 4) : (j = 0);
        if(i==4){
            i = 0;
        }

        if(p==3){
            p = 0;
        }
	}

	function showUserInfo() {
		p == 0 ? (p = 3) : (p = 0);
        if(i==4){
            i = 0;
        }

        if(j==4){
            j = 0;
        }
	}
</script>

<div class="main" transition:slide>
	<div class="header">
		<!-- <span>{userH.username}</span><br />
		<span>{userH.email}</span><br />
		<span>{userH.password}</span><br /> -->
		<img src="https://via.placeholder.com/150" class="avatar" alt="Avatar">
		<div class="header-user">
			<span class="username">{userH.username}</span>
			<span class="email">{userH.email}</span>
		</div>
		<button class="logout" on:click={Logout}>Logout</button>
	</div>

	<div class="createEvent">
		<h1 on:click={showEventOfCreate}>Create Event</h1>
		<input
			type="range"
			name=""
			id=""
			bind:value={j}
			max="4"
			min="0"
			step="4"
			style="width: 5%; display: none;"
		/>
		<div style="text-align: center;">
			{#if show}
				{#each events.slice(0, j) as event}
					<div class="showEvent" transition:slide style="pointer: cursor;">
						<a href="/main/create{event.url}">{event.name}</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="takeEvent">
		<h1 on:click={showEventOfTake}>Take Event</h1>
		<input
			type="range"
			name=""
			id=""
			bind:value={i}
			max="4"
			min="0"
			step="4"
			style="width: 5%; display: none;"
		/>
		<div style="text-align: center;">
			{#if show}
				{#each events.slice(0, i) as event}
					<div class="showEvent" transition:slide style="pointer: cursor;">
						<a href="/main/take{event.url}">{event.name}</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="userInfo">
		<h1 on:click={showUserInfo}>User Info</h1>
		<input
			type="range"
			name=""
			id=""
			bind:value={p}
			max="3"
			min="0"
			step="3"
			style="width: 5%; display: none;"
		/>
		<div style="text-align: center;">
			{#if show}
				{#each userInfo.slice(0, p) as info}
					<div class="showEvent" transition:slide style="pointer: cursor;">
						<a href={info.url}>{info.name}</a>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="bottom">
		<h1>
			sth
		</h1>
	</div>
</div>

<style lang="postcss">
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		padding: 0.5rem;
		background-color: #7e7e7e;
		height: 100%;
		width: 100%;
		//color: black;
		background-size: cover;
        
	}
	.header,
	.createEvent,
	.takeEvent,
	.userInfo,
	.bottom
	{
		/* flex:1; */
		justify-content: center;
		align-items: center;
		/* padding: 0.5rem 0.5rem 0.5rem 10rem; */
		/* background-color: #708862; */
		border: 1px solid gray;
	}
	.showEvent {
		padding: 0.5em 0;
		border-top: 1px solid #eee;
		background-color: #607952;
	}

	h1 {
		font-size: 1.5rem;
		color: #ffffff;;
		padding: 1rem;
		margin: 0.5rem;
		cursor: pointer;
		text-align: center;
	}

	.header{
		display: flex;
		justify-content: space-around;
		border-radius: 10px 10px 0 0;
		padding:0.5rem ;
        background-color: #3f5831;
        
	}

	

	.avatar{
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		border-width: 1px;
		border-color: white;
		border-style: solid;
		
		margin-right: 1rem;
		box-shadow: 0 0 5px rgba(0,0,0,0.3);
	}
	.header-user{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.username{
		font-size: 1.5rem;
	}

	.email{
		font-size: 0.8rem;
		color: gray;
		margin-top: 0;
	}

	.logout{
		background-color: #337C6B;
		color: white;
		padding: 0.4rem 0.8rem;
		border-radius: 20px;
		border: none;
		cursor: pointer;
		font-size: 0.8rem;
		box-shadow: 0 0 5px rgba(0,0,0,0.3);
	}

    .createEvent{
        background-color:#4a673a ;
    }

    .takeEvent{
        background-color: #547642;
    }

    .userInfo{

        background-color: #547846;
    }
    
    .bottom{
		border-radius: 0 0 10px 10px;
        background-color: #5a7d46;
	}

</style>



