import Vue from 'vue'
import gql from 'graphql-tag'
import InsertComponent from '../Insert/Insert.vue'
import LoginComponent from '../Login/Login.vue'
import TakerComponent from '../Taker/Taker.vue'
import UpdateItemComponent from '../UpdateItem/UpdateItem.vue'

export default {
    name:"Login",
    components : {
        'insert' : InsertComponent,
        'login' : LoginComponent,
        'taker' : TakerComponent,
        'updateItem' : UpdateItemComponent,
    },
    data(){
        return{
            popup : null,
            list: null,
            renderer: 0,
            page: 1,
            length:1,
            search:'',
            loading: true,
        }
    },
    methods:{
        searchAction(){
            this.loading = false
            this.$apollo.query({
            
                query: gql`query {
                    items (filterName: "${this.search}") {
                        ID,
                        user{UserName},
                        taker{ID, TakerName},
                        ItemName,
                        RoomFound,
                        PCNumber,
                        FoundDate,
                        FoundShift,
                        ItemImage
                    }
                  }`,
                
                }).then((data) => {
                    this.length = data.data.items.length
                    this.$apollo.query({
                
                        query: gql`query {
                            items (filterName : "${this.search}", skip: ${(this.page-1)*15}, take: ${15}){
                                ID,
                                user{UserName},
                                taker{ID, TakerName},
                                ItemName,
                                RoomFound,
                                PCNumber,
                                FoundDate,
                                FoundShift,
                                ItemImage
                            }
                          }`,
                        
                        }).then((data) => {
                            console.log(data)
                            this.list = data.data.items
                            this.loading = false
                        }).catch((err) => {
                            console.log(err)
                        })
                }).catch((err) => {
                    console.log(err)
                })
    
           
        },
        changePage(){
            this.loading = true
            this.$apollo.query({
            
                query: gql`query {
                    items {
                        ID,
                        user{UserName},
                        taker{ID, TakerName},
                        ItemName,
                        RoomFound,
                        PCNumber,
                        FoundDate,
                        FoundShift,
                        ItemImage
                    }
                  }`,
                
                }).then((data) => {
                    this.length = data.data.items.length
                    this.$apollo.query({
                
                        query: gql`query {
                            items (skip: ${(this.page-1)*15}, take: ${15}){
                                ID,
                                user{UserName},
                                taker{ID, TakerName},
                                ItemName,
                                RoomFound,
                                PCNumber,
                                FoundDate,
                                FoundShift,
                                ItemImage
                            }
                          }`,
                        
                        }).then((data) => {
                            console.log(data)
                            this.list = data.data.items
                            this.loading = false
                        }).catch((err) => {
                            console.log(err)
                        })
                }).catch((err) => {
                    console.log(err)
                })
    
            
        },
        popUpClose(){
            this.popup = null
        },
        forceUpdate(){
            this.$forceUpdate();
        },
        logout(){
            this.$cookies.remove('Auth')
            this.$forceUpdate();
            this.popup.$forceUpdate()
        },
        login(){
            this.popup = 'login'
            this.$forceUpdate();
            this.popup.$forceUpdate()
            // this.$router.push('/login')
        },
        insert(){
            this.popup = 'insert'
            this.$forceUpdate();
            // this.$router.push('/insert')
        },
        updateItem(item){
            localStorage.setItem('TakerItem', JSON.stringify(item))
            this.$forceUpdate();
            this.popup = 'updateItem'
            this.renderer = this.renderer+1
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
        },
        deleteItem(item){
            const mutation = {
                query: `
                    mutation { 
                        deleteItem(ID : "${item.ID}")
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
                    this.$forceUpdate()
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created(){
        this.$apollo.query({
            
            query: gql`query {
                items {
                    ID,
                    user{UserName},
                    taker{ID, TakerName},
                    ItemName,
                    RoomFound,
                    PCNumber,
                    FoundDate,
                    FoundShift,
                    ItemImage
                }
              }`,
            
            }).then((data) => {
                this.length = data.data.items.length
                this.$apollo.query({
            
                    query: gql`query {
                        items (skip: ${(this.page-1)*15}, take: ${15}){
                            ID,
                            user{UserName},
                            taker{ID, TakerName},
                            ItemName,
                            RoomFound,
                            PCNumber,
                            FoundDate,
                            FoundShift,
                            ItemImage
                        }
                      }`,
                    
                    }).then((data) => {
                        console.log(data)
                        this.list = data.data.items
                        this.loading = false
                    }).catch((err) => {
                        console.log(err)
                    })
            }).catch((err) => {
                console.log(err)
            })

        
    }

}