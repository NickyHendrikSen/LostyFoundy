<template>
    <div class="insert-wrapper">
        <button class="insert-close" v-on:click="close()">X</button>
        <div class="insert-title">Insert</div>
        <div class="insert-form">
            <div class="insert-input">
                <div class="insert-input-name">Item Name</div>
                <input type="text" placeholder="Item Name" v-model="item.ItemName"/>
            </div>
            <div class="insert-input">
                <div class="insert-input-name">Room Found</div>
                <input type="text" placeholder="Room Found" v-model="item.RoomFound"/>
            </div>
            <div class="insert-input">
                <div class="insert-input-name">PC Number</div>
                <input type="number" placeholder="PC Number" v-model="item.PCNumber"/>
            </div>
            <div class="insert-input">
                <div class="insert-input-name">Found Date</div>
                <input type="datetime-local" placeholder="Found Date" v-model="item.FoundDate"/>
            </div>
            <div class="insert-input">
                <div class="insert-input-name">Found Shift</div>
                <input type="number" placeholder="Found Shift" v-model="item.FoundShift"/>
            </div>
        </div>
        <button class="btnInsert" v-on:click="insert()">Insert</button>
    </div>
</template>

<style lang="scss">
    @import './Insert.scss';
</style>

<script src="./Insert.js">
</script>