<template>
  <div id="container">
    <img class="image-holder" id="image-holder-wide" src='../assets/image/IV-logo-wide2.svg'>
    <img class="image-holder" id="image-holder-square" src='../assets/image/IV-logo-square.svg'>
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

    <hr>
    <h2>Logo Previews</h2>

    <wide-logo-form :schoolName="schoolName"></wide-logo-form>
    <wide-logo-short :shortName="shortName"></wide-logo-short>
    <square-logo-form :shortName="shortName"></square-logo-form>
  </div>
</template>

<script>
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'
import WideLogoShortName from '@/components/WideLogoShortName'

export default {
  name: 'LogoGen',
  components: {
    'wide-logo-form': WideLogoForm,
    'wide-logo-short': WideLogoShortName,
    'square-logo-form': SquareLogoForm
  },
  data () {
    return {
      src: '../assets/image/IV-logo-wide2.svg',
      textoffset: 155,
      textdrop: 120,
      atoffset: 0,
      schoolName: 'Your School Name Here',
      shortName: '',
      showButtons: true
    }
  },
  methods: {
    redrawText () {
      this.showButtons = true

      for (let child of this.$children) {
        child.redrawText()
      }
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
  max-width: 840px;
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
  margin-top: 25px;
}

div#container input, div#container label {
  display: block;
  text-align: left;
}

div#container input {
  margin-bottom: 10px;
  padding: 3px 0;
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
  margin-top: 40px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}
</style>
