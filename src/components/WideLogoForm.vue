<template>
  <div>
    <h4>Horizontal Logo with School/Area/Region Full Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-full" :width="this.canvasWidth" :height="this.currentCanvasHeight"></canvas>
      <canvas class="cnv-logo-large" id="cnv-logo-wide-full-large" :width="this.large.canvasWidth" :height="this.currentCanvasHeight * 3.125"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'
import avenir from '@/avenir'

const TextToSVG = require('text-to-svg')
var textToSVG = null
TextToSVG.load('../assets/AvenirLTStd-Light.otf', function (err, ttsObj) {
  if (err) {
    console.error(err)
  }

  console.log(ttsObj)
  textToSVG = ttsObj
})

export default {
  name: 'WideLogoForm',
  data () {
    return this.config
  },
  props: [
    'config', 'multiline', 'schoolName', 'secondLine', 'shortName'
  ],
  computed: {
    currentCanvasHeight: function () {
      if (this.multiline) {
        return this.lineTwoCanvasHeight
      } else {
        return this.canvasHeight
      }
    },
    fileName: function () {
      return 'InterVarsity Horizontal Logo_full.png'
    },
    fileNameLarge: function () {
      return 'InterVarsity Horizontal Logo_full_print.png'
    },
    svgData: function () {
      var pathOpts = {
        x: this.config.textOffset,
        y: this.config.lineOneDrop,
        fontSize: this.fontCurSize,
        attributes: {
          fill: '#666',
          stroke: 'none'
        }
      }
      console.log(pathOpts)
      console.log(textToSVG)

      var svg = this.svgRaw
      var textTag = ''
      if (this.multiline) {
        svg = svg.replace('width="400px" height="120" viewBox="0 0 400 120"', 'width="400px" height="140" viewBox="0 0 400 140"')

        // Update specs for multiline
        pathOpts.fontSize = this.lineTwoFontSize
        var lineOne = textToSVG.getPath(this.schoolName.trim().toUpperCase(), pathOpts)

        pathOpts.y = this.config.lineTwoDrop
        var lineTwo = textToSVG.getPath(this.secondLine.trim().toUpperCase(), pathOpts)
        textTag = lineOne + lineTwo
      } else {
        textTag = textToSVG.getPath(this.schoolName.trim().toUpperCase(), pathOpts)
      }
      svg = svg.replace('REPLACE_ME', textTag)
      return svg
    },
    svgName: function () {
      return 'InterVarsity Horizontal Logo_full.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-full')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    },
    imageDataLarge: function () {
      var canvas = document.getElementById('cnv-logo-wide-full-large')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-full')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var text = this.schoolName.trim().toUpperCase()
      var tooLong = true
      var metrics
      var fontList = '"AvenirInterVarsity", Avenir, Helvetica, Arial, sans-serif'

      for (let ctx of [context, ctxSvg]) {
        // Clear the canvas and draw the base logo
        ctx.clearRect(0, 0, this.canvasWidth, this.currentCanvasHeight)
        ctx.drawImage(
          document.getElementById('image-holder-wide'),
          this.logoStartX,
          this.logoStartY,
          this.logoWidth,
          this.logoHeight)
        ctx.fillStyle = '#666'

        if (this.multiline) {
          var textTwo = this.secondLine.trim().toUpperCase()
          ctx.font = this.lineTwoFontSize + 'px ' + fontList
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
            ctx.font = n + 'px ' + fontList

            metrics = ctx.measureText(text)
            if (metrics.width < this.logoWidth) {
              tooLong = false
              this.fontCurSize = n
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

      this.redrawTextLarge()
      return this.textDrop
    },
    redrawTextLarge () {
      var canvas = document.getElementById('cnv-logo-wide-full-large')
      var ctx = canvas.getContext('2d')
      var text = this.schoolName.trim().toUpperCase()
      var metrics
      var fontList = '"AvenirInterVarsity", Avenir, Helvetica, Arial, sans-serif'

      ctx.clearRect(0, 0, this.large.canvasWidth, this.currentCanvasHeight * 3.125)
      ctx.drawImage(
        document.getElementById('image-holder-wide'),
        this.large.logoStartX,
        this.large.logoStartY,
        this.large.logoWidth,
        this.large.logoHeight)
      ctx.fillStyle = '#666'

      if (this.multiline) {
        var textTwo = this.secondLine.trim().toUpperCase()
        ctx.font = this.large.lineTwoFontSize + 'px ' + fontList
        metrics = ctx.measureText(text)
        var metricsTwo = ctx.measureText(textTwo)

        if (metrics.width < this.large.logoWidth && metricsTwo.width < this.large.logoWidth) {
          ctx.fillText(text, this.large.textOffset, this.large.lineOneDrop)
          ctx.fillText(textTwo, this.large.textOffset, this.large.lineTwoDrop)
        }
      } else {
        // Step down permissible font sizes; if the text fits, draw and break
        for (var n = this.large.fontMax; n >= this.large.fontMin; n--) {
          ctx.font = n + 'px ' + fontList

          metrics = ctx.measureText(text)
          if (metrics.width < this.large.logoWidth) {
            ctx.fillText(text, this.large.textOffset, this.large.textDrop)
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
