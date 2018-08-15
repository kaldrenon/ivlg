<template>
  <div>
    <h4>Horizontal Logo with Abbreviated Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-short-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'

export default {
  name: 'WideLogoShortInverse',
  data () {
    return Object.assign(this.config, { svgData: null })
  },
  props: [
    'config', 'schoolName', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'intervarsity-' + this.shortName + '-wide-inverse.png'
    },
    svgName: function () {
      return 'intervarsity-' + this.shortName + '-wide-inverse.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var img = document.getElementById('image-holder-wide-inverse')
      for (let ctx of [context, ctxSvg]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
        ctx.fillStyle = 'white'

        this.wrapText(ctx, this.shortName.toUpperCase(), this.rightOffset, this.textDrop, 700, '27px', 'Avenir')
      }

      this.svgData = ctxSvg.getSerializedSvg()
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      context.font = fontSize + ' ' + fontFace
      context.textAlign = 'right'
      context.fillText(text, x, y)
      return y
    },
    downloadLogo () {
      console.log('not implemented yet')
    }
  }
}
</script>

<style scoped>
.cnv-logo {
  background: #006680;
}
</style>
