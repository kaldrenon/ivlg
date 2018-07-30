<template>
  <div>
    <h4>Wide Logo with School Short Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-short" :width="this.canvasWidth" :height="this.canvasHeight"></canvas>
    </div>
  </div>
</template>

<script>
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
      return 'intervarsity-' + this.shortName + '-wide.png'
    },
    imageData: function () {
      var canvas = document.getElementById('cnv-logo-wide-short')
      var data = canvas.toDataURL('image/png')
      return data.substr(data.indexOf(',') + 1)
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-short')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, this.logoStartX, this.logoStartY, this.logoWidth, this.logoHeight)
      context.fillStyle = '#666'

      this.wrapText(context, this.shortName.toUpperCase(), this.rightOffset, this.textDrop, 700, '27px', 'Avenir')
    },
    wrapText (context, text, x, y, maxWidth, fontSize, fontFace) {
      context.font = fontSize + ' ' + fontFace
      context.textAlign = 'right'
      context.fillText(text, x, y)
      return y
    },
    downloadLogo () {
      console.log('not implemented yet')
    }
  }
}
</script>

<style>
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
