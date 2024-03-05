<script setup>
import { inject } from "vue";
import { computed, ref, reactive, onMounted, provide } from "vue";
//send click status to myrent
const sharedValue = inject("sharedValue");

const sendValueToParent = (page) => {
  sharedValue.value = page;
};

const changeCheckout = ref(true)
const changePickup = ref(false)
const changeReturn = ref(false)
const changeHistory = ref(false)

console.log(changeCheckout)
</script>

<template>
  <!-- status bar-->
  <section
    class="hero is-small border_td"
    style="background-color: var(--color-background)">
    <div class="hero-body">
      <div class="columns is-5 has-text-centered">
        <!-- Check out -->
        <div class="column" id="ibar" @click="sendValueToParent('checkout'), changeCheckout = true, changePickup = false, changeReturn = false, changeHistory = false" 
        :class="{'is-color-transgreen': changeCheckout }">
          <a class="has-text-black">
            <img
              class="icon"
              src="../../assets/status_bar/1.png"
              alt=""
            />
            <p>Check out</p>
          </a>
        </div>

        <!-- Pick up car -->
        <div class="column" id="ibar" @click="sendValueToParent('pickup'), changeCheckout = false, changePickup = true, changeReturn = false, changeHistory = false" 
        :class="{'is-color-transgreen': changePickup }"> 
          <a class="has-text-black">
            <img
              class="icon"
              src="../../assets/status_bar/2.png"
              alt=""
            />
            <p>Pick up car</p>
          </a>
        </div>

        <!-- Return car -->
        <div class="column" id="ibar" @click="sendValueToParent('return'), changeCheckout = false, changePickup = false, changeReturn = true, changeHistory = false"
        :class="{'is-color-transgreen': changeReturn }">
          <a class="has-text-black">
            <img
              class="icon"
              src="../../assets/status_bar/3.png"
              alt=""
            />
            <p>Return car</p>
          </a>
        </div>

        <!-- History -->
        <div class="column" id="ibar" @click="sendValueToParent('history'), changeCheckout = false, changePickup = false, changeReturn = false, changeHistory = true"
        :class="{'is-color-transgreen': changeHistory }">
          <a class="has-text-black">
            <img
              class="icon"
              src="../../assets/status_bar/4.png"
              alt=""
            />
            <p>History</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
