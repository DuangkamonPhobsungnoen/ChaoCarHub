<script>
// import {useCardemoStore} from "@/stores/Cardemo";
// const carStore = useCardemoStore();
export default {
  data: () => ({
    cars: [
      {
        id: 1,
        brand: "Toyota",
        model: "Yaris",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/yaris_2016-2019.png",
        seat: 4,
        bag: 1,
        price: 1190,
      },
      {
        id: 2,
        brand: "Toyota",
        model: "Fortuner",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/Fortuner_2016-2018_VbSeQ0L.png",
        seat: 7,
        bag: 3,
        price: 3500,
      },
      {
        id: 3,
        brand: "Toyota",
        model: "Camry",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079086476169588766/Car_with_Driver_210304_29-removebg-preview.png",
        seat: 4,
        bag: 2,
        price: 3500,
      },
      {
        id: 4,
        brand: "Toyota",
        model: "Alphard",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/Toyota_Alphard_2018_yJyb1bM.png",
        seat: 7,
        bag: 5,
        price: 9900,
      },
      {
        id: 5,
        brand: "Toyota",
        model: "Commuter",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/Toyota_Commuter__z4uZ6f8.png",
        seat: 9,
        bag: 5,
        price: 3000,
      },
      {
        id: 6,
        brand: "Nissan",
        model: "Almera",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079086719644737586/almera_lrg-removebg-preview.png",
        seat: 5,
        bag: 1,
        price: 1141,
      },
      {
        id: 7,
        brand: "Nissan",
        model: "March",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079087743126208582/micra_lrg-removebg-preview.png",
        seat: 4,
        bag: 1,
        price: 975,
      },
      {
        id: 8,
        brand: "Nissan",
        model: "Kicks",
        img: "https://www.car250.com/wp-content/uploads/2019/07/Nissan-Kicks-2019-23.png",
        seat: 5,
        bag: 1,
        price: 2190,
      },
      {
        id: 9,
        brand: "Nissan",
        model: "Leaf",
        img: "https://blog.hamrobazaar.com/wp-content/uploads/2020/12/Nissan-Leaf.png",
        seat: 4,
        bag: 1,
        price: 8900,
      },
      {
        id: 10,
        brand: "Nissan",
        model: "Teana",
        img: "https://fj.lnwfile.com/_/fj/_raw/hb/al/m9.png",
        seat: 4,
        bag: 1,
        price: 7150,
      },
      {
        id: 11,
        brand: "Nissan",
        model: "Urvan",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1077292220387958934/77-772232_01-nv350-urvan-exterior-hd-png-download-removebg-preview.png",
        seat: 9,
        bag: 5,
        price: 9900,
      },
      {
        id: 12,
        brand: "Honda",
        model: "City",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079086989908918322/city_lrg-removebg-preview.png",
        seat: 4,
        bag: 1,
        price: 1259,
      },
      {
        id: 13,
        brand: "Honda",
        model: "BRV",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079087141314908170/brv_lrg-removebg-preview.png",
        seat: 5,
        bag: 3,
        price: 2805,
      },
      {
        id: 14,
        brand: "Honda",
        model: "Civic",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079087308881526885/civic_sedan_lrg-removebg-preview.png",
        seat: 5,
        bag: 2,
        price: 1579,
      },
      {
        id: 15,
        brand: "Mercedes Benz Sport",
        model: null,
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/02.png",
        seat: 2,
        bag: 2,
        price: 14900,
      },
      {
        id: 16,
        brand: "Hyundai",
        model: "H1",
        img: "https://media.discordapp.net/attachments/1072181252964233328/1079086066998452304/Car_with_Driver_210304_71-removebg-preview.png",
        seat: 7,
        bag: 3,
        price: 3300,
      },
      {
        id: 17,
        brand: "MG",
        model: "HS",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/MG_HS_2021.png",
        seat: 7,
        bag: 2,
        price: 2553,
      },
      {
        id: 18,
        brand: "BMW",
        model: "Series 7",
        img: "https://car-with-driver.s3-ap-southeast-1.amazonaws.com/cars/bmw_series_7.png",
        seat: 4,
        bag: 2,
        price: 15000,
      },
    ],
    brandcar: [
      "Toyota",
      "Nissan",
      "Honda",
      "Mercedes Benz Sport",
      "Hyundai",
      "MG",
      "BMW",
    ],
    pricecar: [
      "500-999",
      "1000-1999",
      "2000-2999",
      "3000-3999",
      "4000-4999",
      "5000",
    ],
    seatcar: ["2", "4", "5", "6", "7", "9"],
    rent: {
      dsend: "",
      dreturn: "",
      time: "",
    },
    sbrand: "",
    sprice: 0,
    sseat: 0,
    filter_car: [],
    errorday: {
      rent_dsend: "",
      rent_dreturn: "",
      rent_time: "",
    },
    CheckDsend: "",
    CheckDreturn: "",
    amountD: "",
    rstation: {
      st1: "สนามบินสุวรรณภูมิ",
      st2: "สนามบินสุวรรณภูมิ",
    },
  }),
  methods: {
    detailCar(item) {
      console.log(item);
      const myjson = JSON.stringify(item);
      localStorage.setItem("mycart", myjson);
      // location.href = "./";
    },
  },
  created() {
    const text = JSON.parse(localStorage.getItem("myfilter"));
    this.filter_car = text;
    console.log(text);
  },
};
</script>

<template>
  <!-- card car-->
  <div class="column">
    <div class="container is-max-desktop">
      <br />
      <b>รุ่นรถ/ช่วงราคา/จำนวนที่นั่ง<br /><br /> </b>
      <div class="columns">
        <div class="column">
          <div class="is-multiline is-variable columns">
            <div
              v-for="(item, index) in filter_car"
              id="card_product "
              class="column is-one-quarter"
            >
              <div class="card has-text-centered is-border-radius">
                <div class="card-image px-5 pt-2">
                  <figure class="image is-4by3">
                    <img :src="item.img" alt="Placeholder image " />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-size-6 limit_text">
                        {{ item.brand }} {{ item.model }}
                      </p>
                      <p class="subtitle is-size-7">
                        <img
                          src="https://media.discordapp.net/attachments/1072181252964233328/1077073362708332614/image_18.png "
                          alt=" "
                        />
                        <b
                          >{{ item.seat }} ที่นั้ง <br />
                          เริ่มต้น {{ item.price }} บาท/วัน</b
                        >
                      </p>
                    </div>
                  </div>
                </div>
                <footer id="app" class="card-footer">
                  <div
                    @click="detailCar(item)"
                    class="card-footer-item is-size-6 is-color-green3"
                  >
                    <router-link to="/detailcar">
                      <strong class="has-text-white">จองคันนี้</strong>
                    </router-link>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
