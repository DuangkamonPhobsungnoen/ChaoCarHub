<script setup>
// import axios from "@/plugins/axios"
import HeroUser from "../components/HeroUser.vue";
import mCheckout from "../components/MyRent/C_CheckOut.vue";
import mPickupcar from "../components/MyRent/C_PickUpCar.vue";
import mReturncar from "../components/MyRent/C_ReturnCar.vue";
import mHistory from "../components/MyRent/C_History.vue";
import StatusBar from "../components/MyRent/StatusBar.vue";

import { computed, ref, reactive, onMounted, provide } from "vue";
import { UseregisterStore } from "@/stores/register";
import { UsemyrentStore } from "@/stores/myRent";

const registerStore = UseregisterStore();
const myrentStore = UsemyrentStore();

onMounted(async () => {
  const user = registerStore.onAuthChange();
  await myrentStore.myrentCar();
});
//value from status bar
const receivedValue = ref("checkout");
provide("sharedValue", receivedValue);
</script>

<template>
  <HeroUser></HeroUser>
  <StatusBar></StatusBar>
  <!-- <p>Received value from child: {{ receivedValue }}</p> -->
  <!-- <h1>{{ myrentStore.checkoutCar}}</h1> -->
  <div class="columns">
    <div class="column is-half is-8 is-offset-2 pt-6">       
      <div v-if="receivedValue == 'checkout'" class="has-text-centered pb-6" style="letter-spacing: 5px;"><b class="is-size-1">CHECKOUT</b> <br> <b>เมื่อคุณลูกค้ากดจองรถ รถที่คุณจองจะแสดงหน้านี้</b></div>
      <mCheckout v-if="receivedValue == 'checkout'" v-for="item in myrentStore.checkoutCar" :item="item"></mCheckout>
      
      <div v-if="receivedValue == 'pickup'" class="has-text-centered pb-6" style="letter-spacing: 5px;"><b class="is-size-1">PICK UP CAR</b> <br> <b>เมื่อคุณลูกค้ากดจองรถและชำระเงินสำเร็จ รถที่คุณจองจะแสดงหน้านี้</b></div>
      <mPickupcar v-if="receivedValue == 'pickup'" v-for="item in myrentStore.pickupCar" :item="item"></mPickupcar>

      <div v-if="receivedValue == 'return'" class="has-text-centered pb-6" style="letter-spacing: 5px;"><b class="is-size-1">RETURN CAR</b> <br> <b>เมื่อคุณลูกค้ากดรับรถสำเร็จแล้ว รถที่คุณจองจะแสดงหน้านี้</b></div>
      <mReturncar v-if="receivedValue == 'return'" v-for="item in myrentStore.returnCar" :item="item"></mReturncar>

      <div v-if="receivedValue == 'history'" class="has-text-centered pb-6" style="letter-spacing: 5px;"><b class="is-size-1">HISTORY CAR</b> <br> <b>เมื่อคุณลูกค้ากดคืนรถสำเร็จแล้ว ประวัติการจองรถจะแสดงหน้านี้</b></div>
      <mHistory v-if="receivedValue == 'history'" v-for="item in myrentStore.historyCar" :item="item"></mHistory>
    </div>
  </div>
</template>

<style></style>
