<script setup>
import { UsepaymentStore } from "@/stores/payment";
import { computed, ref, reactive, onMounted } from "vue";

const PaymentStore = UsepaymentStore();
onMounted(PaymentStore.FetchPayment);
</script>

<template>
  <div class="p-5 is-size-5 has-text-centered" >
      <div >
        <h1 class="is-size-4 p-5 has-text-centered">
      <b class="has-background-warning has-text-white"
        >ตารางแสดงรายละเอียดการชำระเงินของลูกค้า</b
      ><br />
      <b
        >ขณะนี้มีลูกค้ารอตรวจสอบการชำระเงินทั้งหมด
        <b class="has-text-warning is-size-2"> {{ PaymentStore.paymentvalue.length }} </b>
        คน</b
      >
    </h1>
    <div v-if="PaymentStore.showAlertChecked">
                <div class="modal">
                  <div class="modal-content">
                    <p class="is-size-5 has-text-black">
                      {{ PaymentStore.alertMessage }}
                    </p>
                    <br />
                    <div class="buttons">
                      <button @click="PaymentStore.confirmChecked(true)"
                        class="button is-size-6 has-background-success has-text-white"
                      >
                        Ok
                      </button>
                      <button @click="PaymentStore.confirmChecked(false)"
                        class="button is-size-6 has-background-danger has-text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
          </div>
    <table style="width: 100%" >
      <tr class="has-background-warning-light sticky">
        <th>รหัสผู้ใช้</th>
        <th>ชำระเงินผ่าน</th>
        <th>หมายเลขบัตร</th>
        <th>ชื่อบนบัตรเครดิต</th>
        <th>วันเวลาที่ชำระ</th>
        <th>รถที่จอง</th>
        <th>สถานที่ <br> วันและเวลารับรถ</th>
        <th>สถานที่ <br> วันและเวลาคืนรถ</th>
        <th>ตรวจสอบการชำระเงิน</th>
      </tr>
      <tr v-for="item in PaymentStore.paymentvalue" :key="item.pay_id">
        <td>{{ item.u_id }}</td>
        <td> บัตรเคดิต </td>
        <td>{{ item.pay_cr_num }}</td>
        <td>{{ item.pay_cr_name }}</td>
        <td>{{ item.pay_time }}</td>
        <td>{{ item.car_code }} <br> {{ item.car_brand }} {{ item.car_model }}</td>
        <td>{{ item.r_place_pickup }} <br> {{ item.r_day_pickup}} {{ item.r_time_pickup}}</td>
        <td>{{ item.r_place_pickup }} <br> {{ item.r_day_return}} {{ item.r_time_return}}</td>
        <td class="has-text-danger">
          <div class="control">
            <div class="level-item">
              <button class="button is-warning" @click="PaymentStore.showConfirmation(item.pay_cr_name, item.pay_id)">
                <span>Checked</span>
                <span class="icon is-small">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9710/9710799.png"
                  />
                </span>
              </button>
            </div>
          </div>
        </td>   
      </tr>
    </table>
      </div>
    </div>
</template>
