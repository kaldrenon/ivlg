<template>
  <div>
    <h4>Wide Logo with School Full Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-full" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WideLogoForm',
  data () {
    return this.config
  },
  props: [
    'config', 'multiline', 'schoolName', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'intervarsity-' + this.schoolName + '-default.png'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-full')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      console.log('multiline: ' + this.multiline)
      var context = document.getElementById('cnv-logo-wide-full').getContext('2d')
      var text = this.schoolName.toUpperCase()
      // var fontMax = 26
      // var fontMin = 20
      var tooLong = true

      // Clear the canvas and draw the base logo
      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      context.drawImage(
        document.getElementById('image-holder-wide'),
        this.logoStartX,
        this.logoStartY,
        this.logoWidth,
        this.logoHeight)
      context.fillStyle = '#666'

      // Step down permissible font sizes; if the text fits, draw and break
      for (var n = this.fontMax; n >= this.fontMin; n--) {
        context.font = n + 'px Avenir'

        var metrics = context.measureText(text)
        if (metrics.width < this.logoWidth) {
          tooLong = false
          context.fillText(text, this.textOffset, this.textDrop)
          break
        }
      }

      // Notify user when they overflow at min font size
      if (tooLong) {
        document.getElementById('school-name-field').classList.add('error')
      } else {
        document.getElementById('school-name-field').classList.remove('error')
      }
      return this.textDrop
    }
  }
}
</script>

<style scoped>
</style>
