<template>
  <div id="#container">
    <h4>Enter Name Of School into text box.</h4>
    <input
      id="txt-school"
      type="text"
      style="width:400px"
      placeholder="School Name"
      v-focus
      v-model="schoolName"
      v-on:keyup="redrawText()" />

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
    <wide-logo-form :schoolName="schoolName"></wide-logo-form>
    <square-logo-form :shortName="shortName"></square-logo-form>
  </div>
</template>

<script>
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'

export default {
  name: 'LogoGen',
  components: {
    'wide-logo-form': WideLogoForm,
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
</style>
