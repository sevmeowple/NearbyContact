<script>
    import EventLayout from '$lib/components/layout/EventLayout.svelte';
    import Card from '$lib/components/card/Card.svelte';
</script>

<EventLayout title="我承接的事件" switchTo="/main/user/eventCreated">
    <div class="cards">
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