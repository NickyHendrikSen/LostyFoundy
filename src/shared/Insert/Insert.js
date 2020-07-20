import Vue from 'vue'
import gql from 'graphql-tag'
import PhotoComponent from "../TakePhoto/TakePhoto.vue"

export default {
    name:"Insert",
    components : {
        'photo': PhotoComponent
    },
    data(){
        return{
            item:{
                UserID: '',
                TakerID: '',
                ItemName: null,
                RoomFound: null,
                PCNumber: null,
                FoundDate: null,
                FoundShift: null,
            },
            photoComponent: 'photo',
            pic: null
        }
    },
    methods:{
        updatePicture(url){
            this.pic = url
            this.$parent.loading = false
        },
        typeClose(){
            this.photoComponent = null
            this.$forceUpdate()
        },
        close(){
            this.$parent.popUpClose()
        },
        insert()
        {
            this.$parent.loading = true
            this.item.UserID = this.$cookies.get('Auth').ID
            let itemToBeInserted = this.item
            const mutation = {
                query: `
                    mutation { 
                        insertItem(itemInput: {ItemName : "${itemToBeInserted.ItemName}", RoomFound : "${itemToBeInserted.RoomFound}", PCNumber : ${itemToBeInserted.PCNumber}, FoundDate : "${itemToBeInserted.FoundDate.toString()}", FoundShift : ${itemToBeInserted.FoundShift}, ItemImage : "${this.pic}"}){
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
                    alert('Success')
                    this.$router.go()
                    this.$parent.loading = false
                })
                .catch(err => {
                    console.log(err);
                    this.$parent.loading = false
                });


        //     this.$apollo.query({
            
        //         query: gql`query ($UserID: Int!, $TakerID: String, $ItemName: String!, $RoomFound: String!, $PCNumber: Int!, $FoundDate: String!, $FoundShift: Int!) {
        //             insertItem(itemInput: {UserID: UserID, TakerID: TakerID, ItemName: ItemName, RoomFound: RoomFound, PCNumber: PCNumber, FoundDate: FoundDate, FoundShift: FoundShift}) {
        //                 A
        //             }
        //         }`,
                
        //         variables: {
        //             UserID: itemToBeInserted.UserID,
        //             TakerID: itemToBeInserted.TakerID,
        //             ItemName: itemToBeInserted.ItemName,
        //             RoomFound: itemToBeInserted.RoomFound,
        //             PCNumber: itemToBeInserted.PCNumber,
        //             FoundDate: itemToBeInserted.FoundDate,
        //             FoundShift: itemToBeInserted.FoundShift
        //         },
        //         }).then((data) => {
        //             alert("Success")
        //         }).catch((err) => {
        //             alert("Failed")
        //         })
        }
    },
    created(){
        if(this.$cookies.get('Auth') == null || this.$cookies.get('Auth') == undefined){
            this.item = JSON.parse(localStorage.getItem('TakerItem'))
            console.log(this.item)
            // this.$router.push('/home')
            this.$parent.popUpClose()
        }
    }

}