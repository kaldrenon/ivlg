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
    'config', 'schoolName', 'shortName'
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
      var canvas = document.getElementById('cnv-logo-wide-full')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
      context.fillStyle = '#666'

      this.wrapText(context, this.schoolName.toUpperCase(), this.textOffset, this.textDrop, this.canvasWidth)
    },
    wrapText (context, text, x, y, maxWidth) {
      var fontMax = 26
      var fontMin = 20

      var tooLong = true
      for (var n = fontMax; n >= fontMin; n--) {
        context.font = n + 'px Avenir'
        var metrics = context.measureText(text)
        console.log('n: ' + n + ' width: ' + metrics.width)
        if (metrics.width < this.logoWidth) {
          tooLong = false
          context.fillText(text, x, y)
          break
        }
      }

      if (tooLong) {
        document.getElementById('school-name-field').classList.add('error')
      } else {
        document.getElementById('school-name-field').classList.remove('error')
      }
      return y
    }
  }
}
</script>

<style>
</style>
