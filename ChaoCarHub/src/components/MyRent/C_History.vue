<script setup>
import { UsemyrentStore } from "@/stores/myRent"
const myrentStore  = UsemyrentStore()
defineProps({
  item: Object,
});
</script>

<template>
    <div class="pb-6">
      <div class="card has-text-centered p-5">
        <div class="columns is-10">
          <div class="card-header-title columns is-7">
            <div class="column is-8 is-size-3">
              {{ item.car_brand }} {{ item.car_model }}
              <div class="card-image image is-4by3">
                <img :src="`http://35.198.237.137:3000/${item.car_img}`" />
              </div>
            </div>
            <div class="column pl-6">
              <div class="column pt-6">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="../../assets/detail_car/1.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">{{ item.car_seat }} ที่นั้ง</span>
                </p>
              </div>
              <div class="column pt-5">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="../../assets/detail_car/2.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">{{ item.car_bag }} กระเป๋า</span>
                </p>
              </div>
              <div class="column pt-5">
                <p class="subtitle is-size-7 column_number">
                  <img
                    src="../../assets/detail_car/3.png"
                    height="20"
                    width="20"
                  />
                  <span class="pl-2">อัตโนมัติ</span>
                </p>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <p v-if="item.r_status === 'history'" class="is-size-4" style="background-color: #8ee1bb">
              <b>คืนรถสำเร็จ</b>
            </p>
            <p v-else-if="item.r_status === 'cancel'" class="is-size-4" style="background-color: #A8A8A880">
              <b>ถูกยกเลิก</b>
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
          <div class="column is-size-6 pl-6">
            <p class="subtitle is-size-6 column_number">
              <img
                src="https://media.discordapp.net/attachments/1072181252964233328/1079444615184257074/success_1.png"
                height="20"
                width="20"
              /><span class="pl-2"> ชำระเงินสำเร็จแล้ว</span>
            </p>
          </div>
          <router-link to="/" class="column is-size-6">
            <button class="button btn has-text-white font" style="width: 100%">
              จองอีกครั้ง
            </button>
        </router-link>
        </footer>
      </div>
    </div>
</template>

