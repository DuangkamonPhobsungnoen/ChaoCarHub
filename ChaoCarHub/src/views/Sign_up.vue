<script setup>
import { computed, ref, reactive, onMounted } from "vue";
import axios from "axios";
// use pinia file
import { UseregisterStore } from "@/stores/register";
const registerStore  = UseregisterStore()

</script>

<template>
  <div class="hero is-fullheight">
    <div class="hero-body is-justify-content-center is-align-items-center pt-0">
      <div>
        <div ALIGN="MIDDLE">
          <img
            src="../assets/image_signin.png"
            height="320"
            width="420"
          />
        </div>
        <div class="columns is-flex is-flex-direction-column card2">
          <h1 class="th1">SIGN UP</h1>
          <br />
          <div class="columns is-multiline px-5">
            <div class="column is-half">
              <input
                v-model="registerStore.fname"
                class="input bg_input"
                type="text"
                placeholder="First name "
                :class="{ 'is-danger': registerStore.error.fname }"
                @input="registerStore.validatefname()"
              />
              <span class="has-text-danger ertext ml-3">{{ registerStore.error.fname }}</span>
            </div>
            <div class="column is-half">
              <input
                v-model="registerStore.lname"
                class="input bg_input"
                type="text"
                placeholder="Last name "
                :class="{ 'is-danger': registerStore.error.lname }"
                @input="registerStore.validatelname()"
              />
              <span class="has-text-danger ertext ml-3">{{ registerStore.error.lname }}</span>
            </div>
          </div>
          <div class="columns px-5">
            <div class="column">
              <input
                v-model="registerStore.username"
                class="input input_username"
                type="text"
                placeholder="Username "
                :class="{ 'is-danger': registerStore.error.username }"
                @input="registerStore.validateUsername()"
              />
              <span class="has-text-danger ertext ml-3">{{
                registerStore.error.username
              }}</span>
            </div>
          </div>

          <div class="columns is-multiline px-5">
            <div class="column is-half">
              <input
                v-model="registerStore.passw"
                class="input input_password"
                type="password"
                placeholder="Password "
                :class="{ 'is-danger': registerStore.error.passw }"
                @input="registerStore.validatePassw()"
              />
              <span class="has-text-danger ertext ml-3">{{ registerStore.error.passw }}</span>
            </div>
            <div class="column is-half">
              <input
                v-model="registerStore.passw2"
                class="input input_password"
                type="password"
                placeholder="Confrim password "
                :class="{ 'is-danger': registerStore.error.passw2 }"
                @input="registerStore.validatePassw2()"
              />
              <span class="has-text-danger ertext ml-3">{{
                registerStore.error.passw2
              }}</span>
            </div>
          </div>
          <div class="columns is-multiline px-5">
            <div class="column is-half">
              <input
                v-model="registerStore.email"
                class="input input_email"
                type="text"
                placeholder="Email"
                :class="{ 'is-danger': registerStore.error.email }"
                @input="registerStore.validateEmail()"
              />
              <span class="has-text-danger ertext ml-3">{{ registerStore.error.email }}</span>
            </div>
            <div class="column is-half">
              <input
                v-model="registerStore.phone"
                class="input input_phone"
                type="text"
                placeholder="Phone "
                :class="{ 'is-danger': registerStore.error.phone }"
                @input="registerStore.validatePhone()"
              />
              <span class="has-text-danger ertext ml-3">{{ registerStore.error.phone }}</span>
            </div>
          </div>
          <div class="column px-5">
            <!-- <router-link to="/sign_in"> -->
            <button
              @click="registerStore.submitSignup()"
              class="button is-fullwidth color_sign_blue"
              type="submit "
            >
              Sign up
            </button>
            <!-- </router-link> -->
          </div>
          <div class="column px-5">
            <p class="line"></p>
          </div>
          <div class="column px-5">
            <router-link to="/sign_in">
              <button class="button is-fullwidth color_sign_white">
                Sign in
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
