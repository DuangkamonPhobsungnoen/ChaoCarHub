<script setup>
import { UserentCarStore } from "@/stores/rentCar";
import { computed, ref, reactive, onMounted } from "vue";
const rentCarStore = UserentCarStore();
import CardCar from "../CardCar.vue";
onMounted(rentCarStore.searchCar);
</script>

<template>
<div class="columns is-mobile p-5">
  <div class="column is-half is-offset-one-quarter">
    <div class="columns">
      <div class="column is-4 has-text-centered pt-6 is-size-1" style="font-family: 'Titan One', cursive;">
        <br>Car rent <br>service<br>
        <router-link to="/">
        <button class="button is-primary is-outlined" style="border:2px solid; border-radius:45px;">Search car</button>
        </router-link>
      </div>
        <div class="column"><img src="https://media.discordapp.net/attachments/1072181252964233328/1106798386604159076/istockphoto-1161013241-170667a-removebg-preview-removebg-preview.png?width=598&height=448" /></div>
    </div>
  </div>
</div>
  <!-- <h1>{{ rentCarStore.filterCar }}</h1> -->
  <div class="container is-max-desktop">
    <div class="column px-6">
        <div class="column px-6">
          <div class="has-text-centered is-size-3" style="opacity: 30%;"> <b>{{ rentCarStore.textFilterCar }}</b></div>
          <div class="is-multiline is-variable columns is-1">
            <CardCar v-for="item in rentCarStore.filterCar" :item="item" id="card_product " class="column is-one-quarter"></CardCar>
          </div>
        </div>
    </div>
  </div>
</template>
