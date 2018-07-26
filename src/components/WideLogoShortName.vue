<template>
  <div>
    <h4>Wide Logo with School Full Name</h4>
    <div id="canvas-container">
      <canvas class="cnv-logo" id="cnv-logo-wide-short" width=700 height=130></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WideLogoShortName',
  data () {
    return {
      src: '../assets/image/IV-logo-wide2.svg',
      textoffset: 155,
      textdrop: 120
    }
  },
  props: [
    'schoolName', 'shortName'
  ],
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-wide-short')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-wide')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, 700, 120)
      context.fillStyle = '#939598'

      this.wrapText(context, this.shortName, this.textoffset, this.textdrop, 700, '27px', 'Avenir') // 700/27px for wide, 500/60px for square
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
