import Vue from 'vue'
import gql from 'graphql-tag'

export default {
    name:"Action",
    data(){
        return{
            item:null,
            takerImage:null,
        }
    },
    methods:{
       
    },
    created(){
        // console.log(localStorage.getItem('TakerItem'))
        this.item = JSON.parse(localStorage.getItem('TakerItem'))
        
        let id = this.item.taker.ID
        this.$apollo.query({
                
            query: gql`query {
                takers (filterId:"${id}"){
                    TakerImage
                }
              }`,
            
            }).then((data) => {
                this.takerImage = data.data.takers[0].TakerImage
            }).catch((err) => {
                console.log(err)
                this.loading = false
            })
    }

}