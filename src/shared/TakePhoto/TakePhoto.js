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
      this.$parent.$parent.loading = true
      this.canvas = this.$refs.canvas;
      var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
      if (this.captures.length > 1) this.captures.splice(0, this.captures.length)
      this.captures.push(canvas.toDataURL("image/png"));
      var dataURL = canvas.toDataURL('image/png')

      this.$parent.$parent.loading = false
      //Comment when success
      this.$parent.updatePicture(dataURL)
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
