<script setup>
import { inject } from "vue";
import { computed, ref, reactive, onMounted, provide } from "vue";
//send click status to myrent
const sharedValue = inject("sharedValue");

const sendValueToParent = (page) => {
  sharedValue.value = page;
};

const home = ref(true);
const create = ref(false);
const updatedelete = ref(false);
const payment = ref(false);
const returncar = ref(false);
const statuscus = ref(false);
const checkLateCar = ref(false);
</script>

<template>
  <section>
    <div class="columns p-5 has-background-primary-light border_td">
      <div class="column" id="ibar" @click="
        sendValueToParent('home'),
        (home = true),
        (create = false),
        (updatedelete = false),
        (payment = false),
        (returncar = false),
        (statuscus = false),
        (checkLateCar = false)
        " :class="{ 'is-color-transgreen': home }">
        <div class="card-image has-text-centered">
          <img src="https://cdn-icons-png.flaticon.com/512/747/747589.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>HOME</b>
        </div>
      </div>

      <div class="column" id="ibar" @click="
        sendValueToParent('statuscus'),
        (home = false),
        (create = false),
        (updatedelete = false),
        (payment = false),
        (returncar = false),
        (statuscus = true),
        (checkLateCar = false)
        " :class="{ 'is-color-transgreen': statuscus }">
        <div class="card-image has-text-centered">
          <img src="https://cdn-icons-png.flaticon.com/512/5249/5249378.png" alt="Placeholder image" width="50"
            height="50" />
          <img src="https://cdn-icons-png.flaticon.com/512/10533/10533005.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>CUSTOMER</b>
        </div>
      </div>

      <div class="column" id="ibar" @click="
        sendValueToParent('updatedelete'),
        (home = false),
        (create = false),
        (updatedelete = true),
        (payment = false),
        (returncar = false),
        (statuscus = false),
        (checkLateCar = false)
        " :class="{ 'is-color-transgreen': updatedelete }">
        <div class="card-image has-text-centered">
          <img src="https://cdn-icons-png.flaticon.com/512/3133/3133900.png" alt="Placeholder image" width="50"
            height="50" />
          <img src="https://cdn-icons-png.flaticon.com/512/871/871867.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>MANAGE CAR</b>
        </div>
      </div>

      <div class="column" id="ibar" @click="
        sendValueToParent('payment'),
        (home = false),
        (create = false),
        (updatedelete = false),
        (payment = true),
        (returncar = false),
        (statuscus = false),
        (checkLateCar = false)
        " :class="{ 'is-color-transgreen': payment }">
        <div class="card-image has-text-centered">
          <img src="https://cdn-icons-png.flaticon.com/512/5688/5688249.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>PAYMENT</b>
        </div>
      </div>

      <div class="column" id="ibar" @click="
        sendValueToParent('returncar'),
        (home = false),
        (create = false),
        (updatedelete = false),
        (payment = false),
        (returncar = true),
        (statuscus = false),
        (checkLateCar = false)
        " :class="{ 'is-color-transgreen': returncar }">
        <div class="card-image has-text-centered">
          <img class="" src="https://cdn-icons-png.flaticon.com/512/4422/4422557.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>CAR RETURNED</b>
        </div>
      </div>

      <div class="column" id="ibar" @click="
        sendValueToParent('checkLateCar'),
        (home = false),
        (create = false),
        (updatedelete = false),
        (payment = false),
        (returncar = false),
        (statuscus = false),
        (checkLateCar = true)
        " :class="{ 'is-color-transgreen': checkLateCar }">
        <div class="card-image has-text-centered">
          <img class="" src="https://cdn-icons-png.flaticon.com/512/4422/4422557.png" alt="Placeholder image" width="50"
            height="50" />
          <br /><b>LATE RETURN</b>
        </div>
      </div>
    </div>
  </section>
</template>
