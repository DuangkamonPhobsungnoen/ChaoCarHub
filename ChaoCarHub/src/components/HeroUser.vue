<script setup>
import { computed, ref, reactive, onMounted } from "vue";
// use pinia file
import { UseregisterStore } from "@/stores/register";
const registerStore  = UseregisterStore()
// onMounted()
</script>

<template>
    <section class="hero is-success is-halfheight is-gradient">
            <div class="hero-body">
                <div>
                    <p class="title">
                        {{registerStore.userProfile?.u_fname}} {{registerStore.userProfile?.u_lname}}
                    </p>
                    <p class="subtitle">
                        Track your rental status here!
                    </p>
                </div>
            </div>
        </section>
</template>



