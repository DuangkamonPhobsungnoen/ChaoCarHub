<script setup>
  import { computed, onMounted } from "vue";
  import { UsemyrentStore } from "@/stores/myRent";

  const myrentStore = UsemyrentStore();

  onMounted(myrentStore.FetchReturncar);

  const sortedReturnCars = computed(() => {
    return myrentStore.allReturncar.slice().sort((a, b) => a.r_status === 'cancel' ? -1 : 1);
  });
</script>

<template>
     <div class="p-5 is-size-5 has-text-centered" >
      <div >
        <h1 class="is-size-4 p-5 has-text-centered">
      <b class="has-background-link has-text-white"
        >ตารางแสดงรายละเอียดการคืนรถของลูกค้า</b
      ><br />
      <b
        >ขณะนี้มีลูกค้ารอตรวจสอบการคืนรถทั้งหมด
        {{ myrentStore.allReturncar.length }}
        <b class="has-text-warning is-size-2">  </b>
        คน</b
      >
    </h1>
    <div> 
        <div v-if="myrentStore.showAlertVerified && !myrentStore.isCancel">
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
        <div v-else-if="myrentStore.showAlertVerified && myrentStore.isCancel">
            <div class="modal">
              <div class="modal-content">
                <p class="is-size-5 has-text-black">
                  {{ myrentStore.alertMessage }}
                </p>
                <br />
                <div class="buttons">
                  <button @click="myrentStore.confirmCancelVerified(true)"
                    class="button is-size-6 has-background-success has-text-white"
                  >
                    Ok
                  </button>
                  <button @click="myrentStore.confirmCancelVerified(false)"
                    class="button is-size-6 has-background-danger has-text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    <table style="width: 100%" >
      <tr style="background-color: hsl(217, 76%, 92%);" class="sticky">
        <th>รหัสผู้ใช้</th>
        <th>ชื่อลูกค้า</th>
        <th>หมายเลขรถ</th>
        <th>ชื่อรถ</th>
        <th>สถานที่คืนรถ</th>
        <th>วันและเวลาคืนรถ</th>
        <th>ตรวจสอบการคืนรถ</th>
      </tr>
      <tr v-for="item in sortedReturnCars" :key="item.re_id" :style="{ 'background-color': item.r_status === 'cancel' ? 'hsl(0, 100%, 90%, 50%)' : '' }">
        <td> {{ item.u_id }}</td>
        <td> {{ item.u_fname }} {{ item.u_lname }}</td>
        <td> {{ item.car_code }}</td>
        <td> {{ item.car_brand}} {{ item.car_model }}</td>
        <td> {{ item.r_place_return }}</td>
        <td> {{ item.r_day_return}} {{ item.r_time_return}} </td>
        <td class="has-text-danger">
          <div class="control">
            <div v-if="item.r_status != 'cancel'" class="level-item">
              <button class="button is-link" @click="myrentStore.showConfirmReturnCar(item.car_brand, item.car_model, item.u_fname, item.re_id)">
                <span>Verified</span>
                <span class="icon is-small">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/871/871896.png"
                  />
                </span>
              </button>
            </div>
            <div v-if="item.r_status === 'cancel'" class="level-item">
              <button class="button is-danger" @click="myrentStore.showConfirmReturnCancelCar(item.car_brand, item.car_model, item.u_fname, item.re_id)">
                <span>Request to Cancel</span>
              </button>
            </div>
          </div>
        </td>
      </tr>
    </table>
      </div>
    </div>
</template>