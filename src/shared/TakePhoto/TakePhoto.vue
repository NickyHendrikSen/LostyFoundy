<template>
    <div class="takephoto-wrapper">
        <div><video ref="video" id="video" width="640" height="480" autoplay></video></div>
        <div><button id="snap" v-on:click="capture()">Snap Photo</button></div>
        <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    </div>
</template>

<script src="./Login.js">
</script>

<style lang="scss">
    @import './TakePhoto.scss';
</style>

<script src="./TakePhoto.js">
</script>
