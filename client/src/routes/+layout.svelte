<script lang="ts">
	import '../app.postcss';
	import { slide } from'svelte/transition';
	import { cubicOut } from'svelte/easing';
</script>

<div class="page-transition" transition:slide>
	<slot/>
</div>

<style>
	.page-transition{
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
