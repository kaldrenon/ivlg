<template>
  <div>
    <img id="image-holder-square" src='../assets/image/IV-logo-square.svg'>
    <div id="canvas-container">
      <canvas id="cnv-logo-square" width=300 height=300></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SquareLogoForm',
  data () {
    return {
      defaults: {
        src: '../assets/image/IV-logo-square.svg',
        textoffset: 0,
        textdrop: 280
      }
    }
  },
  props: [
    'schoolName', 'shortName'
  ],
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo-square')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder-square')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 30, 10, 240, 240)
      context.fillStyle = '#939598'

      this.wrapText(context, this.shortName, this.textoffset, this.textdrop, 300, '60px', 'Avenir') // 700/27px for wide, 500/60px for square
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
    }
  }
}
</script>

<style>
#cnv-logo-square {
  border: 1px solid #eee;
  margin: 15px auto;
  -moz-box-shadow:    3px 3px 3px 3px #ddd;
  -webkit-box-shadow: 3px 3px 3px 3px #ddd;
  box-shadow:         3px 3px 3px 3px #ddd;
}

#image-holder-square {
  display: none;
}
</style>
