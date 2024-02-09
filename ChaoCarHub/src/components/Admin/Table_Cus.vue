<script setup>
import { UsecrudCarStore } from "@/stores/crud_Car";
import { computed, ref, reactive, onMounted } from "vue";

const CarStore = UsecrudCarStore();
onMounted(CarStore.myCus);
</script>

<template>
  <div class="p-5 has-text-centered is-size-5">
    <div class="field has-addons" style="float: right">
      <div class="control">
        <input @keyup.enter="CarStore.toSearchCus" class="input" type="text" placeholder="Find a repository" v-model="CarStore.searchInputCus"/>
      </div>
      <div class="control" @click="CarStore.toSearchCus">
        <a class="button is-info"> Search </a>
      </div>
    </div><br>
    <h1 class="is-size-4 p-5">
      <b class="has-background-success has-text-white"
        >ตารางแสดงข้อมูลพื้นฐานของลูกค้า</b
      ><br />
      <b
        >ขณะนี้มีลูกค้าอยู่ในระบบทั้งหมด
        <b class="has-text-success is-size-2"
          >{{ CarStore.cusValue.length }}
        </b>
        คน</b
      >
    </h1>
    <table style="width: 100%">
      <tr class="has-background-success-light sticky">
        <th>รหัสผู้ใช้</th>
        <th>ชื่อลูกค้า</th>
        <th>เบอร์โทรศัพท์</th>
        <th>อีเมล</th>
      </tr>
      <tr v-for="item in CarStore.cusValue" :key="item.car_id">
        <td>{{ item.u_id }}</td>
        <td>{{ item.u_fname }} {{ item.u_lname }}</td>
        <td>{{ item.u_phone }}</td>
        <td>{{ item.u_email }}</td>
      </tr>
    </table>
  </div>
</template>
