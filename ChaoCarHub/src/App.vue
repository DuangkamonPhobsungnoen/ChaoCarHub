<script setup>
import navbarmain from "./components/navbar.vue";
import footermain from "./components/Footer.vue";
// import { RouterView } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <navbarmain />
  <RouterView></RouterView>
  <footermain />
</template>
