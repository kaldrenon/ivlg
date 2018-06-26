<template>
  <div id="container">
    <div id="wrapper">
      <h4>Enter Name Of School into text box.</h4>
      <img id="image-holder" src='../assets/image/IV-logo-wide2.svg'>
      <input
        id="sourceText1"
        type="text"
        style="width:500px"
        placeholder="School Name"
        v-focus
        v-model="schoolName"
        v-on:keyup="redrawText()" />

      <span>
        Use "AT":
        <input id="chk-at" type="checkbox" :value="useAt" />
      </span>

      <div id="canvas-container">
        <canvas id="cnv-logo" width=700 height=130></canvas>
      </div>

      <div id="actions">
        <a class="btn btn-primary"
          id="btn-download"
          v-on:click="downloadLogo()"
          v-show="showButtons">
          Download logo as a PNG
        </a>
        <a class="btn btn-secondary"
          id="brn-reload"
          v-on:click="resetPage()"
          v-show="showButtons">
          Reset Page
        </a>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'WideLogoForm',
  data () {
    return {
      src: '../assets/image/IV-logo-wide2.svg',
      textoffset: 155,
      textdrop: 120,
      atoffset: 0,
      schoolName: 'Your School Name Here',
      useAt: false,
      showButtons: true
    }
  },
  mounted () {
    this.redrawText()
  },
  methods: {
    redrawText () {
      var canvas = document.getElementById('cnv-logo')
      var context = canvas.getContext('2d')
      var img = document.getElementById('image-holder')
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, 700, 120)
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
    },
    resetPage () {
      this.schoolName = ''
      this.redrawText()
    },
    downloadLogo () {
      console.log('not implemented yet')
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
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#actions .btn {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 2px;
}

#actions .btn:hover {
  color: white;
  background: #ccc;
}

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
