import Vue from 'vue'
import gql from 'graphql-tag'
import TakePhoto from "../TakePhoto/TakePhoto.vue"
import Scan from "./Scan/Scan.vue"

export default {
    name:"Taker",
    components : {
        'Photo' : TakePhoto,
        'Scan' : Scan,
    },
    data(){
        return{
            notTaken: false,
            item: null,
            type: null,
            method_component: null,
            id: null,
            pic: null,
            name: null,
            picmethod: null,
        }
    },
    methods:{
        updateTaker(){

        },
        updateItemTaker(){
            const mutation = {
                query: `
                    mutation { 
                        updateItem(ID : "${this.item.ID}", takerId: "${this.id}"){
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
        insertTaker(){
            // console.log(this.id)
            // console.log(this.type)
            // console.log(this.name)
            // console.log(this.pic)
            // return
            const mutation = {
                query: `
                    mutation { 
                        insertTaker(takerInput : {ID: "${this.id}", IDType: "${this.type}", TakerName: "${this.name}", TakerImage: "${this.pic}"}){
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
                .then(res => res.json())
                .then(resData => {
                    console.log(resData)
                    this.updateItemTaker()
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changeType(){
            this.method_component = null
            this.picmethod = null
        },
        typeClose(){
            this.type_component = null
        },
        updatePicture(pic){
            this.pic = pic
            const mutation = {
                query: `
                    mutation { 
                        readPhoto(photo : "${pic}"){
                            ID,
                            Name
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
                .then(res => res.json())
                .then(resData => {
                    let data = resData.data.readPhoto
                    this.id = data.ID
                    this.name = data.Name
                    console.log(data)
                })
                .catch(err => {
                    console.log(err);
                });

        },
        changeMethod(){
            localStorage.setItem("PicMethod", this.picmethod)
            this.method_component = this.picmethod
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