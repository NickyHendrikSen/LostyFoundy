<template>
    <div class="insert-wrapper">
        <div class="insert-inner">
            <button class="insert-close" v-on:click="close()">X</button>
            <div class="insert-title">Item Update</div>
            <component v-bind:is="photoComponent"></component>
            <div class="insert-form">
                <img v-bind:src="item.ItemImage" class="item-image" v-if="item.ItemImage != null"/>
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
                    <input type="date" placeholder="Found Date" v-model="item.FoundDate"/>
                </div>
                <div class="insert-input">
                    <div class="insert-input-name">Found Shift</div>
                    <input type="number" placeholder="Found Shift" v-model="item.FoundShift"/>
                </div>
                    <button class="item-update" v-on:click="update()" v-if="authUser()">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import './UpdateItem.scss';
</style>

<script src="./UpdateItem.js">
</script>