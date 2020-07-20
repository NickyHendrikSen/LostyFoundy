<template>
    <div class="taker-wrapper">
        <div class="taker-wrapper-inner">
            <button class="taker-close" v-on:click="close()">X</button>
            <div class="taker-title">Taker</div>
            <div class="taker-inner" v-if="notTaken">
                <div class="taker-input">
                    <div>ID Type</div>
                    <div class="taker-select">
                        <select v-on:change="changeType()" v-model="type">
                            <option value="KTP">KTP</option>
                            <option value="NIM">NIM</option>
                            <option value="BNID">BN ID</option>
                        </select>
                        <select v-on:change="changeMethod()" v-model="picmethod">
                            <option value="Photo" v-if="type == 'KTP' || type == 'NIM' || type == 'BNID'">Photo</option>
                            <option value="Scan" v-if="type == 'NIM' || type == 'BNID'">Scan</option>
                        </select>
                    </div>
                </div>
                <component v-bind:is="method_component"></component>
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
                    <button class="btnInsertTaker" v-on:click="insertTaker()" v-if="item.taker == null">Insert Taker</button>
                    <button class="btnUpdateTaker" v-on:click="updateTaker()" v-else>Update Taker</button>
                </div>
            </div>
            <div class="taker-inner" v-else>
            yes
            </div>
        </div>
    </div>
</template>

<script src="./Taker.js">

</script>
<style lang="scss">
    @import './Taker.scss';
</style>