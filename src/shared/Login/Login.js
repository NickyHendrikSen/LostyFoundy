import Vue from 'vue'
import gql from 'graphql-tag'

export default {
    name:"Login",
    data(){
        return{
            post:{
                Username:null,
                Password:null
            },
        }
    },
    methods:{
        login(){
            console.log('Login')
            if(this.post.Username == "" || this.post.Username == null){
                alert("Username can't be empty")
                return;
            }
            else if(this.post.Password == "" || this.post.Password == null){
                alert("Password can't be empty");
                return;
            }

            const newTag = this.post

            this.$apollo.query({

            query: gql`query ($UserName: String!, $UserPassword: String!) {
                login(userInput: {username: $UserName, password: $UserPassword}) {

                    ID,
                    token,
                    tokenExpiration
                }
            }`,

            variables: {
                UserName: newTag.Username,
                UserPassword: newTag.Password,
            },
            }).then((data) => {
                let auth = data.data.login
                this.$cookies.set('Auth', auth, auth.tokenExpiration + "h")
                alert('Success Login')
                this.$router.push('/home')
            }).catch((err) => {
                alert(err.networkError.result.errors[0].message)
            })

        }
    }

}
