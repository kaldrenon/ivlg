<template>
  <div>
    <h4>Round Logo with School Short Name (Inverse Color)</h4>
    <div id="canvas-container">
      <canvas class='cnv-logo' id="cnv-logo-square-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareLogoInverse',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName'
  ],
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      console.log('square-inverse redraw')
      var canvas = document.getElementById('cnv-logo-square-inverse')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-square-inverse')

      // TODO: Temporary workaround for inverted color background; update SVG and remove
      context.rect(0, 0, 250, 250)
      context.fillStyle = '#006680'
      context.fill()

      // context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
      context.fillStyle = 'white'

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

<style>
</style>
