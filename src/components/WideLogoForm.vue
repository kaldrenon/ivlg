<template>
  <div id="container">
    <a href="/" >back home</a>

    <h4>Enter Name Of School into text box.</h4>
    <input
      id="sourceText1"
      type="text"
      style="width:500px"
      :value="defaults.school" />
    <span>
      Use "AT":
      <input id="checkbox1" type="checkbox" />
    </span>
    <canvas id="drawingboard" width=700 height=130></canvas>

    <a class="btn btn-primary" id="download" style="visibility: hidden;">
      Download logo as a PNG
    </a>
    <a class="btn btn-secondary" id="reloadbtn" style="visibility: hidden;">
      reset page
    </a>
  </div>
</template>

<script>
export default {
  name: 'WideLogoForm',
  data () {
    return {
      defaults: {
        school: 'Kennedy School of Government',
        submit: 'Submit'
      }
    }
  }
}
</script>
