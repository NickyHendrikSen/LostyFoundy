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
            this.insertTaker()
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
                    alert('Success')
                    this.$router.go()
                })
                .catch(err => {
                    console.log(err);
                    this.$parent.loading = false
                });
        },
        insertTaker(){
            // console.log(this.id)
            // console.log(this.type)
            // console.log(this.name)
            // console.log(this.pic)
            // return
            this.$parent.loading = true
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
                    this.$parent.loading = false
                });
        },
        changeType(){
            this.method_component = null
            this.picmethod = null
            this.id = null
        },
        typeClose(){
            this.type_component = null
        },
        updateScan(info){
            if(this.type == "NIM"){
                this.id = info.card.NIM
            }
            else if(this.type == "BNID"){
                this.id = info.card.BNID
            }
            this.name = info.card.Name
        },
        updatePicture(pic){
            this.$parent.loading = true
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
                    this.$parent.loading = false
                })
                .catch(err => {
                    console.log(err);
                    this.$parent.loading = false
                });

        },
        changeMethod(){
            localStorage.setItem("PicMethod", this.picmethod)
            this.method_component = this.picmethod
            this.id = null
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