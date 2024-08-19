<script>
    export let title;
    export let price;
    export let location;
    export let destination;
    export let distance;
    export let time;
    export let sex;
    export let description;
    export let imageUrl;
    export let link;
</script>

    <div class="card">
        <div class="card-top">
            <img src="{imageUrl}" alt="{title}">
            <div class="card-content1">
                <div class="card-insider">
                    <p class="card-price">代取费:<br> {price}</p>
                    <p class="card-location">出发地：<br>{location}</p>
                </div>
                <div class="card-insider">
                    <p class="card-distance">距离:<br> {distance}</p>
                    <p class="card-destination">目的地: <br>{destination}</p>
                </div>
                <div class="card-insider">
                    <p class="card-time">发起时间: <br>{time}</p>
                    <p class="card-sex">性别要求:<br> {sex}</p>
                </div>
                

            </div>
        </div>
        <div class="card-content2">
            <p class="card-description">具体描述：{description}</p>
            <a href="{link}" class="card-link">接收</a>
        </div>
    </div>

<style>
    .card {
        width: 95%;
        display: flex;
        flex-direction: column; /* 改为列布局 */
        align-items: center;
        border-radius: 15px;
        margin: 5% 5% 5% 5%; 
        border:white 1px solid;

    }

    .card-top {
        display: flex;
        flex-direction: row; /* 行布局 */
        width: 100%; /* 宽度占满父容器 */
    }

    .card img {
        object-fit: cover;
        width: 35%; /* 图片宽度占满父容器 */
        height: auto; /* 高度自适应 */
        border-radius: 15px 15px 0 0; /* 圆角 */
    }

    .card-content1 {
        width: 65%;
        background-color: #708862;
        padding: 8px;
        text-align: center; /* 文字居中 */
        backdrop-filter: blur(20px); /* 毛玻璃效果 */
        border-radius: 0 15px 0 0; /* 圆角 */
    }
    
    .card-content2 {
        height: 100%;
        width: 100%; /* 宽度占满父容器 */
        background-color: #f2f2f2;
        text-align: center; /* 文字居中 */
        flex-direction: column; /* 列布局 */
    }

    .card-insider{
        display: flex;
        flex-direction: row ; /* 列布局 */
        align-items: flex-start;

    }


    .card-price,
    .card-location,
    .card-destination,
    .card-time,
    .card-sex,
    .card-distance

    {   
        width: 50%; 
        font-size:small;
        border-radius: 8px 8px 8px 8px; /* 圆角 */
        text-align: left;
        padding: 0.4em 0.4em 0.4em 0.4em;
        margin: 0.4em 0.4em 0.4em 0.4em;
		border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
		background-color: #819c71;
    }
    .card-description {
        width: 100%;
        font-size:small;
        padding: 0.5em 0.5em 0.5em 0.5em;
        text-align: left;
		border-top: 1px solid #eee;
		background-color: #819c71;
    }

    .card-link {
        justify-content: right;
        width: 100%;
        display: inline-block;
        padding: 0.5em 0.5em 0.5em 0.5em;
        background-color: rgb(113, 169, 142);
        color: white;
        text-decoration: none;
        
    }

    .card-link:hover {
        width: 100%;
        background-color: #526f3d;

    }
</style>
