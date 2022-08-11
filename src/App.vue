<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <section>
    <header>
      <img
        alt="104 logo"
        src="@/assets/images/logo.svg"
        width="200"
        height="150"
      >
    </header>

    <RouterView></RouterView>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/base.scss';

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>