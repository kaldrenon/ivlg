<template>
  <div>
    <h4>Vertical Logo with Abbreviated Name</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
      <canvas class='cnv-logo-large' id="cnv-logo-square-large" :width="this.large.canvasWidth" :height="this.large.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'
import avenir from '@/avenir'

export default {
  name: 'SquareLogoForm',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'InterVarsity Vertical Logo.png'
    },
    fileNameLarge: function () {
      return 'InterVarsity Vertical Logo_print.png'
    },
    svgData: function () {
      var svg = this.svgRaw
      var textTag = '<text fill="#666" stroke="none" font-family="Avenir" font-size="20px" font-style="normal" font-weight="normal" text-decoration="normal" x="125" y="235" text-anchor="middle" dominant-baseline="alphabetic">' + this.shortName.toUpperCase() + '</text>'
      svg = svg.replace('REPLACE_ME', textTag)
      svg = svg.replace(/<defs\/>/, avenir)
      return svg
    },
    svgName: function () {
      return 'InterVarsity Vertical Logo.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-square')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    },
    imageDataLarge: function () {
      var canvas = document.getElementById('cnv-logo-square-large')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  nted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-square')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var img = document.getElementById('image-holder-square')

      for (let ctx of [context, ctxSvg]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
        ctx.fillStyle = '#666'

        ctx.font = this.fontSize + 'px Avenir'
        ctx.textAlign = 'center'
        ctx.fillText(this.shortName.toUpperCase(), this.textOffset, this.textDrop)
      }

      this.svgData = ctxSvg.getSerializedSvg()
      this.redrawTextLarge()
    },
    redrawTextLarge () {
      var canvas = document.getElementById('cnv-logo-square-large')
      var ctx = canvas.getContext('2d')
      var img = document.getElementById('image-holder-square')

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, this.large.logoStartX, this.large.logoStartY, this.large.logoWidth, this.large.logoHeight)
      ctx.fillStyle = '#666'

      ctx.font = this.large.fontSize + 'px Avenir'
      ctx.textAlign = 'center'
      ctx.fillText(this.shortName.toUpperCase(), this.large.textOffset, this.large.textDrop)
    }
  }
}
</script>

<style scoped>
</style>
