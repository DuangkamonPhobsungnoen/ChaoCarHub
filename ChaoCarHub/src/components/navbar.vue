<script setup>
import { computed, ref, reactive, onMounted } from "vue";
// use pinia file
import { UseregisterStore } from "@/stores/register";
const registerStore  = UseregisterStore()

onMounted(async () => {
      const user =  registerStore.onAuthChange()
    });

const check = true;
</script>
<template>
  <nav
    class="navbar border_t"
    role="navigation"
    aria-label="main navigation"
    style="background: var(--color-gradient)"
  >
    <div class="navbar-brand">
      <a
        class="navbar-item has-text-white is-size-5 has-text-weight-bold"
        href=""
      >
        Cha<img
          src="../assets/navbar/1.png"
        />
        CarHUB
      </a>
      <a
        role="button"
        class="navbar-burger has-text-centered"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <div class="is-size-7"><a href="index.html">HOME</a></div>
        <div class="is-size-7"><a href="view_car.html">CAR</a></div>
        <div class="is-size-7"><a href="me_checkout.html">ME</a></div>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/">
            <img
              src="../assets/navbar/2.png"
            />
          </router-link>
        </div>
        <div class="navbar-item">
          <router-link to="/showcar">
            <img
              src="../assets/navbar/3.png"
            />
          </router-link>
        </div>
        <div class="navbar-item has-dropdown is-hoverable has-text-centered" v-if="registerStore.userProfile?.role !== 'admin' && registerStore.userProfile?.role !== 'user'">
          <a class="navbar-link">
            <router-link to="/myrent">
              <img
                src="../assets/navbar/4.png"
              />
            </router-link>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              <router-link to="/sign_in">
                <strong>Sign in</strong>
              </router-link>
            </a>
            <a class="navbar-item">
              <router-link to="/sign_up">
                <strong>Sign up</strong>
              </router-link>
            </a>
          </div>
          
        </div>
        <div class="navbar-item has-dropdown is-hoverable has-text-centered" v-if="registerStore.userProfile?.role === 'user'">
          <a class="navbar-link">
            <router-link to="/myrent">
              <img
                src="../assets/navbar/5.png"
              />
            </router-link>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="registerStore.logout()">
                <strong>Log out</strong>
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable has-text-centered" v-if="registerStore.userProfile?.role === 'admin'">
          <a class="navbar-link">
            <router-link to="/admin">
              <img
                src="../assets/navbar/6.png"
              />
            </router-link>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="registerStore.logout()">
                <strong>Log out</strong>
            </a>
          </div>
        </div>
        <div class="navbar-item"></div>
      </div>
    </div>
  </nav>
  <!-- <router-view :key="$route.fullPath" @auth-change="registerStore.onAuthChange" :user="user" /> -->
</template>

<!-- <script>
export default {
  data () {
    return {
      user: null,
    }
  }
}
</script> -->
