<template>
  <div>
    <h4>Horizontal Logo with Abbreviated Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-short" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
      <canvas class="cnv-logo-large" id="cnv-logo-wide-short-large" :width="this.large.canvasWidth" :height="this.large.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
import C2S from 'canvas2svg'
import avenir from '@/avenir'

export default {
  name: 'WideLogoShortName',
  data () {
    return this.config
  },
  props: [
    'config', 'schoolName', 'shortName'
  ],
  computed: {
    fileName: function () {
      return 'InterVarsity Horizontal Logo_abbrev.png'
    },
    fileNameLarge: function () {
      return 'InterVarsity Horizontal Logo_abbrev_print.png'
    },
    svgData: function () {
      var svg = this.svgRaw
      var textTag = '<text fill="#666" stroke="none" font-family="Avenir" font-size="26px" font-style="normal" font-weight="normal" text-decoration="normal" x="390" y="110" text-anchor="end" dominant-baseline="alphabetic">' + this.shortName.toUpperCase() + '</text>'
      svg = svg.replace('REPLACE_ME', textTag)
      svg = svg.replace(/<defs\/>/, avenir)
      return svg
    },
    svgName: function () {
      return 'InterVarsity Horizontal Logo_abbrev.svg'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-short')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    },
    imageDataLarge: function () {
      var canvas = document.getElementById('cnv-logo-wide-short-large')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-short')
      var context = canvas.getContext('2d')
      var ctxSvg = new C2S(canvas.width, canvas.height)
      var img = document.getElementById('image-holder-wide')
      for (let ctx of [context, ctxSvg]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
        ctx.fillStyle = '#666'

        this.wrapText(ctx, this.shortName.toUpperCase(), this.rightOffset, this.textDrop, 700, '27px', 'Avenir')
      }

      this.svgData = ctxSvg.getSerializedSvg()
      this.redrawTextLarge()
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      context.font = fontSize + ' ' + fontFace
      context.textAlign = 'right'
      context.fillText(text, x, y)
      return y
    },
    redrawTextLarge () {
      var canvas = document.getElementById('cnv-logo-wide-short-large')
      var ctx = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide')

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, this.large.logoStartX, this.large.logoStartY, this.large.logoWidth, this.large.logoHeight)
      ctx.fillStyle = '#666'

      ctx.font = this.large.fontMax + 'px Avenir'
      ctx.textAlign = 'right'
      ctx.fillText(this.shortName.toUpperCase(), this.large.rightOffset, this.large.textDrop)
    }
  }
}
</script>

<style scoped>
#cnv-logo {
  border: 1px solid #eee;
  margin: 15px auto;
  -moz-box-shadow:    3px 3px 3px 3px #ddd;
  -webkit-box-shadow: 3px 3px 3px 3px #ddd;
  box-shadow:         3px 3px 3px 3px #ddd;
}

#image-holder {
  display: none;
}
</style>
