import { defineStore } from "pinia";
import { computed, ref, reactive, onMounted } from "vue";
import axios from "../plugins/axios";
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const UsecrudCarStore = defineStore("car", () => {
  const router = useRouter()

  //FetchCar
  const carvalue = ref([]);
  const FetchCar = async () => {
    const fetchingData = await axios.get("/car");
    carvalue.value = fetchingData.data;
  };

  //search input
  const searchInput = ref("")

  const toSearch = () => {
    // console.log('searchInput toseach', searchInput.value)
    searchValue()
  }

  const searchValue = async () => {
    console.log('searchInput searchValue', searchInput.value)
    const fetchingData = await axios.get('/search',
      {
        params: {
          searchInput: searchInput.value
        }
      }
    )
    console.log(fetchingData.data);
    carvalue.value = fetchingData.data
  }

  const searchInputCus = ref("")

  const toSearchCus = () => {
    // console.log('searchInput toseach', searchInput.value)
    searchValueCus()
  }

  const searchValueCus = async () => {
    const fetchingData = await axios.get('/searchcus',
      {
        params: {
          searchInputCus: searchInputCus.value
        }
      }
    )
    console.log(fetchingData.data);
    cusValue.value = fetchingData.data
  }

  //FetchCarToyota
  const toyotacar = ref([])
  const FetchCarToyota = async () => {
    const fetchingData = await axios.get("/car/toyota");
    toyotacar.value = fetchingData.data;
  };

  //FetchCarNissan
  const nissancar = ref([])
  const FetchCarNissan = async () => {
    const fetchingData = await axios.get("/car/nissan");
    nissancar.value = fetchingData.data;
  };

  //FetchCarHonda
  const hondacar = ref([])
  const FetchCarHonda = async () => {
    const fetchingData = await axios.get("/car/honda");
    hondacar.value = fetchingData.data;
  };

  //FetchCarOther
  const othercar = ref([])
  const FetchCarOther = async () => {
    const fetchingData = await axios.get("/car/other");
    othercar.value = fetchingData.data;
  };


  //showConfirmation ยืนยันการลบรถ
  const showAlertDelete = ref(false);
  const alertMessage = ref('');
  const confirmResult = ref(null);
  const carId = ref(0)
  async function showConfirmation(carBrand, carModel, car_id) {
    showAlertDelete.value = true;
    alertMessage.value = `กรุณากดยืนยันการลบรถ ${carBrand} ${carModel} ออกจากระบบ`;
    carId.value = car_id
  };

  //confirmdeleteCar
  async function confirmdeleteCar(result) {
    confirmResult.value = result;
    showAlertDelete.value = false;

    if (result) {
      // ถ้ากดตกลงก็จะลบ card
      try {
        axios.delete(`/car/${carId.value}`, {
          carId: carId.value
        })
        carvalue.value = carvalue.value.filter((car) => car.car_id !== carId.value)
        const sweet = Swal.fire({
          icon: "success",
          title: 'ลบรถสำเร็จแล้ว!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1'
        })
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบข้อมูล', error);
      }
    }
  }

  //editCar
  const carupdate = ref([]);
  async function editCar(carId) {
    const fetchingData = await axios.get(`/car/${carId}`);
    carupdate.value = fetchingData.data;
    console.log(carupdate.value)
  }

  //update delete
  const carIdd = ref('');
  const carCode = ref('');
  const carBrand = ref('');
  const carModel = ref('');
  const carSeat = ref('');
  const carBag = ref('');
  const carPrice = ref('');
  const carImageURL = ref('');
  const showAlertUpdate = ref(false);
  const fileImg = ref(null);
  const imageURL = ref(null);
  const carStatus = ref('Available');

  const error = {
    carCode: ref(''),
    carBrand: ref(''),
    carModel: ref(''),
    carSeat: ref(''),
    carBag: ref(''),
    carPrice: ref(''),
    carStatus: ref('')
  };

  //previewImage โชว์รูป
  async function previewImage(event) {
    const file = event.target.files[0];
    fileImg.value = event.target.files[0];
    const maxFileSize = 1048576; // 1 MB file size limit
    if (file.size > maxFileSize) {
      const sweet = await Swal.fire({
        icon: "error",
        title: "image size can not more than 1 MB",
        confirmButtonText: 'Close'
      })
      imageURL.value = null;

    } else if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        imageURL.value = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      imageURL.value = null;
      const sweet = await Swal.fire({
        icon: "error",
        title: "Invalid file. Please select an image.",
        confirmButtonText: 'Close'
      })

    }
  }

  //fetchCarEdit fetch car เพื่อเอามาแก้ไข
  const fetchCarEdit = async (cId) => {
    try {
      const response = await axios.get(`/car/${cId}`)
        .then((response) => {
          const carData = response.data[0];
          console.log(carData.car_id)
          carIdd.value = carData.car_id;
          carCode.value = carData.car_code;
          carBrand.value = carData.car_brand;
          carModel.value = carData.car_model;
          carSeat.value = carData.car_seat;
          carBag.value = carData.car_bag;
          carPrice.value = carData.car_rentprice;
          carImageURL.value = carData.car_img;
          carStatus.value = carData.car_status;

          // console.log(fileImg.value)
          showAlertUpdate.value = true;
        })

    } catch (error) {
      console.log(error);
    }
  };


  //update button
  const confirmInsert = async (result) => {
    confirmResult.value = result;
    showAlertUpdate.value = false;
    validateCarCode();
    validateCarBrand();
    validateCarModel();
    validateCarSeat();
    validateCarBag();
    validateCarPrice();
    validateCarStatus();

    if (result === true) {
      try {
        let formData = new FormData();
        formData.append('car_code', carCode.value);
        formData.append('car_brand', carBrand.value);
        formData.append('car_model', carModel.value);
        formData.append('car_seat', carSeat.value);
        formData.append('car_bag', carBag.value);
        formData.append('car_rentprice', carPrice.value);
        formData.append('car_status', carStatus.value);
        if (fileImg.value) {
          formData.append('myImageCar', fileImg.value);
        }


        console.log("file ", fileImg.value)

        const response = await axios.put(
          `/updatecar/${carIdd.value}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        carvalue.value = response.data[0]
        console.log(response.data[0])
        const sweet = Swal.fire({
          icon: 'success',
          title: 'อัพเดตรถสำเร็จแล้ว!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1',
        });
      } catch (error) {
        const sweet = Swal.fire({
          icon: 'error',
          title: 'แก้ไขรถไม่สำเร็จ กรุณาตรวจสอบว่ากรอกข้อมูลถูกต้องและครบถ้วนหรือไม่!',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1',
        });
        console.log(error);
      }
    }
  }

  // add car
  const validateCarCode = () => {
    if (carCode.value === '') {
      error.carCode.value = 'กรุณากรอกรหัสรถ';
    } else {
      error.carCode.value = '';
    }
  };

  //validateCarBrand
  const validateCarBrand = () => {
    if (carBrand.value === '') {
      error.carBrand.value = 'กรุณากรอกยี่ห้อรถ';
    } else {
      error.carBrand.value = '';
    }
  };

  //validateCarModel
  const validateCarModel = () => {
    if (carModel.value === '') {
      error.carModel.value = 'กรุณากรอกรุ่นรถ';
    } else {
      error.carModel.value = '';
    }
  };

  //validateCarSeat
  const validateCarSeat = () => {
    if (carSeat.value === '') {
      error.carSeat.value = 'กรุณากรอกจำนวนที่นั่งรถ';
    } else if (isNaN(carSeat.value)) {
      error.carSeat.value = 'กรุณากรอกจำนวนที่นั่งรถเป็นตัวเลข';
    } else if ((carSeat.value) < 2) {
      error.carSeat.value = 'กรุณากรอกจำนวนที่นั่งอย่างน้อย 2 ที่นั่ง';
    } else if ((carSeat.value) > 20) {
      error.carSeat.value = 'กรุณากรอกจำนวนที่นั่งไม่เกิน 20 ที่นั่ง';
    } else {
      error.carSeat.value = '';
    }
  };

  //validateCarBag
  const validateCarBag = () => {
    if (carBag.value === '') {
      error.carBag.value = 'กรุณากรอกจำนวนที่วางกระเป๋า';
    } else if (isNaN(carBag.value)) {
      error.carBag.value = 'กรุณากรอกจำนวนที่วางกระเป๋าเป็นตัวเลข';
    } else if ((carBag.value) < 1) {
      error.carBag.value = 'กรุณากรอกจำนวนที่วางกระเป๋าอย่างน้อย 1 ที่';
    } else if ((carBag.value) > 5) {
      error.carBag.value = 'กรุณากรอกจำนวนที่วางกระเป๋าไม่เกิน 5 ที่';
    } else {
      error.carBag.value = '';
    }
  };

  //validateCarPrice
  const validateCarPrice = () => {
    if (carPrice.value === '') {
      error.carPrice.value = "กรุณากรอกราคารถ";
    } else if (isNaN(carPrice.value)) {
      error.carPrice.value = "กรุณากรอกราคารถเป็นตัวเลข";
    } else if ((carPrice.value) < 500) {
      error.carPrice.value = "กรุณากรอกราคารถอย่างน้อย 500 บาท";
    } else if ((carPrice.value) > 50000) {
      error.carPrice.value = "กรุณากรอกราคารถไม่เกิน 50000 บาท";
    } else {
      error.carPrice.value = "";
    }
  };

  //validateFileType
  function validateFileType() {
    var inputElement = document.getElementById('file');
    var files = inputElement.files;
    if (files.length == 0) {
      alert("กรุณาเลือกไฟล์รูป");
      return false;
    }
  }

  const validateCarStatus = () => {
    const carStatusLower = carStatus.value.toLowerCase();
    if (carStatusLower === '') {
      error.carStatus.value = 'กรุณากรอกสถานะรถ';
    } else if (carStatusLower !== 'available' && carStatusLower !== 'maintain') {
      error.carStatus.value = 'กรอกสถานะ Available or Maintain';
    } else {
      error.carStatus.value = '';
    }
  };

  const showModalAddCar = ref(false);
  const addCarModal = () => {
    resetTextValue()
    showModalAddCar.value = true;
    console.log('showModalAddCar---', showModalAddCar.value)
  }

  const resetTextValue = () => {
    carIdd.value = '';
    carCode.value = '';
    carBrand.value = '';
    carModel.value = '';
    carSeat.value = '';
    carBag.value = '';
    carPrice.value = '';
    carImageURL.value = '';
    showAlertUpdate.value = false;
    fileImg.value = null;
    imageURL.value = null;
    carStatus.value = 'Available';
  }

  //addCar
  async function addCar() {
    validateCarCode();
    validateCarBrand();
    validateCarModel();
    validateCarSeat();
    validateCarBag();
    validateCarPrice();
    validateFileType()
    validateCarStatus()


    let formData = new FormData();
    formData.append('car_code', carCode.value);
    formData.append('car_brand', carBrand.value);
    formData.append('car_model', carModel.value);
    formData.append('car_seat', carSeat.value);
    formData.append('car_bag', carBag.value);
    formData.append('car_rentprice', carPrice.value);
    formData.append('myImageCar', fileImg.value);
    formData.append('car_status', carStatus.value);


    try {
      showModalAddCar.value = false;
      const response = await axios.post('/car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      FetchCar()

      if (response.data.check === false) {
        const sweet = Swal.fire({
          icon: 'error',
          title: 'หมายเลขรถ เคยถูกเพิ่มไปแล้ว',
          confirmButtonText: 'OK',
          confirmButtonColor: '#41BEB1',
        });
        return
      }
      const sweet = Swal.fire({
        icon: 'success',
        title: 'เพิ่มรถสำเร็จแล้ว!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#41BEB1',
      });
    } catch (error) {
      console.log(error.message);
      const sweet = Swal.fire({
        icon: 'error',
        title: 'เพิ่มรถสำเร็จไม่สำเร็จ กรุณาตรวจสอบว่ากรอกข้อมูลถูกต้องและครบถ้วนหรือไม่!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#41BEB1',
      });
    }
  };

  const cusValue = ref([])
  const myCus = async () => {
    const fetchingData = await axios.get("/admin/cus");
    cusValue.value = fetchingData.data;
  };
  return {
    FetchCar,
    carvalue,
    FetchCarToyota,
    toyotacar,
    FetchCarNissan,
    nissancar,
    FetchCarHonda,
    hondacar,
    FetchCarOther,
    othercar,
    showAlertDelete,
    alertMessage,
    confirmResult,
    showConfirmation,
    confirmdeleteCar,
    editCar,
    carupdate,
    carIdd,
    carCode,
    carBrand,
    carModel,
    carSeat,
    carBag,
    carPrice,
    carImageURL,
    carStatus,
    showAlertUpdate,
    confirmResult,
    fetchCarEdit,
    confirmInsert,
    previewImage,
    addCar,
    validateCarCode,
    validateCarBrand,
    validateCarModel,
    validateCarSeat,
    validateCarBag,
    validateCarPrice,
    validateFileType,
    validateCarStatus,
    error,
    searchInput,
    toSearch,
    searchValue,
    cusValue,
    myCus,
    searchInputCus,
    searchValueCus,
    toSearchCus,
    addCarModal,
    showModalAddCar
  };
});
