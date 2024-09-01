<script>
    import EventLayout from '$lib/layout/EventLayout.svelte';
    import Card from '$lib/card/Card_1.svelte';
</script>

<EventLayout switchTo="/main/user/eventTaken" title="我发起的事件">
    <div class="sort">
        <span>筛选方式</span>
    </div>
    <div class="cards">
        <Card description="事件描述" title="事件标题"/>
        <Card description="事件描述" title="事件标题"/>
        <Card description="事件描述" title="事件标题"/>
        <Card description="事件描述" title="事件标题"/>
        <Card description="事件描述" title="事件标题"/>
        <Card description="事件描述" title="事件标题"/>
    </div>
</EventLayout>

<style>
    .cards {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>