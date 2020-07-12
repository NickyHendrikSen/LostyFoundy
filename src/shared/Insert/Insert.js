import Vue from 'vue'
import gql from 'graphql-tag'

export default {
    name:"Insert",
    data(){
        return{
            item:{
                UserID: null,
                TakerID: '',
                ItemName: null,
                RoomFound: null,
                PCNumber: null,
                FoundDate: null,
                FoundShift: null,
            }
        }
    },
    methods:{
        insert()
        {
            this.item.UserID = this.$cookies.get('Auth').ID
            let itemToBeInserted = this.item

            const mutation = {
                query: `
                    mutation { 
                        insertItem(itemInput: {ItemName : "${itemToBeInserted.ItemName}", RoomFound : "${itemToBeInserted.RoomFound}", PCNumber : ${itemToBeInserted.PCNumber}, FoundDate : "${itemToBeInserted.FoundDate}", FoundShift : ${itemToBeInserted.FoundShift}}){
                            ID,
                            TakerID,
                            ItemName,
                            RoomFound,
                            PCNumber,
                            FoundDate,
                            FoundShift
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
                    alert('Success')
                    this.$router.push('/home')
                })
                .then(resData => {
                    console.log(resData)
                })
                .catch(err => {
                    console.log(err);
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
            this.$router.push('/home')
        }
    }

}