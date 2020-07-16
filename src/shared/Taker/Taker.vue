<template>
    <div>
        <div><video ref="video" id="video" width="640" height="480" autoplay></video></div>
        <div><button id="snap" v-on:click="capture()">Snap Photo</button></div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
        <ul>
            <li v-for="c in captures">
                <img v-bind:src="c" height="50" />
            </li>
        </ul>
    </div>
</template>

<script src="./Login.js">
</script>

<style lang="scss">
    @import './Taker.scss';
</style>

<script src="./Taker.js">
</script>
