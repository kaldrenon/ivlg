<template>
  <div>
    <h4>Vertical Logo with Abbreviated Name</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'

export default {
  name: 'SquareLogoForm',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName', 'svgData'
  ],
  computed: {
    fileName: function () {
      return 'intervarsity-' + this.shortName + '-default.png'
    },
    svgName: function () {
      return 'intervarsity-' + this.shortName + '-default.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-square')
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

        ctx.font = '20px Avenir'
        ctx.textAlign = 'center'
        ctx.fillText(this.shortName.toUpperCase(), this.textOffset, this.textDrop)
      }

      this.svgData = ctxSvg.getSerializedSvg()
    }
  }
}
</script>

<style scoped>
</style>
