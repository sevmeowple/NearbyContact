<script>
    // 本地数据
    const cardData = [
        {
            title: "外卖",
            description: "中区的外卖柜",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/1"
        },
        {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        },
        {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        }, {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        }, {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        }, {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        }, {
            title: "肥西路",
            description: "清补凉",
            imageUrl: "https://via.placeholder.com/150",
            link: "https://example.com/2"
        }
        // 添加更多卡片数据
    ];
</script>

<div class="container">
    {#each cardData as card}
        <div class="card">
            <img src={card.imageUrl} alt={card.title}/>
            <div class="card-content">
                <h2 class="card-title">{card.title}</h2>
                <p class="card-description">{card.description}</p>
                <a class="card-link" href={card.link}>接收</a>
            </div>
        </div>
    {/each}
</div>


<style>
    .container {
        display: flex;
        flex-wrap: wrap; /* 允许换行 */
        justify-content: center; /* 水平居中 */
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        width: 100%;
    }

    .card {
        flex: 1 1 calc(50% - 40px); /* 每个卡片占1/3宽度，减去间距 */
        display: flex;
        flex-direction: column; /* 设置为垂直排列 */
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        margin: 20px;
    }

    .card img {
        width: 100%; /* 图片宽度占满父容器 */
        height: auto; /* 高度自动调整 */
    }

    .card-content {
        padding: 16px;
        text-align: center; /* 文字居中 */
    }

    .card-title {
        font-size: 1.25rem;
        margin: 0 0 8px 0;
    }

    .card-description {
        font-size: 1rem;
        color: #666;
        margin: 0 0 16px 0;
    }

    .card-link {
        display: inline-block;
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
    }

    .card-link:hover {
        background-color: #0056b3;
    }
</style>
