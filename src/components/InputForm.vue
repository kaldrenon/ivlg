<template>
  <div>
    <form action="/thanks">
      <input type="text" :value="defaults.name" />
      <input type="submit" :value="defaults.submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'InputForm',
  data () {
    return {
      defaults: {
        name: 'Andrew',
        submit: 'Submit'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
