import { defineStore } from 'pinia'
import axios from "@/plugins/axios"
import { ref } from "vue";


export const checkLateCarnotReturn = defineStore('returnCar', () => {
    const lateCarValue = ref([]);
    const getLateReturn = async () => {
        const fetchingData = await axios.get("/return");
        lateCarValue.value = fetchingData.data;
        console.log('fetchingData :>> ', lateCarValue.value);
    };

    return {
        getLateReturn,
        lateCarValue,
    }
})