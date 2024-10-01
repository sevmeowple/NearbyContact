<script lang="ts">
	import type { User } from '$lib/stores/userStore';
	import { userStore } from '$lib/stores/userStore';
	import { onDestroy, onMount } from 'svelte';

	let userH: User = { username: '', email: '', password: '' };
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
</script>

<div class="main">
	<span>{userH.username}</span>
	<span>{userH.email}</span>
	<span>{userH.password}</span>
</div>

<style lang="postcss">
    .main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        height: 100%;
        width: 100%;
        color: black;
    }
</style>
