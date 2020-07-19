import Vue from 'vue'
import gql from 'graphql-tag'
import TakePhoto from "./TakePhoto/TakePhoto.vue"

export default {
    name:"Taker",
    components : {
        'takephoto' : TakePhoto,
    },
    data(){
        return{
            notTaken: false,
            item: null,
            type: null,
            type_component: null,
            id: null,
            pic: null,
            name: null,
        }
    },
    methods:{
        insertTaker(){

        },
        typeClose(){
            this.type_component = null
        },
        updatePicture(id, pic){
            console.log(pic)
            this.pic = pic
            this.id = id
        },
        changeType(){
            let type = this.type
            this.id = null
            if(type == "KTP"){
                this.type_component = 'takephoto'
            }
        },
        close(){
            this.$parent.popUpClose()
        }
    },
    created(){
        let item = JSON.parse(localStorage.getItem("TakerItem"))
        let notTaken = item.TakerID == '' || item.TakerID == undefined || item.TakerID == null
        this.notTaken = notTaken;
        this.item = item;
    }
}