<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import { UsemyrentStore } from "@/stores/myRent"
import {checkLateCarnotReturn} from "@/stores/returnCar"
const myrentStore  = UsemyrentStore()
const returnCarStore = checkLateCarnotReturn()
onMounted(returnCarStore.getLateReturn);


</script>

<template>
     <div class="p-5 is-size-5 has-text-centered" >
      <div >
        <h1 class="is-size-4 p-5 has-text-centered">
          <!-- <button @click="returnCar.getLateReturn()">test</button> -->
      <b class="has-background-danger-dark has-text-white"
        >รายละเอียดการคืนรถล่าช้า</b><br />
      <b>ขณะนี้มีลูกค้าที่เลยกำหนดและยังไม่คืนรถทั้งหมด
        {{ returnCarStore.lateCarValue.length }}
        <b class="has-text-warning is-size-2">  </b>
        คน</b
      >
    </h1>
    <div> 
        <div v-if="myrentStore.showAlertVerified">
            <div class="modal">
                  <div class="modal-content">
                    <p class="is-size-5 has-text-black">
                      {{ myrentStore.alertMessage }}
                    </p>
                    <br />
                    <div class="buttons">
                      <button @click="myrentStore.confirmVerified(true)"
                        class="button is-size-6 has-background-success has-text-white"
                      >
                        Ok
                      </button>
                      <button @click="myrentStore.confirmVerified(false)"
                        class="button is-size-6 has-background-danger has-text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
    <!-- <div v-if="(myrentStore.hadReturn.includes(item.r_id) && isReturn)"> -->
      <table style="width: 100%" >
        <tr style="background-color: hsl(348, 86%, 90%);" class="sticky">
          <th>รหัสผู้ใช้</th>
          <th>ชื่อลูกค้า</th>
          <th>เบอร์ลูกค้า</th>
          <th>หมายเลขรถ</th>
          <th>สถานที่คืนรถ</th>
          <th>วันคืนรถ</th>
          <th>จำนวนวันที่เกินกำหนด</th>
          <th>ค่าปรับ</th> 
          
        </tr>
        <tr  v-for="item in returnCarStore.lateCarValue" :key="item.re_id">
          <td> {{ item.u_id }}</td>
          <td> {{ item.u_fname }} {{ item.u_lname }}</td>
          <td> {{item.u_phone}} </td>
          <td> {{ item.car_code }}</td>
          <!-- <td> {{ item.car_brand}} {{ item.car_model }}</td> -->
          <td> {{ item.r_place_return }}</td>
          <td> {{ item.dayReturn}} </td>
          <td>
            {{ calculateDaysDifference(currentDate, item.r_day_return) }} วัน
          </td>
          <td>
            {{ ((item.r_totalprice/item.r_amountdays) * (calculateDaysDifference(currentDate, item.r_day_return))) + ((item.r_totalprice/item.r_amountdays) * (calculateDaysDifference(currentDate, item.r_day_return))/5) }} บาท
          </td>
          


          <!-- <td class="has-text-danger">
            <div class="control">
              <div class="level-item">
                <button class="button is-link" @click="myrentStore.showConfirmReturnCar(item.car_brand, item.car_model, item.u_fname, item.re_id)">
                  <span>Verified</span>
                  <span class="icon is-small">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/871/871896.png"
                    />
                  </span>
                </button>
              </div>
            </div>
          </td>    -->
        </tr>
      </table>
    <!-- </div>
    <div v-else>ขณะนี้ยังไม่มีรถที่เกินกำหนดการคืน</div> -->
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: ''
    };
  },
  mounted() {
    this.currentDate = this.getCurrentDate();
  },
  computed: {
    myrentStore() {
      return this.$store.state.myRent;
    }
  },
  methods: {
    getCurrentDate() {
      const current = new Date();
      const month = (current.getMonth() + 1).toString().padStart(2, '0');
      const date = `${current.getFullYear()}-${month}-${current.getDate()}`;
      console.log('Current Date: ', date);
      return date;
    },
    calculateDaysDifference(currentDate, returnDate) {
      const current = new Date(currentDate);
      const previous = new Date(returnDate);
      const timeDifference = current.getTime() - previous.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    }
  }
};
</script>