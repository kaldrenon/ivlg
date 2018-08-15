<template>
  <div>
    <h4>Horizontal Logo with School/Area/Region Full Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-full" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'

export default {
  name: 'WideLogoForm',
  data () {
    return Object.assign(this.config, { svgData: null })
  },
  props: [
    'config', 'multiline', 'schoolName', 'secondLine', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'intervarsity-' + this.schoolName + '-default.png'
    },
    svgName: function () {
      return 'intervarsity-' + this.schoolName + '-default.svg'
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
      var canvas = document.getElementById('cnv-logo-wide-full')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var text = this.schoolName.toUpperCase()
      var tooLong = true
      var metrics

      for (let ctx of [context, ctxSvg]) {
        // Clear the canvas and draw the base logo
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        ctx.drawImage(
          document.getElementById('image-holder-wide'),
          this.logoStartX,
          this.logoStartY,
          this.logoWidth,
          this.logoHeight)
        ctx.fillStyle = '#666'

        if (this.multiline) {
          var textTwo = this.secondLine.toUpperCase()
          ctx.font = this.lineTwoFontSize + 'px Avenir'
          metrics = ctx.measureText(text)
          var metricsTwo = ctx.measureText(textTwo)

          if (metrics.width < this.logoWidth && metricsTwo.width < this.logoWidth) {
            tooLong = false
            ctx.fillText(text, this.textOffset, this.lineOneDrop)
            ctx.fillText(textTwo, this.textOffset, this.lineTwoDrop)
          }
        } else {
          // Step down permissible font sizes; if the text fits, draw and break
          for (var n = this.fontMax; n >= this.fontMin; n--) {
            ctx.font = n + 'px Avenir'

            metrics = ctx.measureText(text)
            if (metrics.width < this.logoWidth) {
              tooLong = false
              ctx.fillText(text, this.textOffset, this.textDrop)
              break
            }
          }
        }
      }

      // Notify user when they overflow at min font size
      if (tooLong) {
        document.getElementById('school-name-field').classList.add('error')
      } else {
        document.getElementById('school-name-field').classList.remove('error')
      }

      this.svgData = ctxSvg.getSerializedSvg()

      return this.textDrop
    }
  }
}
</script>

<style scoped>
</style>
