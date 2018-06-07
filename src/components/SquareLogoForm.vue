<template>
  <div>
    <a href="/" >back home</a><br>
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
  name: 'SquareLogoForm',
  data () {
    return {
      defaults: {
        school: 'RIT'
      }
    }
  }
}
</script>
