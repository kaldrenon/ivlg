<template>
  <div>
    <h4>Wide Logo with School Full Name (Inverse Color)</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WideLogoInverse',
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
      var canvas = document.getElementById('cnv-logo-wide-inverse')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide-inverse')
      context.clearRect(0, 0, canvas.width, canvas.height)

      // TODO: Temporary workaround for inverted color background; update SVG and remove
      context.rect(0, 0, this.canvasWidth, this.canvasHeight)
      context.fillStyle = '#006680'
      context.fill()

      context.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
      context.fillStyle = 'white'

      this.wrapText(context, this.schoolName.toUpperCase(), this.textOffset, this.textDrop, this.canvasWidth, '27px', 'Avenir')
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      var words = text.split(' ')
      var line = ''
      var lineHeight = fontSize

      context.font = fontSize + ' ' + fontFace

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' '
        var metrics = context.measureText(testLine)
        var testWidth = metrics.width
        if (testWidth > maxWidth) {
          context.fillText(line, x, y)
          line = words[n] + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }
      context.fillText(line, x, y)
      return y
    },
    downloadLogo () {
      console.log('not implemented yet')
    }
  }
}
</script>

<style>
</style>
