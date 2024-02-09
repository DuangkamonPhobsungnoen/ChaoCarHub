<script setup>
import { UsecrudCarStore} from '../../stores/crud_Car'
import { computed, ref, reactive, onMounted } from "vue";
const CarStore =  UsecrudCarStore()
onMounted(CarStore.FetchCarToyota)
onMounted(CarStore.FetchCarNissan)
onMounted(CarStore.FetchCarHonda)
onMounted(CarStore.FetchCarOther)
import CardCar from '../CardCar.vue';
</script>

<template>
  <div class="container is-max-desktop">
    <div class="column">
      <b class="is-size-5"> รถเช่ายอดฮิต <router-link to="/showcar"><u class="ha3s-text-danger"></u></router-link><br /><br /> </b>
      <div class="columns is-half">
        <div class="column is-two-fifths px-6 is-vertical">
          <div class="card-image pt-3">
            <b class="is-size-3" >Toyota</b>
            <br /><br />
            <figure class="image is-3by3">
              <img src="https://media.discordapp.net/attachments/1072181252964233328/1077261540748701726/home_car.png " alt="Placeholder image "/>
            </figure>
          </div>
          <div class="card-image  pt-6">
            <b class="is-size-3">Nissan</b>
            <br /><br />
            <figure class="image is-3by3">
              <img src="https://cdn.discordapp.com/attachments/1072181252964233328/1077263056326889543/gqdupg.png" alt="Placeholder image "/>
            </figure>
          </div>
          <div class="card-image  pt-6">
            <b class="is-size-3">Honda</b>
            <br /><br />
            <figure class="image is-3by3">
              <img src="https://media.discordapp.net/attachments/1072181252964233328/1077265050923962449/1-honda-city-can-tho-auto-removebg-preview.png?width=765&height=510" alt="Placeholder image "/>
            </figure>
          </div>
        </div>
        <!-- <h1> {{  CarStore.toyotacar}}</h1> -->
        <div class="column">
          <div class="is-multiline is-variable columns is-1">
              <CardCar v-for="item in CarStore.toyotacar?.slice(0, 3)" :item="item" id="card_product " class="column is-one-third"></CardCar>     
              <CardCar v-for="item in CarStore.nissancar?.slice(0, 3)" :item="item" id="card_product " class="column is-one-third"></CardCar> 
              <CardCar v-for="item in CarStore.hondacar?.slice(0, 3)" :item="item" id="card_product " class="column is-one-third"></CardCar>         
          </div>
        </div>
      </div> 
      <!-- card other -->
      <div class="column pl-6">
        <div class="column">
          <b class="is-size-3">Other</b><br />
          <div class="is-multiline is-variable columns is-1 pl-6">
            <CardCar v-for="item in CarStore.othercar?.slice(0, 4)" :item="item" id="card_product " class="column is-one-quarter"></CardCar>         
          </div>
        </div>
      </div>
    </div>
  </div>
</template>