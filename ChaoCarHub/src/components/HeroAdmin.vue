<script setup>
import { computed, ref, reactive, onMounted } from "vue";
// use pinia file
import { UseregisterStore } from "@/stores/register";
const registerStore  = UseregisterStore()
// onMounted()
</script>

<template>
  <section class="hero is-success is-halfheight is-gradient column border_td">
    <div class="hero-body columns">
      <div class="column is-4">
        <p class="title">
          {{registerStore.userProfile?.u_fname}} {{registerStore.userProfile?.u_lname}}
        </p> 
        <p class="subtitle">Track your rental status here!</p>
      </div>
    </div>
  </section>
</template>
