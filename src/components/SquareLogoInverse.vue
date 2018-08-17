<template>
  <div>
    <h4>Vertical Logo with School Short Name</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
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
      return 'intervarsity-' + this.shortName + '-inverse.png'
    },
    svgName: function () {
      return 'intervarsity-' + this.shortName + '-inverse.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-square-inverse')
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

        this.wrapText(ctx, this.shortName, this.textOffset, this.textDrop, this.canvasWidth, '20px', 'Avenir')
      }
      this.svgData = ctxSvg.getSerializedSvg()
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      context.font = fontSize + ' ' + fontFace
      context.textAlign = 'center'
      context.fillText(text.toUpperCase(), x, y)
      return y
    }
  }
}
</script>

<style scoped>
#cnv-logo-square-inverse {
  background: #006680;
}
</style>
