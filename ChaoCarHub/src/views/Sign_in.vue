<script setup>
import { computed, ref, reactive, onMounted } from "vue";
// use pinia file
import { UseregisterStore } from "@/stores/register";
const registerStore  = UseregisterStore()


</script>

<template>

    <div class="hero is-fullheight">
        <div class="img_logo"></div>
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div>
                <div ALIGN="MIDDLE"><img src="https://media.discordapp.net/attachments/1072181252964233328/1076054960774598676/image-removebg-preview.png" height="220" width="260"></div>
                <div class="columns is-flex is-flex-direction-column card1">
                    <h1 class="th1">SIGN IN</h1>
                    <div class="column px-5">
                        <input v-model="registerStore.username" class="input input_username" type="text" placeholder="Username" :class="{'is-danger': registerStore.error.username}" @input="registerStore.validateUsername()">
                        <span class="has-text-danger ertext ml-3">{{registerStore.error.username}}</span>
                    </div>
                    <div class="column px-5">
                        <input v-model="registerStore.passw" class="input input_password" type="password" placeholder="Password" :class="{'is-danger': registerStore.error.passw}" @input="registerStore.validatePassw()">
                        <span class="has-text-danger ertext ml-3">{{registerStore.error.passw}}</span>
                    </div>
                    <div class="column px-5"> 
                        <a>
                            <button @click="registerStore.submitSignin()" class="button is-fullwidth color_sign_blue " type="submit">Sign in</button>
                        </a>
                    </div>
                    <div class="column px-5">
                        <p class="line"></p>
                    </div>
                    <div class="column px-5">
                        <router-link to="/sign_up"><button class="button  is-fullwidth color_sign_white" type="submit">Sign up</button></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


