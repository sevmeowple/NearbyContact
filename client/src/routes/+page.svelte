<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	import type { User } from '$lib/stores/userStore';

	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';

	import * as instance from '$lib/api';
	let userH: User = { username: '', email: '', password: '' };
	let tabSet = 0;

	// 初始化输入框的值
	onMount(() => {
		const user = $userStore;
		userH.username = user.username;
		userH.email = user.email;
		userH.password = user.password;
	});

	function Login() {
		userStore.set({
			username: userH.username,
			email: userH.email,
			password: userH.password
		});
		instance.Login(userH);
	}

	function Register() {
		userStore.set({
			username: userH.username,
			email: userH.email,
			password: userH.password
		});
		instance.Register(userH);
	}
</script>

<div class="main">
	<div class="tab">
		<TabGroup>
			<Tab bind:group={tabSet} name="login" value={0}><span> 登录 </span></Tab>
			<Tab bind:group={tabSet} name="register" value={1}><span> 注册 </span></Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="login">
						<label class="label">
							<span>用户名:</span>
							<input type="text" bind:value={userH.username} placeholder="用户名" />
						</label>
						<label class="label">
							<span>密码:</span>
							<input type="password" bind:value={userH.password} placeholder="密码" />
						</label>
						<button on:click={Login}>登陆</button>
					</div>
				{:else if tabSet === 1}
					<div class="register">
						<label class="label">
							<span>用户名:</span>
							<input type="text" bind:value={userH.username} placeholder="用户名" />
						</label>
						<label class="label">
							<span>邮箱:</span>
							<input
								type="email"
								bind:value={userH.email}
								placeholder="邮箱"
								autocomplete="email"
							/>
						</label>
						<label class="label">
							<span>密码:</span>
							<input type="password" bind:value={userH.password} placeholder="密码" />
						</label>
						<button on:click={Register}>注册</button>
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>

<style lang="postcss">
	.tab {
		width: 30%;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	.main {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		padding: 20px;
	}

	label {
		margin-bottom: 10px;
	}

	input {
		width: 100%;
		padding: 8px;
		margin-top: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}
</style>
