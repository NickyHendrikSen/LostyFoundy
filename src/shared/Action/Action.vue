<template>
    <div class="action-wrapper">
        <div class="action-inner">
            <div class="action-title">Item Detail</div>
            <button class="action-close" v-on:click="$parent.popUpClose()">X</button>
            <img v-bind:src="item.ItemImage" class="item-image" v-if="item.ItemImage != null"/>
            <div class="action-card-wrapper">
                <div class="action-card">
                    <div class="action-card-name">Item Name</div>
                    <div class="action-card-info">{{item.ItemName}}</div>
                </div>
                <div class="action-card">
                    <div class="action-card-name">Room Found</div>
                    <div class="action-card-info">{{item.RoomFound}}</div>
                </div>
                <div class="action-card">
                    <div class="action-card-name">PC Number</div>
                    <div class="action-card-info">{{item.PCNumber}}</div>
                </div>
                <div class="action-card">
                    <div class="action-card-name">Found Date</div>
                    <div class="action-card-info">{{item.FoundDate}}</div>
                </div>
                <div class="action-card">
                    <div class="action-card-name">Found Shift</div>
                    <div class="action-card-info">{{item.FoundShift}}</div>
                </div>
                <div class="action-action" v-if="$parent.authUser()">
                    <button v-on:click="$parent.deleteItem(item)" class="action-delete">Delete</button>
                    <button v-on:click="$parent.showTaker(item)" class="action-edit">Edit Taker</button>
                    <button v-on:click="$parent.updateItem(item)" class="action-update">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./Action.js">
</script>

<style lang="scss">
    @import './Action.scss';
</style>