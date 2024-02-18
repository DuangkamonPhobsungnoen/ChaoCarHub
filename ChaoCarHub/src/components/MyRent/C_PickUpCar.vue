<script setup>
import { UsemyrentStore } from "@/stores/myRent"
const myrentStore  = UsemyrentStore()
defineProps({
  item: Object,
});
</script>

<template>
  <!-- Pick up car -->
  <div class="pb-6">
      <div class="card has-text-centered p-5">
        <div class="columns is-10">
          <div class="card-header-title columns is-7">
            <div class="column is-8 is-size-3">
              {{ item.car_brand }} {{ item.car_model }}
              <div class="card-image image is-4by3">
                <img :src="`http://localhost:3000/${item.car_img}`" />
              </div>
            </div>
            <div class="column pl-6">
              <div class="column pt-6">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="https://cdn.discordapp.com/attachments/1072181252964233328/1078900607802408990/user.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">{{ item.car_seat }} ที่นั้ง</span>
                </p>
              </div>
              <div class="column pt-5">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="https://cdn.discordapp.com/attachments/1072181252964233328/1078900607567540294/bag.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">{{ item.car_bag }} กระเป๋า</span>
                </p>
              </div>
              <div class="column pt-5">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="https://cdn.discordapp.com/attachments/1072181252964233328/1078900607286509598/car-gear.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">อัตโนมัติ</span>
                </p>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <p class="is-size-4" style="background-color: #ffb8f8">
              <b>รอรับรถ</b>
            </p>
            <div class="column p-5 is-size-6">
              <div class="column has-text-left">
                <p><b>การรับรถ</b></p>
                <p>{{ item.r_place_pickup }}</p>
                <p>{{ item.dayPickup }} เวลา {{ item.r_time_pickup.slice(0, 5) }} น.</p>
              </div>
              <div class="column has-text-left">
                <p><b>การคืนรถ</b></p>
                <p>{{ item.r_place_return }}</p>
                <p>{{ item.dayReturn }} เวลา {{ item.r_time_return.slice(0, 5) }} น.</p>
              </div>
            </div>
          </div>

        </div>
        <footer class="columns">
          <p class="column is-size-6">
            ราคาสำหรับ {{ item.r_amountdays }} วัน {{ item.r_totalprice }} บาท
          </p>
          <!-- cancel pick up -->
          <div class="column is-size-6 pl-6">
            <a class="subtitle is-size-6 column_number" @click="myrentStore.confirmCancel(item.car_brand, item.car_model, item.r_id)">
              <a class="t-10">
                <img src="https://media.discordapp.net/attachments/1072181252964233328/1079348472068702238/delete_1.png"
                  height="25"
                  width="25"/>
              </a>
              <span class="pl-2 has-text-grey"> ยกเลิกการรับรถ</span>
            </a>
          </div>

          <!-- confirm pick up -->
          <a class="column is-size-6">
            <button class="button btn has-text-white font" style="width: 100%" @click="myrentStore.btnPickup(item.r_id)">
              รับรถสำเร็จ
            </button>
          </a>
        </footer>
      </div>
    </div>
</template>
