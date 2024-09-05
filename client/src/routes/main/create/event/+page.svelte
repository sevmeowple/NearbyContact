<script lang="ts">
    import * as instance from '$lib/api';
    import Nav1 from '$lib/nav/Navcreate.svelte';
    import Navbarcreate from '$lib/navbar/Navbarcreate.svelte';

    type EventCreate = {
        name: string;  //名称
        date: string;  //日期
        type: string;  //类型
        description: string; //描述
        images: FileList; //图片
        fee: number;  //代取费
        location: string;  //代取点
        destination: string;  //送达点
        distance: number;  //距离
        time: string;    //截止时间
        info: string;    //其他信息
    };

    let eventCreate: EventCreate = {
        name: '',  //名称
        date: '',  //日期
        type: '',  //类型
        description: '', //描述
        images: [] as unknown as FileList, //图片
        fee: 0, //代取费
        location: '',  //;  //代取点
        destination: '',    //送达点
        distance: 0,  //距离
        time: '',    //截止时间
        info: '',    //其他信息
    };


    let errorMessage = '';
    let successMessage = '';

    function generateDescription(eventCreate: EventCreate) {
        if (eventCreate.type === '代取服务') {
            return `
          代取费: ${eventCreate.fee}
          代取点: ${eventCreate.location}
          送达点: ${eventCreate.destination}
          距离: ${eventCreate.distance}
          截止时间: ${eventCreate.time}
          其他信息: ${eventCreate.info}
        `;
        }
    }

    async function createEvent(eventCreate: EventCreate) {
        let description: string;
        try {
            description = generateDescription(eventCreate);
            const response = await instance.Create({
                name: eventCreate.name,
                date: eventCreate.date,
                type: eventCreate.type,
                description: description,
                images: [],
            });
            if (response.data) {
                successMessage = 'Event created successfully!';
                errorMessage = '';
            }
        } catch (error) {
            errorMessage = 'Failed to create event. Please try again.';
            successMessage = '';
        }
    }
</script>

<Nav1/>
<Navbarcreate/>

<div class="container">
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p style="color: green;">{successMessage}</p>
    {/if}

    <form on:submit|preventDefault={async (event) => {
      await createEvent(eventCreate);
    }}>
        <label for="eventName">
            <span>名称</span>
            <input
                    bind:value={eventCreate.name}
                    id="eventName"
                    maxlength="50"
                    minlength="3"
                    placeholder="请输入事件名称"
                    required
                    type="text"
            />
        </label>

        <label for="eventDate">
            <span>日期</span>
            <input
                    bind:value={eventCreate.date}
                    id="eventDate"
                    placeholder="请选择日期"
                    required
                    type="date"
            />
        </label>

        <label for="eventType">
            <span>类型</span>
            <select bind:value={eventCreate.type} id="eventType">
                <option value="代取服务">代取服务</option>
                <option value="代买服务">代买服务</option>
                <option value="二手市场">二手市场</option>
                <option value="失物招领">失物招领</option>
            </select>
        </label>

        <label for="eventFee">
            <span>代取费</span>
            <input
                    bind:value={eventCreate.fee}
                    id="eventFee"
                    min="0"
                    placeholder="请输入代取费"
                    required
                    step="0.01"
                    type="number"
            />
        </label>

        <label for="eventLocation">
            <span>代取点</span>
            <input
                    bind:value={eventCreate.location}
                    id="eventLocation"
                    maxlength="50"
                    minlength="3"
                    placeholder="请输入代取点"
                    required
                    type="text"
            />
        </label>

        <label for="eventDestination">
            <span>送达点</span>
            <input
                    bind:value={eventCreate.destination}
                    id="eventDestination"
                    maxlength="50"
                    minlength="3"
                    placeholder="请输入送达点"
                    required
                    type="text"
            />
        </label>

        <label for="eventDistance">
            <span>距离</span>
            <input
                    bind:value={eventCreate.distance}
                    id="eventDistance"
                    min="0"
                    placeholder="请输入距离"
                    required
                    step="0.01"
                    type="number"
            />
        </label>

        <label for="eventTime">
            <span>截止时间</span>
            <input
                    bind:value={eventCreate.time}
                    id="eventTime"
                    placeholder="请选择截止时间"
                    required
                    type="datetime-local"
            />
        </label>

        <label for="eventInfo">
            <span>其他信息</span>
            <textarea
                    bind:value={eventCreate.info}
                    id="eventInfo"
                    maxlength="200"
                    minlength="3"
                    placeholder="请输入其他信息"
                    required
            ></textarea>
        </label>

        <label for="eventImages">
            <span>图片</span>
            <input
                    accept="image/*"
                    bind:files={eventCreate.images}
                    id="eventImages"
                    multiple
                    type="file"
            />
        </label>

        <button class="btn" type="submit">创建事件</button>
    </form>

</div>

<style>
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
        padding-top: 15%;
        padding-bottom: 20%;
        color: #000000;
    }

    span {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    label {
        display: block;
        width: 80%;
        flex-direction: column;
        margin-bottom: 0.5rem;
        color: #000000;
    }

    input {
        width: 100%;
        padding: 0.6rem;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: 0.3s;
        color: #000000;
    }

    input:focus {
        outline: none;
        border: 1px solid #000000;
        border-radius: 6px;
    }

    button {
        width: 80%;
        padding: 0.5rem;
        background-color: #708862;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    button:hover {
        background-color: #474747;
        border-radius: 10px;
    }
</style>