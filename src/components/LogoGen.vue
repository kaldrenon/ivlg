<template>
  <div id="container">
    <help-box></help-box>
    <img class="image-holder" id="image-holder-wide" src='../assets/image/WideNormal.svg'>
    <img class="image-holder" id="image-holder-wide-inverse" src='../assets/image/WideDarkBg.svg'>
    <img class="image-holder" id="image-holder-square" src='../assets/image/SquareNormal.svg'>
    <img class="image-holder" id="image-holder-square-inverse" src='../assets/image/SquareNormalDarkBg.svg'>
    <h4>Fill out the form below; logos using your inputs will be automatically generated for you.</h4>

    <label id="name-label" for="txt-school">Your Name (required)</label>
    <input
      id="txt-name"
      placeholder="Your Name (required)"
      style="width:400px"
      tabindex="1"
      type="text"
      v-focus
      v-on:keyup="validateName()"
      v-model="userName" />

    <label id="email-label" for="txt-email">Email Address (required)</label>
    <input
      id="txt-email"
      placeholder="name@intervarsity.org"
      style="width:400px"
      tabindex="2"
      type="text"
      v-on:keyup="validateEmail()"
      v-model="userEmail" />

    <div id="school-name-field">
      <button
        id="multiline-on"
        name="multiline-on"
        tabindex="5"
        type="checkbox"
        v-on:click="toggleMultiline()">
        Add Second Text Line
      </button>

      <label for="txt-school">School/Area/Region Full Name (e.g. University of College)</label>
      <input
        id="txt-school"
        placeholder="School Name"
        style="width:400px"
        tabindex="3"
        type="text"
        v-model="schoolName"
        v-on:keyup="redrawText()" />

      <div id="multiline-container">
        <label for="txt-line-two">Second Text Line</label>
        <input
          id="txt-line-two"
          style="width:400px"
          tabindex="6"
          type="text"
          v-model="secondLine"
          v-on:keyup="redrawText()" />
      </div>
      <span class="error-message">Sorry, that name is too long.</span>
    </div>
    <label for="txt-school-short">Abbreviated Name (e.g. UofC)</label>
    <input
      id="txt-school-short"
      maxlength="10"
      placeholder="Short Name"
      style="width:200px"
      tabindex="4"
      type="text"
      v-model="shortName"
      v-on:keyup="redrawText()" />

    <div id="actions">
      <a class="btn btn-primary"
         href="#"
         id="btn-download"
         tabindex="7"
         v-on:click="downloadLogos($event)"
         v-show="showButtons">
        Download ZIP
      </a>
      <a class="btn btn-secondary"
         href="#"
         id="brn-reload"
         tabindex="8"
         v-on:click="resetPage()"
         v-show="showButtons">
        Reset Page
      </a>
    </div>

    <hr>

    <div id="previews-container" class="hidden">
      <span id="preview-info">Previews will show once you start entering a name!</span>
      <div id="previews">
        <h1>Logo Previews</h1>

        <div class="two-columns">
          <div id="default-logos">
            <h2>Standard Logos</h2>
            <wide-logo-form :config="wide" :schoolName="schoolName" :secondLine="secondLine" :multiline="multilineOn"></wide-logo-form>
            <wide-logo-short :config="wide" :shortName="shortName"></wide-logo-short>
            <square-logo-form :config="square" :shortName="shortName"></square-logo-form>
          </div>
          <div id="inverse-logos">
            <h2>Logos for Dark Backgrounds</h2>
            <wide-logo-inverse :config="wide" :schoolName="schoolName" :secondLine="secondLine" :multiline="multilineOn"></wide-logo-inverse>
            <wide-short-inverse :config="wide" :shortName="shortName" :secondLine="secondLine"></wide-short-inverse>
            <square-logo-inverse :config="square" :shortName="shortName"></square-logo-inverse>
            <p>Note: the color you see here is just for demo purposes; the logos you download will have a transparent background.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import Vue from 'vue'
import SquareLogoForm from '@/components/SquareLogoForm'
import SquareLogoInverse from '@/components/SquareLogoInverse'
import WideLogoForm from '@/components/WideLogoForm'
import WideLogoInverse from '@/components/WideLogoInverse'
import WideLogoShortName from '@/components/WideLogoShortName'
import WideLogoShortInverse from '@/components/WideLogoShortInverse'
import HelpBox from '@/components/HelpBox'

import avenir from '@/avenir'

// Utils
import ajax from 'vuejs-ajax'
import JSZip from 'jszip'
import { saveAs } from 'file-saver/FileSaver'
const uuidv4 = require('uuid/v4')

Vue.use(ajax)

export default {
  name: 'LogoGen',
  components: {
    'wide-logo-form': WideLogoForm,
    'wide-logo-inverse': WideLogoInverse,
    'wide-logo-short': WideLogoShortName,
    'wide-short-inverse': WideLogoShortInverse,
    'square-logo-inverse': SquareLogoInverse,
    'square-logo-form': SquareLogoForm,
    'help-box': HelpBox
  },
  data () {
    return {
      schoolName: 'Your School Name Here',
      shortName: 'UofC',
      userName: '',
      userEmail: '',
      showButtons: true,
      multilineOn: false,
      secondLine: '',
      wide: {
        canvasHeight: 120,
        canvasWidth: 400,
        fontMax: 26,
        fontMin: 20,
        lineOneDrop: 108,
        lineTwoCanvasHeight: 140,
        lineTwoDrop: 135,
        lineTwoFontSize: 21,
        logoHeight: 72,
        logoStartX: 10,
        logoStartY: 5,
        logoWidth: 380,
        rightOffset: 390,
        textDrop: 110,
        textOffset: 10,
        large: {
          canvasHeight: 330,
          canvasWidth: 1100,
          fontMax: 72,
          fontMin: 55,
          lineOneDrop: 297,
          lineTwoCanvasHeight: 385,
          lineTwoDrop: 371,
          lineTwoFontSize: 58,
          logoHeight: 198,
          logoStartX: 28,
          logoStartY: 14,
          logoWidth: 1045,
          rightOffset: 1072,
          textDrop: 303,
          textOffset: 28
        }
      },
      square: {
        canvasHeight: 250,
        canvasWidth: 250,
        fontSize: 20,
        logoHeight: 200,
        logoStartX: 35,
        logoStartY: 10,
        logoWidth: 180,
        textDrop: 235,
        textOffset: 125,
        large: {
          canvasHeight: 688,
          canvasWidth: 688,
          fontSize: 55,
          logoHeight: 550,
          logoStartX: 96,
          logoStartY: 28,
          logoWidth: 495,
          textDrop: 646,
          textOffset: 344
        }
      }
    }
  },
  methods: {
    toggleMultiline () {
      this.multilineOn = !this.multilineOn
      document.getElementById('multiline-container').classList.toggle('enabled')
      if (this.multilineOn) {
        document.getElementById('txt-line-two').focus()
        document.getElementById('multiline-on').textContent = 'Remove Second Text Line'
      } else {
        document.getElementById('multiline-on').textContent = 'Add Second Text Line'
      }
      document.getElementById('multiline-on').classList.toggle('active')
      this.redrawText()
    },
    redrawText () {
      this.showButtons = true
      document.getElementById('previews-container').classList.remove('hidden')

      for (let child of this.$children) {
        child.redrawText()
      }
    },
    downloadLogos (e) {
      e.preventDefault()
      if (document.getElementsByClassName('valid').length < 2) {
        alert('Please provide your name and email address!')
        return
      }
      this.redrawText()
      var zip = new JSZip()

      // Record data about the submission in json
      var timestamp = new Date()
      var submissionInfo = {
        name: this.userName,
        email: this.userEmail,
        schoolName: this.schoolName,
        shortName: this.shortName,
        timestamp: timestamp.toJSON(),
        uuid: uuidv4()
      }
      zip.file('submission.json', JSON.stringify(submissionInfo, null, 2))

      for (let child of this.$children) {
        if (child.fileName) {
          zip.file(child.fileName, child.imageData, { base64: true })
        }

        if (child.fileNameLarge) {
          zip.file(child.fileNameLarge, child.imageDataLarge, { base64: true })
        }

        if (child.svgName) {
          var fullSvg = child.svgData.replace(/<defs\/>/, avenir)

          if (child.svgName.includes(this.shortName)) {
            fullSvg = fullSvg.replace(/<image width="180"/, '<image x="35" y="10" width="180"')
          } else {
            fullSvg = fullSvg.replace(/<image width="380"/, '<image x="10" y="5" width="380"')
          }
          zip.file(child.svgName, fullSvg)
        }
      }
      zip.generateAsync({ type: 'base64' }).then(function (content) {
        var url = 'https://rta8nroxoc.execute-api.us-east-1.amazonaws.com/default/FileUpload?uuid=' + submissionInfo.uuid
        var oReq = new XMLHttpRequest()
        oReq.open('POST', url, true)
        oReq.send(content)
      })

      zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'intervarsity-logos.zip')
      })
    },
    resetPage () {
      this.userName = ''
      this.userEmail = ''
      this.schoolName = ''
      this.shortName = ''
      this.redrawText()
      var txt = document.getElementById('txt-school')
      txt.focus()
    },
    validateName () {
      if (this.userName) {
        document.getElementById('name-label').classList.add('valid')
      } else {
        document.getElementById('name-label').classList.remove('valid')
      }
    },
    validateEmail () {
      var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

      var result = regex.exec(this.userEmail)
      if (result) {
        document.getElementById('email-label').classList.add('valid')
      } else {
        document.getElementById('email-label').classList.remove('valid')
      }
    }
  }
}
</script>

            <style>
div#container {
  position: relative;
  max-width: 860px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

div#container h4 {
  margin: 0;
  margin-top: 40px;
}

div#container input, div#container label {
  display: block;
  text-align: left;
}

div#container label {
  margin-top: 5px;
}

div#container input {
  margin-bottom: 10px;
  padding: 3px 0;
}

button#multiline-on {
  border: 1px solid #888;
  padding: 3px 5px;
  float: right;
  background-image: none;
  background: #c8e6c9;
}

button#multiline-on.active {
  background-image: none;
  background: #ffcdd2;
}

div#container #multiline-container {
  display: none;
}

div#container #multiline-container.enabled {
  display: block;
}

#school-name-field .error-message {
  display: none;
}

#school-name-field.error .error-message {
  display: inline;
  color: red;
}

#school-name-field.error {
  background: #fee;
}

.valid {
  color: green;
}

#actions {
  margin: 20px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#actions .btn {
  text-decoration: none;
  color: #2c3e50;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 2px;
}

#actions .btn:hover {
  color: white;
  background: #006680;
  -moz-box-shadow:    1px 1px 1px 1px #ddd;
  -webkit-box-shadow: 1px 1px 1px 1px #ddd;
  box-shadow:         1px 1px 1px 1px #ddd;
}

.cnv-logo {
  border: 1px solid #eee;
  margin: 0;
  margin-top: 5px;
  -moz-box-shadow:    3px 3px 3px 3px #ddd;
  -webkit-box-shadow: 3px 3px 3px 3px #ddd;
  box-shadow:         3px 3px 3px 3px #ddd;
}

.cnv-logo-large {
  display: none;
}

.image-holder {
  display: none;
}

hr {
  margin-top: 50px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

#previews-container #preview-info {
  display: none;
}

#previews-container.hidden #preview-info {
  margin-top: 30px;
  text-align: center;
  display: block;
}

#previews-container.hidden #previews {
  display: none;
}

.two-columns {
  width: 100%
}

.two-columns div {
  width: 420px;
}

.two-columns div div {
  display: block
}

#default-logos {
  float: left;
}

#inverse-logos {
  float: right;
}

</style>
