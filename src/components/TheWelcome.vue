<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="TheWelcome">
    <h1 class="TheWelcome__msg">
      {{ msg }}
    </h1>
  </section>
</template>

<style lang="scss">
.TheWelcome {
  &__msg {
    margin: 0;
    font-size: 32px;
    color: #686868;
  }
}
</style>