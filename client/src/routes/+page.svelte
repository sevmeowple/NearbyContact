<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import type { User } from '$lib/stores/userStore';

	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import * as instance from '$lib/api';
	let userH: User = { username: '', email: '', password: '' };
	let tabSet = 0;

	// 初始化输入框的值
	onMount(() => {
		const user = $userStore;
		userH['username'] = user['username'];
		userH['email'] = user['email'];
		userH['password'] = user['password'];
	});

	async function Login() {
		userStore.set({
			username: userH['username'],
			email: userH['email'],
			password: userH['password']
		});
		let res = await instance.Login(userH);
		// 检查返回状态码
		if (res.status === 200) {
			console.log('登录成功');
			goto('/board');
		}
	}

	async function Register() {
		userStore.set({
			username: userH['username'],
			email: userH['email'],
			password: userH['password']
		});
		let res = await instance.Register(userH);
		// 检查返回状态码
		if (res.status === 201) {
			goto('/board');
		}
	}

	//适配移动端
	function adapt() {
	document.documentElement.style.fontSize = Math.min(screen.width / 20, 20) + 'px';
	}

	onMount(adapt);

</script>


<div class="main">
	<h1 class="h1">Nearby Contanct</h1>
	<div class="tab">
		<TabGroup
			justify="justify-center"
			active="border-b-2 bg-gray-200"
			hover="black hover:bg-gray-100"
		>
			<Tab bind:group={tabSet} name="login" value={0}><span> 登录 </span></Tab>
			<Tab bind:group={tabSet} name="register" value={1}><span> 注册 </span></Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<form class="login" on:submit={Login}>
						<label class="label">
							<span>用户名:</span>
							<input
								required
								minlength="2"
								type="text"
								bind:value={userH.username}
								placeholder="用户名"
							/>
						</label>
						<label class="label">
							<span>密码:</span>
							<input
								required
								minlength="3"
								type="password"
								bind:value={userH.password}
								placeholder="密码"
							/>
						</label>
						<button type="submit">登陆</button>
					</form>
				{:else if tabSet === 1}
					<form class="register" on:submit={Register}>
						<label class="label">
							<span>用户名:</span>
							<input
								required
								minlength="2"
								type="text"
								bind:value={userH.username}
								placeholder="用户名"
							/>
						</label>
						<label class="label">
							<span>邮箱:</span>
							<input
								required
								type="email"
								bind:value={userH.email}
								placeholder="邮箱"
								autocomplete="email"
								minlength="3"
							/>
						</label>
						<label class="label">
							<span>密码:</span>
							<input
								required
								minlength="3"
								type="password"
								bind:value={userH.password}
								placeholder="密码"
							/>
						</label>
						<button type="submit">注册</button>
					</form>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>

<div>
	<a href="/main">123</a>
</div>

<style lang="postcss">
	.tab {
	width: 80%;
	max-width: 600px;
	border: 1px solid #ccc;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin: 0 auto;
	color: #333;
	transition: 0.3s;
	}

	.tab:hover {
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	}
	.h1 {
		position: fixed;
		text-align: center;
		color: #000000;
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
	}
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		padding: 20px;
		background-color: #ffffff;
		height: 100%;
		width: 100%;
	}


	/* button等元素居中 */
	.login,
	.register {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: auto;
	}

	label {
		display: block;
		width: 80%;
		flex-direction: column;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		padding: 0.6rem;
		margin-top: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
		transition: 0.3s;
	}
	input:focus {
		outline: none;
		border: 1px solid #000000;
		border-radius: 6px;
	}

	button {
		@apply btn;
		width: 80%;
		padding: 0.5rem;
		background-color: #000000;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		/* border-radius: 渐变 */
		transition: 0.3s;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	button:hover {
		background-color: #474747;
		border-radius: 10px;
	}
</style>
