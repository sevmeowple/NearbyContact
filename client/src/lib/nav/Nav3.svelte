<script>
    import { fly } from 'svelte/transition';
</script>
<head class="nav">
	<h1 transition:fly={{ x: 1000 }}>失物招领</h1>
</head>
<style>

    .nav {
        font-size: 1.2em;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #708862;
        color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 0;
        z-index: 1000; /* 确保导航栏在其它内容之上 */

    }
</style>