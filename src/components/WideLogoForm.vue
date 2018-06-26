<template>
  <div id="container">

    <h4>Enter Name Of School into text box.</h4>
    <input
      id="sourceText1"
      type="text"
      style="width:500px"
      placeholder="School Name"
      v-model="schoolName"
      v-on:keyup="redrawText()" />

    <span>
      Use "AT":
      <input id="checkbox1" type="checkbox" :value="useAt" />
    </span>

    <canvas id="drawingboard" width=700 height=130></canvas>

    <div id="actions">
      <a class="btn btn-primary" id="btn-download" v-show="showButtons">
        Download logo as a PNG
      </a>
      <a class="btn btn-secondary" id="brn-reload" v-show="showButtons">
        Reset Page
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WideLogoForm',
  data () {
    return {
      img: new Image(),
      src: 'image/IV-logo-wide2.svg',
      textoffset: 155,
      textdrop: 120,
      atoffset: 0,
      schoolName: '',
      submit: 'Submit',
      useAt: false,
      showButtons: false
    }
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('drawingboard')
      var context = canvas.getContext('2d')
      this.img.src = this.src
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(this.img, 0, 0, 700, 120)
      context.fillStyle = '#939598'

      this.showButtons = true

      if (this.useAt) {
        this.wrapText(context, 'AT', this.textoffset, this.textdrop - 5, 1900, '15px', 'Avenir')
        this.atoffset = 20
      } else {
        this.atoffset = 0
      }

      this.wrapText(context, this.schoolName, this.textoffset + this.atoffset, this.textdrop, 700, '27px', 'Avenir') // 700/27px for wide, 500/60px for square
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
#container {
  max-width: 840px;
  margin-left: auto;
  margin-right: auto;
}

#actions {
  margin: 10px;
}
</style>
