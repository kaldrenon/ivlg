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
  computed: {
    fileName: function () {
      return 'intervarsity-' + this.schoolName + '-inverse.png'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-inverse')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var context = document.getElementById('cnv-logo-wide-inverse').getContext('2d')
      var text = this.schoolName.toUpperCase()
      var fontMax = 26
      var fontMin = 20
      var tooLong = true

      // Clear the canvas and draw the base logo
      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      context.drawImage(
        document.getElementById('image-holder-wide-inverse'),
        this.logoStartX,
        this.logoStartY,
        this.logoWidth,
        this.logoHeight)
      context.fillStyle = 'white'

      // Step down permissible font sizes; if the text fits, draw and break
      for (var n = fontMax; n >= fontMin; n--) {
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
    },
    downloadLogo () {
      console.log('not implemented yet')
    }
  }
}
</script>

<style>
#cnv-logo-wide-inverse {
  background: #006680;
}
</style>
