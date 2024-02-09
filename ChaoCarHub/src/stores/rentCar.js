import { defineStore } from 'pinia'
import axios from 'axios';
import { computed, ref, reactive, onMounted } from "vue";
import { useLocalStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const UserentCarStore = defineStore('rent', () => {
  const router = useRouter()

  const brandcar = ["All", "Toyota", "Nissan", "Honda", "Mercedes Benz Sport", "Hyundai", "MG", "BMW",]
  const seatcar = ["2", "4", "5", "6", "7", "9"]
  const locationcar = ["สนามบินดอนเมือง", "สนามบินสุวรรณภูมิ", "สถานีรถไฟดอนเมือง", "ไอทีสแควร์", "BTS อนุสาวรีย์", "BTS อโศก", "BTS ช่องนนทรี", "ธรรมศาสตร์ รังสิต", "ฟิวเจอร์ปาร์ค รังสิต", "เซ็นทรัล อีสต์วิลล์", "แอร์พอร์ตลิงค์ ลาดกระบัง", "เซ็นทรัล พระราม 2", "แฟชั่น ไอซ์แลนด์"]

  //rent detail in localstorage
  const rentData = useLocalStorage('rentData', {})
  const rentInfo = reactive({
    timePickup: "",
    dayPickup: "",
    timeReturn: "",
    dayReturn: "",
    placePickup: "",
    placeReturn: "",
    amountDays: 0
  })

  const error = reactive({
    dayPickup: "",
    incorrectDate: "",
    dayReturn: "",
  })

  //v-model select option
  const filBrand = ref('All')
  const filPrice = ref("0-20000")
  const filSeat = ref('4')

  //fetch single car 
  const carDetail = ref({})
  const fetchSingleCar = async (id) => {
    console.log(id)
    return (await axios.get(`http://localhost:3000/detailcar/${id}`)).data[0]
  }

  const filterCar = ref([])
  const textFilterCar = ref("")
  //search car
  async function searchCar() {
    requiredInputCheck()
    validateDateTime()
    console.log(!!error.dayPickup, 'or', !!error.dayReturn)
    if (!!error.dayPickup || !!error.dayReturn) {
      return
    }
    if (!!error.incorrectDate) {
      alert(error.incorrectDate)
      return
    }
    //store rentInfo in localstorage
    rentData.value = rentInfo
    // console.log(rentData.value.dayPickup)
    const fetchingData = await axios.post("http://localhost:3000/search", {
      brand: filBrand.value,
      price: filPrice.value,
      seat: filSeat.value,
      start_date: rentData.value.dayPickup,
      end_date: rentData.value.dayReturn
    });
    filterCar.value = fetchingData.data;
    textFilterCar.value = ''
    // console.log('filterCar', filterCar.value.length)
    if (filterCar.value.length === 0) {
      textFilterCar.value = 'ขออภัยไม่พบรถที่ท่านต้องการค้นหา'
    }
    router.push('/showcar')

  }

  function requiredInputCheck() {
    if (rentInfo.dayPickup === "" || rentInfo.timePickup === "") {
      error.dayPickup = "กรุณากรอกวัน และเวลารับรถ";
      return;
    }
    if (rentInfo.dayReturn === "" || rentInfo.timeReturn === "") {
      error.dayReturn = "กรุณากรอกวัน และเวลาคืนรถ";
      return;
    }
    error.dayPickup = ""
    error.dayReturn = ""
  }

  function validateDateTime() {
    const currentDate = new Date()
    const rentDate = new Date(`${rentInfo.dayPickup}T${rentInfo.timePickup}`);
    //  console.log(rentDate)
    const returnDate = new Date(`${rentInfo.dayReturn}T${rentInfo.timeReturn}`);

    const diffCurrentRent = (rentDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
    //amount rent day
    rentInfo.amountDays = (returnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24);
    rentInfo.amountDays = rentInfo.amountDays.toFixed(0)
    // console.log(rentInfo.amountDays)
    if (rentDate < currentDate) {
      error.incorrectDate = "ห้ามเลือกวันในอดีต"
      return
    }
    if (diffCurrentRent < 1) {
      error.incorrectDate = "กรุณาจองล่วงหน้าอย่างน้อย 1-2 วัน"
      return
    }
    if (rentInfo.amountDays < 0) {
      error.incorrectDate = "กรุณาเลือกวันคืนรถ ที่ถัดจากวันรับรถ"
      return
    }
    if (rentInfo.amountDays < 1 && rentInfo.amountDays >= 0) {
      error.incorrectDate = "ระยะเวลาในการเช่าต้องมากกว่า 24 ชม."
      return
    }
    if (rentInfo.amountDays > 30) {
      error.incorrectDate = "ระยะเวลาในการเช่าห้ามเกิน 30 วัน"
      return
    }
    error.incorrectDate = ""
  }

  async function rentThisCar(userId, carId, totalPrice) {
    try {
      if (rentInfo.placePickup === '' || rentInfo.placeReturn === '') {
        const sweet = Swal.fire({
          icon: 'info',
          title: 'กรุณาเลือก สถานที่รับรถ/คืนรถ',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1'
        })
        return;
      }
      const fetchingData = await axios.post("http://localhost:3000/rent", {
        totalPrice: totalPrice,
        timePickup: rentData.value.timePickup,
        dayPickup: rentData.value.dayPickup,
        timeReturn: rentData.value.timeReturn,
        dayReturn: rentData.value.dayReturn,
        placePickup: rentInfo.placePickup,
        placeReturn: rentInfo.placeReturn,
        amountDays: rentData.value.amountDays,
        carId: carId,
        userId: userId
      });
      //ถูกจองตัดหน้าไปแล้วจ้า
      if (fetchingData.data.message === 400) {
        console.log("cant rent jaa")
        const sweet = Swal.fire({
          title: 'ขออภัย รถคันนี้ถูกจองไปแล้ว กรุณาเลือกรถคันใหม่',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1'
        })
        router.push('/showcar')
        return;
      }
      const sweet = Swal.fire({
        icon: "success",
        title: 'กรุณากดชำระเงิน ในขั้นตอนถัดไป',
        confirmButtonText: 'OK',
        confirmButtonColor: '#41BEB1'
      })
      router.push('/myrent')
    } catch (err) {
      console.log("err", err)
    }
  }

  async function reserveCar(item) {
    if (rentInfo.dayPickup === "" || rentInfo.timePickup === "" || rentInfo.dayReturn === "" || rentInfo.timeReturn === "") {
      const sweet = Swal.fire({
        icon: "warning",
        title: 'กรุณากรอกวันและเวลาจองรถ',
        confirmButtonText: 'OK',
        confirmButtonColor: '#41BEB1'
      })
    }
    else {
      router.push({ name: 'detailcar', params: { id: parseInt(item) } })
    }
  }

  return {
    brandcar,
    seatcar,
    rentInfo,
    error,
    filBrand,
    filPrice,
    filSeat,
    searchCar,
    filterCar,
    fetchSingleCar,
    locationcar,
    rentData,
    validateDateTime,
    requiredInputCheck,
    carDetail,
    rentThisCar,
    reserveCar,
    textFilterCar
  }
})