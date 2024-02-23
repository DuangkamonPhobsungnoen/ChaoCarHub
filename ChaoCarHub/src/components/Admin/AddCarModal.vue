<script setup>
// import { computed, ref, reactive, onMounted } from "vue";
// import Swal from 'sweetalert2'
import axios from "axios";
import { UsecrudCarStore } from "@/stores/crud_Car";
import { computed, ref, reactive, onMounted } from "vue";

const CarStore = UsecrudCarStore();
</script>
<template>
  <div class="modal columns is-mobile has-text-left">
    <div class="column is-half">
      <div class="card pb-6 px-5 has-text-info">
        <p class="title pt-5 pb-5">Create new car</p>
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="card-image px-4">
              <img
                id="imgg"
                src="https://bulma.io/images/placeholders/640x360.png"
                width="250"
                height="200"
              />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">หมายเลขรถ</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carCode"
                  class="input"
                  type="text"
                  placeholder="T001"
                  :class="{ 'is-danger': CarStore.error.carCode }"
                  @input="CarStore.validateCarCode()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carCode
                }}</span>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="field">
              <label class="label">รูปรถ</label>
              <div class="file is-info has-name is-normal">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    name="myImageCar"
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    ref="file"
                    id="file"
                    @change="CarStore.previewImage"
                    onchange="document.getElementById('imgg').src = window.URL.createObjectURL(this.files[0])"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Image file… </span>
                  </span>
                  <span class="file-name"> .jpg .png </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="field">
              <label class="label">ยี่ห้อรถ</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carBrand"
                  class="input"
                  type="text"
                  placeholder="Toyota"
                  :class="{ 'is-danger': CarStore.error.carBrand }"
                  @input="CarStore.validateCarBrand()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carBrand
                }}</span>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">รุ่นรถ</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carModel"
                  class="input"
                  type="text"
                  placeholder="Yaris"
                  :class="{ 'is-danger': CarStore.error.carModel }"
                  @input="CarStore.validateCarModel()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carModel
                }}</span>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label"
                >สถานะ <b class="is-size-7">(Available or Maintain)</b></label
              >
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carStatus"
                  class="input"
                  type="text"
                  placeholder="Available"
                  :class="{ 'is-danger': CarStore.error.carStatus }"
                  @input="CarStore.validateCarStatus()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carStatus
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4">
            <div class="field">
              <label class="label">จำนวนที่นั่ง</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carSeat"
                  class="input"
                  type="text"
                  placeholder="4"
                  :class="{ 'is-danger': CarStore.error.carSeat }"
                  @input="CarStore.validateCarSeat()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carSeat
                }}</span>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">จำนวนที่วางกระเป๋า</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carBag"
                  class="input"
                  type="text"
                  placeholder="2"
                  :class="{ 'is-danger': CarStore.error.carBag }"
                  @input="CarStore.validateCarBag()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carBag
                }}</span>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">ราคารถ</label>
              <div class="control">
                <input
                  style="border-radius: 5px"
                  v-model="CarStore.carPrice"
                  class="input"
                  type="text"
                  placeholder="1190"
                  :class="{ 'is-danger': CarStore.error.carPrice }"
                  @input="CarStore.validateCarPrice()"
                />
                <span class="has-text-danger ertext ml-3">{{
                  CarStore.error.carPrice
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-grouped" style="float: right">
          <div class="control">
            <button class="button is-info" @click="CarStore.addCar">
              Submit
            </button>
          </div>
          <div class="control">
            <button
              class="button is-info is-light"
              @click="CarStore.showModalAddCar = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
