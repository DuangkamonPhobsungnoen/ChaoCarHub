<script setup>
import { UserentCarStore } from "@/stores/rentCar";
import { computed, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { UseregisterStore } from "@/stores/register";
const registerStore = UseregisterStore();

const rentCarStore = UserentCarStore();
const route = useRoute();
const { id } = route.params;
onMounted(async () => {
  rentCarStore.carDetail = await rentCarStore.fetchSingleCar(id);
  registerStore.onAuthChange();
});
const totalPrice = computed(() => {
  return (
    rentCarStore.rentData.amountDays * rentCarStore.carDetail.car_rentprice
  );
});
</script>

<template>
  <!-- <h1> {{ rentCarStore.rentData }}</h1> -->
  <div class="container is-max-widescreen p-5">
    <div class="p-5">
      <div class="columns">
        <div class="column is-5 ml-5">
          <h1 class="is-size-2 ml-6">
            {{ rentCarStore.carDetail?.car_brand }}
            {{ rentCarStore.carDetail?.car_model }}
          </h1>
          <img
            :src="`http://35.198.237.137:3000/${rentCarStore.carDetail?.car_img}`"
            alt=""
          />
        </div>

        <div class="column ml-4 mt-4 is-2 is-size-5">
          <img
            class="icond tobottom"
            src="../assets/detail_car/1.png"
            alt=""
          />
          {{ rentCarStore.carDetail?.car_seat }} ที่นั้ง<br />
          <img
            class="icond mt-3"
            src="../assets/detail_car/2.png"
            alt=""
          />
          {{ rentCarStore.carDetail?.car_bag }} กระเป๋า<br />
          <img
            class="icond mt-3"
            src="../assets/detail_car/3.png"
            alt=""
          />
          Auto
        </div>

        <div class="column is-4 is-size-5 mt-2">
          <div class="box tobottom1">
            <h1>ราคานี้รวม</h1>
            <h2>
              - ประกันที่มีค่าเสียหายส่วนแรก (CDW) แบบมีค่าเสียหายส่วนแรก
              ฿21,400
            </h2>
            <h2>- ไม่จำกัดการจำกัดเลขไมล์</h2>
          </div>
        </div>
      </div>
    </div>

    <div class="box box-radius">
      <div class="columns p-5 is-size-5">
        <div class="column is-6">
          <p><b>รายละเอียดราคารถ</b></p>
          <p>
            ค่าบริการรถยนต์เช่า
            {{ rentCarStore.carDetail?.car_rentprice }} บาท/วัน
          </p>
        </div>
        <div class="column is-6">
          <p>
            <b
              >ราคาสำหรับ {{ rentCarStore.rentData.amountDays }} วัน
              {{ totalPrice }} บาท</b
            >
          </p>
        </div>
      </div>
    </div>
    <div class="box box-radius">
      <div class="columns p-5 is-size-5">
        <div class="column is-6">
          <p><b>การรับรถ</b></p>
          <p>
            {{ rentCarStore.rentData.dayPickup }} เวลา
            {{ rentCarStore.rentData.timePickup }} น.
          </p>
          <p class="is-size-6">
            <b>สถานที่รับรถ</b>
          </p>
          <div class="select">
            <select v-model="rentCarStore.rentInfo.placePickup" class="font">
              <option
                v-for="loca in rentCarStore.locationcar"
                :key="loca.id"
                :value="loca"
              >
                {{ loca }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-6">
          <p><b>การคืนรถ</b></p>
          <p>
            {{ rentCarStore.rentData.dayReturn }} เวลา
            {{ rentCarStore.rentData.timeReturn }} น.
          </p>
          <p class="is-size-6"><b>สถานที่คืนรถ</b></p>
          <div class="select">
            <select v-model="rentCarStore.rentInfo.placeReturn" class="font">
              <option
                v-for="loca in rentCarStore.locationcar"
                :key="loca.id"
                :value="loca"
              >
                {{ loca }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <router-link to="/showcar">
          <button
            class="button is-fullwidth is-large has-text-white font btn"
            type="submit "
          >
            เลือกรถคันอื่น
          </button>
        </router-link>
      </div>
      <div class="column">
        <!-- <router-link to="/myrent"> -->
        <button
          class="button is-fullwidth is-large has-text-white font btn"
          type="submit "
          @click="
            rentCarStore.rentThisCar(
              registerStore.userProfile.u_id,
              id,
              totalPrice
            )
          "
        >
          <strong class="has-text-white">ทำการจอง</strong>
        </button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>
