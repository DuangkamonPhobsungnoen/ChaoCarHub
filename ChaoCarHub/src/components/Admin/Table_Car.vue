<script setup>
import { UsecrudCarStore } from "@/stores/crud_Car";
import { computed, ref, reactive, onMounted } from "vue";

const CarStore = UsecrudCarStore();
onMounted(CarStore.FetchCar);
</script>

<template> 
  <div class="p-5 has-text-centered is-size-5">
    <div class="field has-addons" style="float: right">
      <div class="control">
        <input @keyup.enter="CarStore.toSearch" class="input" type="text" placeholder="Find a repository" v-model="CarStore.searchInput"/>
      </div>
      <div class="control" @click="CarStore.toSearch">
        <a class="button is-info"> Search </a>
      </div>
    </div><br>
    <h1 class="is-size-4 p-5">
      <b class="has-background-primary has-text-white"
        >ตารางแสดงรายละเอียดรถทั้งหมดที่มีอยู่ในระบบ</b
      ><br />
      <b
        >ขณะนี้มีรถอยู่ในระบบทั้งหมด
        <b class="has-text-primary is-size-2"
          >{{ CarStore.carvalue.length }}
        </b>
        คัน</b
      >
    </h1>
    <table style="width: 100%">
      <tr class="has-background-primary-light sticky">
        <th>หมายเลขรถ</th>
        <th>รูปรถ.....</th>
        <th>ชื่อรถ</th>
        <th>ยี่ห้อรถ</th>
        <th>รุ่นรถ</th>
        <th>จำนวนที่นั่ง</th>
        <th>จำนวนใส่กระเป๋า</th>
        <th>ราคา</th>
        <th>สถานะ</th>
      </tr>
      <tr v-for="item in CarStore.carvalue" :key="item.car_id">
        <td>{{ item.car_code }}</td>
        <td>
          <div class="card-image px-4">
            <figure class="image is-4by3">
              <!-- <img :src="item.car_img" alt="!!!!" /> -->
              <img :src="`http://34.143.132.66:3000/${item.car_img}`" alt="" />
            </figure>
          </div>
        </td>
        <td>{{ item.car_brand }} {{ item.car_model }}</td>
        <td>{{ item.car_brand }}</td>
        <td>{{ item.car_model }}</td>
        <td>{{ item.car_seat }}</td>
        <td>{{ item.car_bag }}</td>
        <td>{{ item.car_rentprice }}</td>
        <td>{{ item.car_status }}</td>
      </tr>
    </table>
  </div>
</template>
