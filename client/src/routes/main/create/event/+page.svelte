<script lang="ts">
	import * as instance from '$lib/api';
	import Nav1 from '$lib/nav/Navcreate.svelte';
	import Navbarcreate from '$lib/navbar/Navbarcreate.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';


	//还有点小问题
	type EventCreate = {
		name: string;  //名称
		date: string;  //日期
		type: string;  //类型
		description: string; //描述
		images: FileList; //图片
		fee: string;  //代取费
		location: string;  //代取点
		destination: string;  //送达点
		distance: string;  //距离
		time: string;    //截止时间
		price: string;    //价格
		info: string;    //其他信息
	};

	let eventCreate: EventCreate = {
		name: '',  //名称
		date: '',  //日期
		type: '',  //类型
		description: '', //描述
		images: [] as unknown as FileList, //图片
		fee: '', //代取费
		location: '',  //;  //代取点
		destination: '',    //送达点
		distance: '',  //距离
		time: '',    //截止时间
		price: '',   //价格
		info: ''    //其他信息
	};


	let errorMessage = '';
	let successMessage = '';
	let tabSet = 0;

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
		} else if (eventCreate.type === '代买服务') {
			return `
          代买费: ${eventCreate.fee}
          代买点: ${eventCreate.location}
          送达点: ${eventCreate.destination}
          距离: ${eventCreate.distance}
          截止时间: ${eventCreate.time}
          其他信息: ${eventCreate.info}
        `;
		} else if (eventCreate.type === '二手市场') {
			return `
          价格: ${eventCreate.fee}
          地点: ${eventCreate.destination}
          其他信息: ${eventCreate.info}
        `;
		} else if (eventCreate.type === '失物招领') {
			return `
		  丢失事件：${eventCreate.time}
          丢失地点: ${eventCreate.location}
          其他信息: ${eventCreate.info}
        `;
		}
		return '';
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
				images: []
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

<Nav1 />
<Navbarcreate />

<div class="container">
	{#if errorMessage}
		<p style="color: red;">{errorMessage}</p>
	{/if}
	{#if successMessage}
		<p style="color: green;">{successMessage}</p>
	{/if}
	<TabGroup
		active="border-b-2 bg-gray-200"
		hover="black hover:bg-gray-100"
		justify="justify-center"
	>
		<Tab bind:group={tabSet} name="fethch" value={0}><span> 代取服务 </span></Tab>
		<Tab bind:group={tabSet} name="buy" value={1}><span> 代买服务 </span></Tab>
		<Tab bind:group={tabSet} name="market" value={2}><span> 二手市场 </span></Tab>
		<Tab bind:group={tabSet} name="lost" value={3}><span> 失物招领 </span></Tab>

		<svelte:fragment slot="panel">

			{#if tabSet === 0}
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

					<label for="eventType">
						<span>类型</span>
						<select bind:value={eventCreate.type} id="eventType">
							<option value="代取服务">代取服务</option>
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

					<button class="floating-button" type="submit">创建<br>事件</button>
					<button class="reset-button" type="reset">重置<br>信息</button>
				</form>
			{:else if tabSet === 1}
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

					<label for="eventType">
						<span>类型</span>
						<select bind:value={eventCreate.type} id="eventType">
							<option value="代买服务">代买服务</option>
						</select>
					</label>

					<label for="eventFee">
						<span>代买费</span>
						<input
							bind:value={eventCreate.fee}
							id="eventFee"
							min="0"
							placeholder="请输入代买费"
							required
							step="0.01"
							type="number"
						/>
					</label>

					<label for="eventLocation">
						<span>代买点</span>
						<input
							bind:value={eventCreate.location}
							id="eventLocation"
							maxlength="50"
							minlength="3"
							placeholder="请输入代买点"
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

					<button class="floating-button" type="submit">创建<br>事件</button>
					<button class="reset-button" type="reset">重置<br>信息</button>
				</form>

			{:else if tabSet === 2}
				<form on:submit|preventDefault={async (event) => {
      						await createEvent(eventCreate);
    				}}>
					<label for="eventName">
						<span>名称</span>
						<input
							id="eventName"
							maxlength="50"
							minlength="3"
							placeholder="请输入事件名称"
							required
							type="text"
						/>

						<label for="eventType">
							<span>类型</span>
							<select bind:value={eventCreate.type} id="eventType">
								<option value="二手市场">二手市场</option>
							</select>
						</label>

						<label for="eventFee">
							<span>价格</span>
							<input
								bind:value={eventCreate.fee}
								id="eventFee"
								min="0"
								placeholder="请输入价格"
								required
								step="0.01"
								type="number"
							/>
						</label>

						<label for="eventDestination">
							<span>地点</span>
							<input
								bind:value={eventCreate.destination}
								id="eventDestination"
								maxlength="50"
								minlength="3"
								placeholder="请输入地点"
								required
								type="text"
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

						<button class="floating-button" type="submit">创建<br>事件</button>
						<button class="reset-button" type="reset">重置<br>信息</button>
				</form>

			{:else if tabSet === 3}
				<form on:submit|preventDefault={async (event) => {
      						await createEvent(eventCreate);
    				}}>
					<label for="eventName">
						<span>名称</span>
						<input
							id="eventName"
							maxlength="50"
							minlength="3"
							placeholder="请输入事件名称"
							required
							type="text"
						/>
					</label>

					<label for="eventType">
						<span>类型</span>
						<select bind:value={eventCreate.type} id="eventType">
							<option value="失物招领">失物招领</option>
						</select>
					</label>

					<label for="eventTime">
						<span>丢失时间</span>
						<input
							bind:value={eventCreate.time}
							id="eventTime"
							placeholder="请选择丢失时间"
							required
							type="datetime-local"
						/>
					</label>

					<label for="eventLocation">
						<span>丢失地点</span>
						<input
							bind:value={eventCreate.location}
							id="eventLocation"
							maxlength="50"
							minlength="3"
							placeholder="请输入丢失地点"
							required
							type="text"
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

					<button class="floating-button" type="submit">创建<br>事件</button>
					<button class="reset-button" type="reset">重置<br>信息</button>
				</form>

			{/if}
		</svelte:fragment>
	</TabGroup>
</div>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ffffff;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 15%;
        padding-bottom: 20%;
        color: #000000;
    }

    span {
        font-size: 1.0rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }

    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        flex-direction: column;
        margin-bottom: 0.5rem;
        color: #000000;
    }

    input {
        justify-content: center;
        width: 80%;
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

        justify-content: center;
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

    select {
        width: 80%;
    }

    textarea {
        width: 80%;
        height: 100px;
        padding: 0.6rem;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        transition: 0.3s;
        color: #000000;
    }

    .floating-button {
        position: fixed;
        bottom: 10%; /* 距离底部的距离 */
        right: 4%; /* 距离右侧的距离 */
        width: 3.5rem; /* 按钮的宽度 */
        height: 3.5rem; /* 按钮的高度 */
        background-color: #708862; /* 按钮的背景色 */
        color: white; /* 按钮的文字颜色 */
        border: none; /* 去掉边框 */
        border-radius: 100%; /* 圆形按钮 */
        cursor: pointer; /* 鼠标悬停在按钮上时显示为指针 */
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        font-size: 0.8rem; /* 文字大小 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */

    }

    .floating-button:hover {
        background-color: #5a6d4d; /* 悬停时的背景色 */
    }

    .reset-button {
        position: fixed;
        bottom: 20%; /* 距离底部的距离 */
        right: 4%; /* 距离右侧的距离 */
        width: 3.5rem; /* 按钮的宽度 */
        height: 3.5rem; /* 按钮的高度 */
        background-color: #708862; /* 按钮的背景色 */
        color: white; /* 按钮的文字颜色 */
        border: none; /* 去掉边框 */
        border-radius: 100%; /* 圆形按钮 */
        cursor: pointer; /* 鼠标悬停在按钮上时显示为指针 */
        display: flex;
        align-items: center; /* 垂直居中 */
        justify-content: center; /* 水平居中 */
        font-size: 0.8rem; /* 文字大小 */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
    }

    .reset-button:hover {
        background-color: #5a6d4d; /* 悬停时的背景色 */
    }
</style>