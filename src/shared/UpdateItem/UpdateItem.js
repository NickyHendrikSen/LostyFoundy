import Vue from 'vue'
import gql from 'graphql-tag'
import PhotoComponent from '../TakePhoto/TakePhoto.vue'

export default {
    name:"ViewItem",
    components : {
        'photo' : PhotoComponent
    },
    data(){
        return{
            item:null,
            photoComponent: 'photo',
        }
    },
    methods:{
        close(){
            this.$parent.popUpClose()
        },
        updatePicture(url){
            this.item.ItemImage = url
        },
        update(){
            let itemToBeInserted = this.item
            console.log(itemToBeInserted)
            const mutation = {
                query: `
                    mutation { 
                        updateItem(ID : "${this.item.ID}", itemInput : {ItemName : "${itemToBeInserted.ItemName}", RoomFound : "${itemToBeInserted.RoomFound}", PCNumber : ${itemToBeInserted.PCNumber}, FoundDate : "${itemToBeInserted.FoundDate.toString()}", FoundShift : ${itemToBeInserted.FoundShift}, ItemImage : "${itemToBeInserted.ItemImage}"}){
                            ID
                        }
                    }
                `
            }
            
            let token = this.$cookies.get('Auth').token
            console.log(token)
            fetch('http://139.180.132.167:8989/graphql', {
                method: 'POST',
                body: JSON.stringify(mutation),
                headers: {
                    'Content-Type': 'application/json',
                    Auth: token
                }
                })
                .then(res => {
                    console.log(res)
                    this.$router.go()
                })
                .catch(err => {
                    console.log(err);
                });
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
        this.item = JSON.parse(localStorage.getItem('TakerItem'))
        // let d = new Date(this.item.FoundDate)
        // this.item.FoundDate = d
    }

}