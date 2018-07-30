<template>
  <div id="container">
    <img class="image-holder" id="image-holder-wide" src='../assets/image/WideNormal.svg'>
    <img class="image-holder" id="image-holder-wide-inverse" src='../assets/image/WideDarkBg.svg'>
    <img class="image-holder" id="image-holder-square" src='../assets/image/SquareNormal.svg'>
    <img class="image-holder" id="image-holder-square-inverse" src='../assets/image/SquareNormalDarkBg.svg'>
    <h4>Fill out the form below; logos using your inputs will be automatically generated for you.</h4>
    <label for="txt-school">School Full Name (e.g. University of College)</label>
    <input
      id="txt-school"
      type="text"
      style="width:400px"
      placeholder="School Name"
      v-focus
      v-model="schoolName"
      v-on:keyup="redrawText()" />

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
         v-on:click="downloadLogos()"
         v-show="showButtons">
        Download logo as a PNG
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
        <wide-logo-form :config="wide" :schoolName="schoolName"></wide-logo-form>
        <wide-logo-short :config="wide" :shortName="shortName"></wide-logo-short>
        <square-logo-form :config="square" :shortName="shortName"></square-logo-form>
      </div>
      <div id="inverse-logos">
        <h2>Logos for Dark Backgrounds</h2>
        <wide-logo-inverse :config="wide" :schoolName="schoolName"></wide-logo-inverse>
        <square-logo-inverse :config="square" :shortName="shortName"></square-logo-inverse>
        <p>Note: the color you see here is just for demo purposes; the logos you download will have a transparent background.</p>
      </div>
    </div>
  </div>
</template>

<script>
import SquareLogoForm from '@/components/SquareLogoForm'
import SquareLogoInverse from '@/components/SquareLogoInverse'
import WideLogoForm from '@/components/WideLogoForm'
import WideLogoInverse from '@/components/WideLogoInverse'
import WideLogoShortName from '@/components/WideLogoShortName'
import JSZip from 'jszip'
import { saveAs } from 'file-saver/FileSaver'

export default {
  name: 'LogoGen',
  components: {
    'wide-logo-form': WideLogoForm,
    'wide-logo-inverse': WideLogoInverse,
    'wide-logo-short': WideLogoShortName,
    'square-logo-inverse': SquareLogoInverse,
    'square-logo-form': SquareLogoForm
  },
  data () {
    return {
      schoolName: 'Your School Name Here',
      shortName: 'UofC',
      showButtons: true,
      wide: {
        textOffset: 10,
        rightOffset: 390,
        textDrop: 110,
        canvasWidth: 400,
        canvasHeight: 120,
        logoHeight: 72,
        logoStartX: 10,
        logoStartY: 5,
        logoWidth: 380
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
    redrawText () {
      this.showButtons = true

      for (let child of this.$children) {
        child.redrawText()
      }
    },
    downloadLogos () {
      var zip = new JSZip()
      for (let child of this.$children) {
        console.log(child.fileName)
        console.log(child.imageData)
        zip.file(child.fileName, child.imageData, { base64: true })
      }
      zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, 'intervarsity-logos.zip')
      })
    },
    resetPage () {
      this.schoolName = ''
      this.redrawText()
      var txt = document.getElementById('txt-school')
      txt.focus()
    }
  }
}
</script>

<style>
div#container {
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
