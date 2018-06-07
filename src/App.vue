<template>
  <div id="app">
    <p>foo</p>
    <wide-logo-form />
  </div>
</template>

<script>
import InputForm from '@/components/InputForm'
import SquareLogoForm from '@/components/SquareLogoForm'
import WideLogoForm from '@/components/WideLogoForm'

export default {
  name: 'App',
  components: { InputForm, SquareLogoForm, WideLogoForm }
}
</script>

