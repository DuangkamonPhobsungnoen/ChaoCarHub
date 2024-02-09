<script setup>
import { UserentCarStore} from '@/stores/rentCar'
import { computed, ref, reactive, onMounted } from "vue";
const rentCarStore =  UserentCarStore()
defineProps({
  item: Object,
});
</script>

<template>
  <div id="card_product " class="column is-one-third">
    <div class="card has-text-centered is-border-radius">
      <div class="card-image px-5 pt-2">
        <figure class="image is-4by3">
          <img :src="`http://localhost:3000/${item.car_img}`" alt="" />
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-size-6 limit_text">
          {{ item.car_brand }} {{ item.car_model }}
        </p>
        <div class="subtitle is-size-7 ">
          <img src="https://media.discordapp.net/attachments/1072181252964233328/1077073362708332614/image_18.png " alt=" "/>
          <b>{{ item.car_seat }} ที่นั้ง <br />
            เริ่มต้น {{ item.car_rentprice }} บาท/วัน</b>
        </div>
      </div>
      <div @click="rentCarStore.reserveCar(item.car_id)">
          <footer class="card-footer">
            <div class="card-footer-item is-color-green3 is-size-6 is-color-green3 has-text-white">จองคันนี้</div>
          </footer>
      </div>
    </div>
  </div>
</template>
