<template>
    <div class="login-wrapper">
        <button class="login-close" v-on:click="close()">X</button>
        <div class="login-card">
            <div class="login-title">Login</div>
                <div class="login-input-wrapper">
                    <div class="login-input-title">Username</div>
                    <input type="text" id="nim" name="nim" placeholder="Username" v-model="post.Username"></input>
                </div>
                <div class="login-input-wrapper">
                    <div class="login-input-title">Password</div>
                    <input type="password" id="password" name="Password" placeholder="Password" v-model="post.Password"></input>
                </div>
                <button v-on:click="login()" type="submit">Login</button>
        </div>
    </div>
</template>

<script src="./Login.js">
</script>

<style lang="scss">
    @import './Login.scss';
</style>