<script>
    import EventLayout from '$lib/components/layout/EventLayout.svelte';
    import Card from '$lib/components/card/Card.svelte';
</script>

    <EventLayout title="我发起的事件" switchTo = "/main/user/eventTaken">
        <div class="sort">
            <span>筛选方式</span>
        </div>
        <div class="cards">
            <Card title="事件标题" description="事件描述" />
            <Card title="事件标题" description="事件描述" />
            <Card title="事件标题" description="事件描述" />
            <Card title="事件标题" description="事件描述" />
            <Card title="事件标题" description="事件描述" />
            <Card title="事件标题" description="事件描述" />
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