import Vue from 'vue'
import gql from 'graphql-tag'
import InsertComponent from '../Insert/Insert.vue'
import LoginComponent from '../Login/Login.vue'
import TakerComponent from '../Taker/Taker.vue'

export default {
    name:"Login",
    components : {
        'insert' : InsertComponent,
        'login' : LoginComponent,
        'taker' : TakerComponent
    },
    data(){
        return{
            popup : null,
            list: null,
            renderer: 0,
        }
    },
    methods:{
        popUpClose(){
            this.popup = null
        },
        forceUpdate(){
            this.$forceUpdate();
        },
        logout(){
            this.$cookies.remove('Auth')
            this.$forceUpdate();
        },
        login(){
            this.popup = 'login'
            // this.$router.push('/login')
        },
        insert(){
            this.popup = 'insert'
            // this.$router.push('/insert')
        },
        authUser(){
            try{
                if(this.$cookies.get('Auth') == null || this.$cookies.get('Auth') == undefined){
                    return false
                }
                return true
            }catch(e){
                return false
            }
        },
        showTaker(item){
            localStorage.setItem('TakerItem', JSON.stringify(item))
            this.$forceUpdate();
            this.popup = 'taker'
            this.renderer = this.renderer+1
        }
    },
    created(){
        this.$apollo.query({
            
            query: gql`query {
                items {
                    TakerID,
                    ItemName,
                    RoomFound,
                    PCNumber,
                    FoundDate,
                    FoundShift
                }
            }`,
            
            }).then((data) => {
                console.log(data)
                this.list = data.data.items
            }).catch((err) => {
                console.log(err)
            })
    }

}