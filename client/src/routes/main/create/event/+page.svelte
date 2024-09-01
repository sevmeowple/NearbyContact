<script lang="ts">
    import * as instance from '$lib/api';
    import Nav1 from '$lib/nav/Nav1.svelte';
    import Navbarcreate from '$lib/navbar/Navbarcreate.svelte';
  
    let eventName = '';
    let eventDate = '';
    let eventType = '';
    let eventDescription = '';
    let eventInfo = '';
    let errorMessage = '';
    let successMessage = '';
  
    async function createEvent() {
      try {
        const response = await instance.Create({
          name: eventName,
          date: eventDate,
          type: eventType,
          description: eventDescription,
          info: eventInfo
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
            <input type="text" id="eventName" name="eventName" required minlength="2" />
        </label>

        <label for="eventDate">
            <span>日期</span>
            <input type="date" id="eventDate" name="eventDate" required />
        </label>

        <label for="eventType">
            <span>类型</span>
            <select id="eventType" name="eventType" required>
                <option value="">选择一个类型</option>
                <option value="">代取服务</option>
                <option value="">代买服务</option>
                <option value="">二手市场</option>
                <option value="">失物招领</option>
            </select>
        </label>

        <label for="eventDescription">
            <span>具体描述</span>
            <textarea id="eventDescription" name="eventDescription" required minlength="0"></textarea>
        </label>

        <label for="eventInfo">
            <span>其他信息</span>
            <textarea id="eventInfo" name="eventInfo" required minlength="10"></textarea>
        </label>

        <button type="submit" class="btn">Create Event</button>
      </form>
  </div>
  
<style>
    .container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        width: 100%;
        padding-left: 5%;
        padding-right: 5%;
        padding-top: 10%;
        padding-bottom: 20%;
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
        /* border-radius: 渐变 */
        transition: 0.3s;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    button:hover {
        background-color: #474747;
        border-radius: 10px;
    }
</style>