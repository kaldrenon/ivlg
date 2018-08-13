<template>
  <div id="help-container">
    <a href="#" v-on:click="toggle($event)">
      <span id="help-open">HELP</span>
      <span id="help-close">close</span>
    </a>
    <div id="help-body">
      Here are some tips for using this tool

      <h4>Filling out the form</h4>
      <ol>
        <li>School Name should be the full name of your college or university, e.g. University of College</li>
        <li>Short Name may be the school's initials or a similar shorthand, like UofC</li>
      </ol>
      <h4>Using the logo files</h4>
      <ol>
        <li>When you click "Download ZIP", you will receive a ZIP file with all the displayed logos in it. You do not need to use all of them, but they're all ready for you to use!</li>
        <li>Inverted color logos are all white with a transparent background; they may look blank in some file browsers or image applications. Don't worry! The logo and text will be there, just put it over a dark background to see it.</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpBox',
  methods: {
    toggle (e) {
      e.preventDefault()
      document.getElementById('help-container').classList.toggle('expanded')
    },
    redrawText () {
      // lazy workaround
    }
  }
}
</script>

<style scoped>
#help-container {
  float: right;
  border: 1px solid #aaa;
  padding: 5px;
}

#help-container #help-close {
  display: none;
}

#help-container #help-body {
  display: none;
}

#help-container a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
}

#help-container a:hover {
  background: #ddd
}

#help-container.expanded {
  position: absolute;
  top: 0;
  right: 0;
  width: 500px;
  height: 500px;
  background: white;
  color: #006680;
  padding: 15px;
  -moz-box-shadow:    8px 8px 17px 2px rgba(00, 66, 80, 0.3);
  -webkit-box-shadow: 8px 8px 17px 2px rgba(00, 66, 80, 0.3);
  box-shadow:         8px 8px 17px 2px rgba(00, 66, 80, 0.3);
}

#help-container.expanded a {
  float: right;
}

#help-container.expanded #help-close {
  display: inline;
}

#help-container.expanded #help-open {
  display: none;
}

#help-container.expanded #help-body {
  display: block;
}

#help-container.expanded #help-body li {
  margin-top: 5px;
}
</style>
