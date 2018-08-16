<template>
  <div id="help-container">
    <a href="#" v-on:click="toggle($event)">
      <span id="help-open">HELP</span>
      <span id="help-close">close</span>
    </a>
    <div id="help-body">
      <h3>Instructions for Using the Logo Generator</h3>

      <h4>Filling out the form</h4>
      <ol>
        <li>School, area, or region name should be the full name or your college, university, area, or region, e.g. “University of College” or “Greater Los Angeles.”</li>
        <li>Abbreviated name may use initials or similar shorthand, like “UofC”.</li>
        <li>Use a second line ONLY if your full name is longer than the character limit, or if you’re creating a logo for a focused ministry such as “International Student Ministry / at University of College.”</li>
        <li>If you change your mind about needing a second line, click “RESET” to reset the form. [*include this only if you can’t figure out how to get a button that removes the second line]</li>
      </ol>

      <h4>Using the logo files</h4>
      <ol>
        <li>When you click “Download ZIP,” you will receive a ZIP file with all the displayed logos in it. PNG files are for digital and small print use, SVG files are for large scale printing. You do not need to use all of the files, but they’re all ready for you to use!</li>
        <li>Inverted color logos are all white with a transparent backgrounds. They may look blank in some file browsers or image applications. Don’t worry! The logo and text will be there, just put it over a dark background to see it.</li>
      </ol>

      <h4>Other info</h4>
      <ol>
        <li>Once you download your files, a copy of the files will be sent to the 2100 Design team, who will review all generated logos periodically. If there are any issues, someone will get in touch via the email you provide.</li>
        <li>Remember to refer to the Brand Book for proper usage of the logo.</li>
        <li>Questions? Contact xxxx [*Mark, do you think we need this? Whose email should we provide?]</li>
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
  width: 80%;
  min-height: 500px;
  background: white;
  color: #006680;
  padding: 25px;
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
