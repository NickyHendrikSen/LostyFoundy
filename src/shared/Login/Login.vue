<template>
    <div class="login-wrapper">
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
.login-wrapper{
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    .login-card{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        padding: 1%;
        width: 20%;
        background-color: white;
        border-radius: 4px;
        box-shadow: 1px 1px 1px 1px #aaaaaa;
        .login-title{
            font-weight: bold;
            font-size: 25px;
        }
        .login-input-wrapper{
            margin-top: 10px;
            text-align: left;
            input{
                border: none;
                border-bottom: 1px solid black;
                outline: none;
                transition-duration: .5s;
                width: 100%;
                &:focus{
                    background-color: rgba(219, 219, 219, 0.678);
                }
            }
        }
        button{
            color: black;
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid black;
            margin-top: 20px !important;
            cursor: pointer;
            outline: none;
            &:hover{
                background-color: rgb(228, 228, 228);
            }
        }
    }
}
</style>