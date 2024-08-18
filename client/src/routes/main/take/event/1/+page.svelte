<script>
    import Card from '../../../../../components/Card.svelte';

    // 本地数据
    const cardData = [
        {
            title: "快递",
            price:"免费",
            location: "六号楼近邻宝",
            destination: "六号楼520",
            distance: "2.5km",
            time: "08-18 10:00",
            sex: "男",
            description: "急急急急",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/1"
        },
        {
            
        }
    ];
</script>

<div class="container">
    {#each cardData as card}
        <Card {...card} />
    {/each}
</div>

<style>
    .container {
        display: flex;
        height: auto;
        min-height: 100vh;
        flex-wrap: wrap; /* 允许换行 */
        justify-content: center; /* 水平居中 */
        margin: 0 auto;
        background-color: #ffffff;
        width: 100%;
        min-height: 100vh;
    }
</style>

