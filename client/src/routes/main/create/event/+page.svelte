<script lang="ts">
  import type {User} from '$lib/stores/userStore';
  import {userStore} from '$lib/stores/userStore';
  import {Tab, TabGroup} from '@skeletonlabs/skeleton';
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import * as instance from '$lib/api';
  import Nav1 from '$lib/nav/Navcreate.svelte';
  import Navbarcreate from '$lib/navbar/Navbarcreate.svelte';
  import type {Event} from '$lib/api';
  let eventCreate:{
    name: '';  //名称
    date: '';  //日期
    type: '';  //类型
    fee: 0;   //代取费
    location: ''; //代取点
    destination: '';//送达点
    distance: 0;   //距离
    time: '';       //截止时间
    info: '';       //其他信息
    eventimages: null; //图片
  };
  let errorMessage = '';
  let successMessage = '';
  let description = '';

  function generateDescription(event:Event) {
  return `
    代取费: ${event.fee}
    代取点: ${event.location}
    送达点: ${event.destination}
    距离: ${event.distance}
    截止时间: ${event.time}
    其他信息: ${event.info}
  `;
}
  async function createEvent() {
    try {
      description = generateDescription(eventCreate)
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

<Nav1 />
<Navbarcreate />

<div class="container">
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
    {#if successMessage}
      <p style="color: green;">{successMessage}</p>
    {/if}
    
    <form on:submit|preventDefault={createEvent}>
          <label for="eventName">
            <span>名称</span>
            <input 
              type="text" 
              id="eventName" 
              bind:value={eventCreate.name}
              required 
              minlength="3" 
              maxlength="50" 
              placeholder="请输入事件名称"
            />
          </label>

          <label for="eventDate">
            <span>日期</span>
            <input 
              type="date" 
              id="eventDate" 
              bind:value={eventCreate.date}
              required 
              placeholder="请选择日期"
            />
          </label>

          <label for="eventType">
            <span>类型</span>
            <select id="eventType" bind:value={eventCreate.type}>
              <option value="代取服务">代取服务</option>
              <option value="代买服务">代买服务</option>
              <option value="二手市场">二手市场</option>
              <option value="失物招领">失物招领</option>
            </select>
          </label>

          <label for="eventFee">
            <span>代取费</span>
            <input 
              type="number" 
              id="eventFee" 
              bind:value={eventCreate.fee}
              required 
              min="0" 
              step="0.01" 
              placeholder="请输入代取费"
            />
          </label>

          <label for="eventLocation">
            <span>代取点</span>
            <input 
              type="text" 
              id="eventLocation" 
              bind:value={eventCreate.location}
              required 
              minlength="3" 
              maxlength="50" 
              placeholder="请输入代取点"
            />
          </label>

          <label for="eventDestination">
            <span>送达点</span>
            <input 
              type="text" 
              id="eventDestination" 
              bind:value={eventCreate.destination}
              required 
              minlength="3" 
              maxlength="50" 
              placeholder="请输入送达点"
            />
          </label>

          <label for="eventDistance">
            <span>距离</span>
            <input 
              type="number" 
              id="eventDistance" 
              bind:value={eventCreate.distance}
              required 
              min="0" 
              step="0.01" 
              placeholder="请输入距离"
            />
          </label>

          <label for="eventTime">
            <span>截止时间</span>
            <input 
              type="datetime-local" 
              id="eventTime" 
              bind:value={eventCreate.time}
              required 
              placeholder="请选择截止时间"
            />
          </label>

          <label for="eventInfo">
            <span>其他信息</span>
            <textarea 
              id="eventInfo" 
              bind:value={eventCreate.info}
              required 
              minlength="3" 
              maxlength="200" 
              placeholder="请输入其他信息"
            ></textarea>
          </label>

          <label for="eventImages">
            <span>图片</span>
            <input 
              type="file" 
              id="eventImages" 
              multiple 
              bind:files={eventCreate.eventimages}
              accept="image/*"
            />
          </label>

          <button type="submit" class="btn">创建事件</button>
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