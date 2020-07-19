<template>
    <div class="taker-wrapper">
        <button class="taker-close" v-on:click="close()">X</button>
        <div class="taker-title">Taker</div>
        <div class="taker-inner" v-if="notTaken">
            <div class="taker-input">
                <div>ID Type</div>
                <select v-on:change="changeType()" v-model="type">
                    <option value="KTP">KTP</option>
                    <option value="NIM">NIM</option>
                    <option value="Binusian ID">Binusian ID</option>
                </select>
            </div>
            <component v-bind:is="type_component"></component>
            <div class="taker-form" v-if="id != null">
                <img v-bind:src="pic" class="taker-pic"/>
                <div class="taker-form-input">
                    <div>ID</div>
                    <input type="text" v-model="id"/>
                </div>
                <div class="taker-form-input">
                    <div>Taker Name</div>
                    <input type="text" v-model="name"/>
                </div>
                <button class="btnInsertTaker" v-on:click="insertTaker()">Insert Taker</button>
            </div>
        </div>
        <div class="taker-inner" v-else>
        yes
        </div>
    </div>
</template>

<script src="./Taker.js">

</script>
<style lang="scss">
    @import './Taker.scss';
</style>