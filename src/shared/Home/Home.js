import Vue from 'vue'
import gql from 'graphql-tag'

export default {
    name:"Login",
    data(){
        return{
            list: null
        }
    },
    methods:{
        logout(){
            this.$cookies.remove('Auth')
            this.$forceUpdate();
        },
        login(){
            this.$router.push('/login')
        },
        insert(){
            this.$router.push('/insert')
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