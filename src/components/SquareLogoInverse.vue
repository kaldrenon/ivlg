<template>
  <div>
    <h4>Vertical Logo with School Short Name</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
      <canvas class='cnv-logo-large' id="cnv-logo-square-inverse-large" :width="this.large.canvasWidth" :height="this.large.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'

export default {
  name: 'SquareLogoInverse',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName', 'svgData'
  ],
  computed: {
    fileName: function () {
      return 'InterVarsity Vertical Logo_white.png'
    },
    fileNameLarge: function () {
      return 'InterVarsity Vertical Logo_white_print.png'
    },
    svgName: function () {
      return 'InterVarsity Vertical Logo_white.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-square-inverse')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    },
    imageDataLarge: function () {
      var canvas = document.getElementById('cnv-logo-square-inverse-large')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-square-inverse')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var img = document.getElementById('image-holder-square-inverse')

      for (let ctx of [context, ctxSvg]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
        ctx.fillStyle = 'white'

        ctx.font = this.fontSize + 'px Avenir'
        ctx.textAlign = 'center'
        ctx.fillText(this.shortName.toUpperCase(), this.textOffset, this.textDrop)
      }
      this.svgData = ctxSvg.getSerializedSvg()
      this.redrawTextLarge()
    },
    redrawTextLarge () {
      var canvas = document.getElementById('cnv-logo-square-inverse-large')
      var ctx = canvas.getContext('2d')
      var img = document.getElementById('image-holder-square-inverse')

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, this.large.logoStartX, this.large.logoStartY, this.large.logoWidth, this.large.logoHeight)
      ctx.fillStyle = 'white'

      ctx.font = this.large.fontSize + 'px Avenir'
      ctx.textAlign = 'center'
      ctx.fillText(this.shortName.toUpperCase(), this.large.textOffset, this.large.textDrop)
    }
  }
}
</script>

<style scoped>
#cnv-logo-square-inverse, #cnv-logo-square-inverse-large {
  background: #006680;
}
</style>
