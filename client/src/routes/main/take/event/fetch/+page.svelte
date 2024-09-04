<script lang="ts">
    import Card from '$lib/card/Card_1.svelte';
    import Navbar from "$lib/navbar/Navbar1.svelte";
    import Nav from "$lib/nav/Nav1.svelte";
    // 本地数据

    const cardData = [
        {
        < <<<<<< HEAD
            < <<<<<< HEAD
    :
    client / src / routes / main / take / event / fetch / +page.svelte
    id:2,
    ======
    =
        id
    :
    1,
    >>>>>>>
    6
    dfbe78be80c720ee8a285192883a888c682c4ae:client / src / routes / main / take / event / 1 / +page.svelte
    title: "卫生巾",
        price
    :
    "10",
        fee
    :
    "免费",
        location
    :
    "六号楼近邻宝",
        destination
    :
    "六号楼520",
        distance
    :
    "2.5km",
        time
    :
    "08-18 10:00",
        sex
    :
    "男",
        description
    :
    "急急急急",
        imageUrl
    :
    "https://via.placeholder.com/150",
        link
    :
    "https://example.com/1"
    },
    {
        <<<<<<< HEAD
    :
        client / src / routes / main / take / event / fetch / +page.svelte
        id:2,
    ======
        =
            id
    :
        1,
    >>>>>>>
        6
        dfbe78be80c720ee8a285192883a888c682c4ae:client / src / routes / main / take / event / 1 / +page.svelte
        title: "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
    }
    ,
    {
        <<<<<<< HEAD
    :
        client / src / routes / main / take / event / fetch / +page.svelte
        id:2,
    ======
        =
            id
    :
        1,
    >>>>>>>
        6
        dfbe78be80c720ee8a285192883a888c682c4ae:client / src / routes / main / take / event / 1 / +page.svelte
        title: "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
        << <<<<< HEAD
    :
        client / src / routes / main / take / event / fetch / +page.svelte
    }
    ,
    {
        id:2,
    ======
        =
    }
    ,
    {
        id: 1,
    >>>>>>>
        6
        dfbe78be80c720ee8a285192883a888c682c4ae:client / src / routes / main / take / event / 1 / +page.svelte
        title: "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
    }
    ]
    ;
    ======
    =
        id
    :
    2,
        title
    :
    "卫生巾",
        price
    :
    "10",
        fee
    :
    "免费",
        location
    :
    "六号楼近邻宝",
        destination
    :
    "六号楼520",
        distance
    :
    "2.5km",
        time
    :
    "08-18 10:00",
        sex
    :
    "男",
        description
    :
    "急急急急",
        imageUrl
    :
    "https://via.placeholder.com/150",
        link
    :
    "https://example.com/1"
    },
    {
        id:2,
            title
    :
        "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
    }
    ,
    {
        id:2,
            title
    :
        "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
    }
    ,
    {
        id:2,
            title
    :
        "黑神话礼盒",
            price
    :
        "15",
            fee
    :
        "免费",
            location
    :
        "七号楼近邻宝",
            destination
    :
        "七号楼520",
            distance
    :
        "3.5km",
            time
    :
        "08-18 11:00",
            sex
    :
        "女",
            description
    :
        "不急不急",
            imageUrl
    :
        "https://via.placeholder.com/150",
            link
    :
        "https://example.com/2"
    }
    ]
    ;
    >>>>>>>
    f31195d437448e77c9e180944177c5c594b89084
</script>

<Nav/>
<div class="container">
    {#each cardData as card}
        <Card {...card}/>
    {/each}
</div>
<Navbar/>


<style>
    .page {
        width: 100%;
        overflow-x: hidden;
    }

    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        width: 100%;
        justify-content: flex-start;
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 10%;
        padding-bottom: 20%;
    }

</style>
 

