<template>
    <div>
        <div class="navBar">
            <button v-on:click="insert()" v-if="authUser()">Insert</button>
            <button v-on:click="logout()" v-if="authUser()">Logout</button>
            <button v-on:click="login()" v-else>Login</button>
        </div>
        <div class="list">
            <div class="list-header">
                <div>Item Name</div>
                <div>Room Found</div>
                <div>PC Number</div>
                <div>Found Date</div>
                <div>Found Shift</div>
                <div>Status</div>
                <div>Taken By</div>
            </div>
            <div  v-for="(item, index) in list">
                <div class="list-item list-notAvailable" v-if="item.TakerID == '' || item.TakerID == undefined || item.TakerID == null" v-on:click="showTaker(item, false)">
                    <div class="list-name">{{item.ItemName}}</div>
                    <div class="list-roomFound">{{item.RoomFound}}</div>
                    <div class="list-pcNumber">{{item.PCNumber}}</div>
                    <div class="list-foundDate">{{item.FoundDate}}</div>
                    <div class="list-foundShift">{{item.FoundShift}}</div>
                    <div class="list-statusNot" >Not Taken</div>
                    <div class="list-statusNot">None</div>
                </div>
                <div class="list-item list-available" v-else  v-on:click="showTaker(item, true)">
                    <div class="list-name">{{item.ItemName}}</div>
                    <div class="list-roomFound">{{item.RoomFound}}</div>
                    <div class="list-pcNumber">{{item.PCNumber}}</div>
                    <div class="list-foundDate">{{item.FoundDate}}</div>
                    <div class="list-foundShift">{{item.FoundShift}}</div>
                    <div class="list-statusNot" >Taken</div>
                    <div class="list-statusNot">{{item.TakerID}}</div>
                </div>
            </div>
        </div>
        <component :key="renderer" v-bind:is="popup"></component>
    </div>
</template>


<style lang="scss">
    @import './Home.scss';
</style>

<script src="./Home.js"></script>
