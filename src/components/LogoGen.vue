<template>
  <div id="container">
    <help-box></help-box>
    <img class="image-holder" id="image-holder-wide" src='../assets/image/WideNormal.svg'>
    <img class="image-holder" id="image-holder-wide-inverse" src='../assets/image/WideDarkBg.svg'>
    <img class="image-holder" id="image-holder-square" src='../assets/image/SquareNormal.svg'>
    <img class="image-holder" id="image-holder-square-inverse" src='../assets/image/SquareNormalDarkBg.svg'>
    <h4>Fill out the form below; logos using your inputs will be automatically generated for you.</h4>

    <label for="txt-school">Your Name (required)</label>
    <input
      id="txt-name"
      type="text"
      style="width:400px"
      placeholder="Your Name (required)"
      v-focus
      v-model="userName" />

    <label for="txt-school">Email Address (required)</label>
    <input
      id="txt-email"
      type="text"
      style="width:400px"
      placeholder="name@intervarsity.org"
      v-model="userEmail" />

    <div id="school-name-field">
      <button
        type="checkbox"
        id="multiline-on"
        name="multiline-on"
        v-on:click="toggleMultiline()">
        Add Second Text Line
      </button>

      <label for="txt-school">School Full Name (e.g. University of College)</label>
      <input
        id="txt-school"
        type="text"
        style="width:400px"
        placeholder="School Name"
        v-model="schoolName"
        v-on:keyup="redrawText()" />

      <div id="multiline-container">
        <label for="txt-line-two">Second Text Line</label>
        <input
          id="txt-line-two"
          type="text"
          style="width:400px"
          v-model="secondLine"
          v-on:keyup="redrawText()" />
      </div>
      <span class="error-message">Sorry, that name is too long.</span>
    </div>
    <label for="txt-school-short">School Short Name (e.g. UofC)</label>
    <input
      id="txt-school-short"
      type="text"
      style="width:200px"
      placeholder="Short Name"
      v-model="shortName"
      v-on:keyup="redrawText()" />

    <div id="actions">
      <a class="btn btn-primary"
         href="#"
         id="btn-download"
         v-on:click="downloadLogos($event)"
         v-show="showButtons">
        Download ZIP
      </a>
      <a class="btn btn-secondary"
         href="#"
         id="brn-reload"
         v-on:click="resetPage()"
         v-show="showButtons">
        Reset Page
      </a>
    </div>

    <hr>
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
        <square-logo-inverse :config="square" :shortName="shortName"></square-logo-inverse>
        <p>Note: the color you see here is just for demo purposes; the logos you download will have a transparent background.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SquareLogoForm from '@/components/SquareLogoForm'
import SquareLogoInverse from '@/components/SquareLogoInverse'
import WideLogoForm from '@/components/WideLogoForm'
import WideLogoInverse from '@/components/WideLogoInverse'
import WideLogoShortName from '@/components/WideLogoShortName'
import HelpBox from '@/components/HelpBox'

import ajax from 'vuejs-ajax'
import JSZip from 'jszip'
import { saveAs } from 'file-saver/FileSaver'

Vue.use(ajax)

export default {
  name: 'LogoGen',
  components: {
    'wide-logo-form': WideLogoForm,
    'wide-logo-inverse': WideLogoInverse,
    'wide-logo-short': WideLogoShortName,
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
        textOffset: 10,
        rightOffset: 390,
        textDrop: 110,
        fontMax: 26,
        fontMin: 20,
        canvasWidth: 400,
        canvasHeight: 120,
        logoHeight: 72,
        logoStartX: 10,
        logoStartY: 5,
        logoWidth: 380,
        lineOneDrop: 94,
        lineTwoDrop: 110,
        lineTwoFontSize: 14
      },
      square: {
        textOffset: 125,
        textDrop: 235,
        canvasWidth: 250,
        canvasHeight: 250,
        logoHeight: 200,
        logoStartX: 25,
        logoStartY: 10,
        logoWidth: 200
      }
    }
  },
  methods: {
    toggleMultiline () {
      this.multilineOn = !this.multilineOn
      document.getElementById('multiline-container').classList.toggle('enabled')
      if (this.multilineOn) {
        document.getElementById('txt-line-two').focus()
      }
      this.redrawText()
    },
    redrawText () {
      this.showButtons = true

      for (let child of this.$children) {
        child.redrawText()
      }
    },
    downloadLogos (e) {
      e.preventDefault()
      var zip = new JSZip()

      // Record data about the submission in json
      var timestamp = new Date()
      var submissionInfo = {
        name: this.userName,
        email: this.userEmail,
        schoolName: this.schoolName,
        shortName: this.shortName,
        timestamp: timestamp.toJSON()
      }
      zip.file('submission.json', JSON.stringify(submissionInfo, null, 2))

      for (let child of this.$children) {
        if (child.fileName) {
          zip.file(child.fileName, child.imageData, { base64: true })
        }
      }
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        console.log('zip generated')
        console.log(content)

        // var url = 'http://localhost:3000/'
        var url = 'https://rta8nroxoc.execute-api.us-east-1.amazonaws.com/default/FileUpload'
        var oReq = new XMLHttpRequest()
        oReq.open('POST', url, true)
        oReq.send(content)

        // Vue.ajax.post(url, { submission: submissionInfo, zip: content },
        //   {
        //     headers: {
        //       Body: content,
        //       ContentEncoding: 'base64',
        //       ContentType: 'application/zip',
        //       Key: 'logos.zip'
        //     }
        //   }
        // ).then(function (successResponse) {
        //   console.log('zip POST success: ' + successResponse)
        // }, function (errorResponse) {
        //   console.log('zip POST error: ' + errorResponse)
        // })
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
  float: right;
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

.image-holder {
  display: none;
}

hr {
  margin-top: 50px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
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
