<template>
  <div>
    <h4>Horizontal Logo with Abbreviated Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-short-inverse" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
      <canvas class="cnv-logo-large" id="cnv-logo-wide-short-inverse-large" :width="this.large.canvasWidth" :height="this.large.canvasHeight"></canvas>
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
  name: 'WideLogoShortInverse',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'InterVarsity Horizontal Logo_abbrev_white.png'
    },
    fileNameLarge: function () {
      return 'InterVarsity Horizontal Logo_abbrev_white_print.png'
    },
    svgData: function () {
      var pathOpts = {
        x: this.config.rightOffset,
        y: this.config.lineOneDrop,
        anchor: 'right',
        fontSize: this.fontCurSize,
        attributes: {
          fill: 'white',
          stroke: 'none'
        }
      }
      console.log(pathOpts)
      console.log(textToSVG)

      var svg = this.svgRawInverse
      var textTag = textToSVG.getPath(this.shortName.trim().toUpperCase(), pathOpts)

      svg = svg.replace('REPLACE_ME', textTag)
      return svg
    },
    svgName: function () {
      return 'InterVarsity Horizontal Logo_abbrev_white.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    },
    imageDataLarge: function () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse-large')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var img = document.getElementById('image-holder-wide-inverse')
      var fontList = '"AvenirInterVarsity", Avenir, Helvetica, Arial, sans-serif'

      for (let ctx of [context, ctxSvg]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)

        ctx.fillStyle = 'white'
        ctx.font = this.fontMax + 'px ' + fontList
        ctx.textAlign = 'right'
        ctx.fillText(this.shortName.trim().toUpperCase(), this.rightOffset, this.textDrop)
      }

      this.svgData = ctxSvg.getSerializedSvg()
      this.redrawTextLarge()
    },
    redrawTextLarge () {
      var canvas = document.getElementById('cnv-logo-wide-short-inverse-large')
      var ctx = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide-inverse')
      var fontList = '"AvenirInterVarsity", Avenir, Helvetica, Arial, sans-serif'

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, this.large.logoStartX, this.large.logoStartY, this.large.logoWidth, this.large.logoHeight)
      ctx.fillStyle = 'white'

      ctx.font = this.large.fontMax + 'px ' + fontList
      ctx.textAlign = 'right'
      ctx.fillText(this.shortName.trim().toUpperCase(), this.large.rightOffset, this.large.textDrop)
    }
  }
}
</script>

<style scoped>
#cnv-logo-wide-short-inverse, #cnv-logo-wide-short-inverse-large {
  background: #006680;
}
</style>
