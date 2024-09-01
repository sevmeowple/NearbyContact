<script>
    export let title;
    export let fee;
    export let location;
    export let destination;
    export let distance;
    export let time;
    export let sex;
    export let description;
    export let imageUrl;
    export let link;
    export let price;
</script>

<div class="card">
    <div class="card-top">
        <div class="card-content1">
            <img alt="{title}" src="{imageUrl}">
            <div class="card-title">
                <h2>{title}</h2>
            </div>
            <div class="card-price">
                <p>价格：{price}</p>
            </div>
        </div>

        <div class="card-content2">
            <div class="card-insider">
                <p class="card-fee">代取费:<br> {fee}</p>
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
    <div class="card-bottom">
        <p class="card-description">具体描述：{description}</p>
        <a class="card-link" href="{link}">接收</a>
    </div>
</div>

<style>
    .card {
        width: 100%;
        display: flex;
        flex-direction: column; /* 改为列布局 */
        align-items: center;
        border-radius: 10px;
        margin-top: 5%;
        margin-bottom: 5%;
        overflow: hidden;
    }

    .card-top {
        display: flex;
        flex-direction: row; /* 行布局 */
        width: 100%; /* 宽度占满父容器 */
    }

    .card-bottom {
        height: 100%;
        width: 100%; /* 宽度占满父容器 */
        background-color: #f2f2f2;
        text-align: center; /* 文字居中 */
        flex-direction: column; /* 列布局 */
    }


    .card-content1 {
        height: 100%;
        width: 36%;
        background-color: #708862;
        border-right: #eee 0.1em solid;
        margin-bottom: 0;
    }

    .card img {
        width: 100%; /* 图片宽度占满父容器 */
        height: auto; /* 高度自适应 */

    }

    .card-title {
        width: 100%;
        display: flex;
        flex-direction: column; /* 列布局 */
        justify-content: center;
        align-items: center;
        background-color: #708862;
        text-align: center; /* 文字居中 */
        backdrop-filter: blur(20px); /* 毛玻璃效果 */
        margin-top: 0;
        margin-bottom: 0;
        padding-top: 1.5em;
        padding-bottom: 1.5em;

    }

    .card-price {
        width: 100%;
        display: flex;
        flex-direction: column; /* 列布局 */
        justify-content: center;
        align-items: center;
        background-color: #708862;
        text-align: center; /* 文字居中 */
        margin-top: 0;
        margin-bottom: 0;
        padding-bottom: 0.2em;
        padding-top: 0.2em;
        border-top: #eee 0.1em solid;
    }


    .card-content2 {
        width: 64%;
        background-color: #708862;
        padding: 8px;
        text-align: center; /* 文字居中 */
        backdrop-filter: blur(20px); /* 毛玻璃效果 */
    }


    .card-insider {
        display: flex;
        flex-direction: row; /* 列布局 */
        align-items: center;
        height: 33.33%;
    }


    .card-fee,
    .card-location,
    .card-destination,
    .card-time,
    .card-sex,
    .card-distance {
        width: 50%;
        font-size: small;
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
        font-size: small;
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