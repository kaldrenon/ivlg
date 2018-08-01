<template>
  <div>
    <h4>Round Logo with School Short Name</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
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
      return 'intervarsity-' + this.shortName + '-default.png'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-square')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-square')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-square')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
      context.fillStyle = '#666'

      this.wrapText(context, this.shortName, this.textOffset, this.textDrop, this.canvasWidth, '20px', 'Avenir')
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      context.font = fontSize + ' ' + fontFace
      context.textAlign = 'center'
      context.fillText(text, x, y)
      return y
    }
  }
}
</script>

<style scoped>
</style>
