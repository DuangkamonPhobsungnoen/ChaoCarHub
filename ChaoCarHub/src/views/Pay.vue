<script setup>
import { UsepaymentStore } from "@/stores/payment";
const paymentStore = UsepaymentStore();
</script>

<template>
  <div id="vapp" class="columns pt-5">
    <div class="column is-8 is-offset-4">
      <div
        class="columns is-flex is-flex-direction-column card font"
        style="width: 52%"
      >
        <h1 class="card_bill">ช่องทางการชำระเงิน</h1>
        <div class="column px-6">
          <div class="control is-size-5">
            <label class="radio"> ชำระผ่านบัตรเครดิต </label>
          </div>
        </div>
        <div class="column px-6">
          <label>ชื่อบนบัตรเครดิต *</label>
          <input
            v-model="paymentStore.name"
            class="input input_username"
            type="text "
            placeholder="Name "
            :class="{ 'is-danger': paymentStore.errorbill.name }"
            @input="paymentStore.validateName()"
          />
          <span class="has-text-danger ertext ml-3">{{
            paymentStore.errorbill.name
          }}</span>
        </div>
        <div class="column px-6">
          <label>หมายเลขบัตร *</label>
          <input
            v-model="paymentStore.numbercreditcard"
            class="input input_kd"
            type="text "
            placeholder="Enter a sixteen number "
            :class="{ 'is-danger': paymentStore.errorbill.numbercreditcard }"
            @input="paymentStore.validateNumbercreditcard()"
          />
          <span class="has-text-danger ertext ml-3">{{
            paymentStore.errorbill.numbercreditcard
          }}</span>
        </div>

        <div class="columns px-6 pt-2">
          <div class="column">
            <label>วันหมดอายุ *</label>
            <input
              v-model="paymentStore.expirationdate"
              class="input input_calendar"
              type="text "
              placeholder="MM-YYYY"
              :class="{ 'is-danger': paymentStore.errorbill.numbercreditcard }"
              @input="paymentStore.validateExpirationDate()"
            />
            <span class="has-text-danger ertext ml-3">{{
              paymentStore.errorbill.expirationdate
            }}</span>
          </div>
          <div class="column">
            <label>CVC *</label>
            <input
              v-model="paymentStore.cvc"
              class="input"
              type="text "
              placeholder="Enter a three number "
              :class="{ 'is-danger': paymentStore.errorbill.cvc }"
              @input="paymentStore.validateCvc()"
            />
            <span class="has-text-danger ertext ml-3">{{
              paymentStore.errorbill.cvc
            }}</span>
          </div>
        </div>

        <div class="column px-6">
          <a @click="paymentStore.submitbill()"
            ><button
              class="button is-fullwidth color_sign_blue font"
              type="submit "
            >
              ยืนยันการชำระเงิน
            </button></a
          >
          <p class="is-size-7 has-text-danger has-text-centered">
            หมายเหตุ : หากยืนยันการชำระเงินสำเร็จแล้ว
            คุณจะไม่สามารถยกเลิกการจองได้
          </p>
        </div>
        <div class="column px-6">
          <p class="line"></p>
        </div>
        <div class="column px-6">
          <router-link to="/myrent"
            ><button
              class="button is-fullwidth color_sign_white font"
              type="submit "
            >
              ยกเลิกการชำระเงิน
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
