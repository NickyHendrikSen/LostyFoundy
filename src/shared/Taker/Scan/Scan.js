import Vue from 'vue'
import gql from 'graphql-tag'

export default {
  name: "Scan",
  data() {
    return {
      
    }
  },
  methods: {

    getLast(){
      this.$parent.loading = true
      this.$apollo.query({
                
        query: gql`
        query {
            taps (take: 1) {
              ID,
              card{
              ID,
              BNID,
                NIM,
                Name,
              }
            }
          }`,
        
        }).then((data) => {
            this.loading = false
            this.$parent.updateScan(data.data.taps[0])
        }).catch((err) => {
            this.loading = false
        })
      
    }   
  },
  mounted() {
   
  },

}
