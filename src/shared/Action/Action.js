import Vue from 'vue'
import gql from 'graphql-tag'

export default {
    name:"Action",
    data(){
        return{
            item:null,
        }
    },
    methods:{
       
    },
    created(){
        console.log(localStorage.getItem('TakerItem'))
        this.item = JSON.parse(localStorage.getItem('TakerItem'))
    }

}