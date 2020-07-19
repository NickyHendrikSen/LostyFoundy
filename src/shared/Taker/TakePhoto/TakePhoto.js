import Vue from 'vue'
import gql from 'graphql-tag'

function blobToFile(theBlob, fileName){
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

export default {
  name: "TakePhoto",
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
    }
  },
  methods: {

    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
      if (this.captures.length > 1) this.captures.splice(0, this.captures.length)
      this.captures.push(canvas.toDataURL("image/png"));
      var dataURL = canvas.toDataURL('image/png')

      //Comment when success
      this.$parent.updatePicture("123", dataURL)
      this.$parent.typeClose()
      //

      const mutation = {
        query: `
                  mutation {
                      readPhoto({photo : ${dataURL}, type : "KTP"}){
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
        .then(res => {
          alert('Success')
          this.$parent.updatePicture(res.data, dataURL)
          this.$parent.typeClose()
        })
        .then(resData => {
          console.log(resData)
        })
        .catch(err => {
          console.log(err);
        });


    }
  },
  mounted() {
    this.video = this.$refs.video;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.video.srcObject = stream
        // this.video.src = window.URL.createObjectURL(stream);
        this.video.play();
      });
    }
  },

}
