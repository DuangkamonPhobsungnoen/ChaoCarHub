import { defineStore } from 'pinia'
import axios from "@/plugins/axios"
import { computed, ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'


export const UseregisterStore = defineStore('register', () => {

  const router = useRouter()

  const fname = ref("");
  const lname = ref("");
  const username = ref("");
  const passw = ref("");
  const passw2 = ref("");
  const phone = ref("");
  const email = ref("");
  const error = reactive({
    fname: "",
    lname: "",
    username: "",
    passw: "",
    passw2: "",
    phone: "",
    email: "",
  });

  //validatefname
  function validatefname() {
    console.log(typeof fname.value);
    if (fname.value === "") {
      error.fname = "กรุณากรอกชื่อจริง";
      return;
    }
    else if (!isNaN(fname.value)) {
      error.fname = "กรุณากรอกชื่อจรืงเป็นตัวอักษร";
      return;
    } 
    error.fname = "";
  }

  //validatelname
  function validatelname() {
    if (lname.value === "") {
      error.lname = "กรุณากรอกนามสกุล";
      return;
    }
    else if (!isNaN(lname.value)) {
      error.lname = "กรุณากรอกนามสกุลเป็นตัวอักษร";
      return;
    }
    error.lname = "";
  }

  //validateUsername
  function validateUsername() {
    if (username.value === "") {
      error.username = "กรุณากรอกชื่อผู้ใช้";
      return;
    }
    else if (!isNaN(username.value)) {
      error.username = "กรุณากรอกชื่อผู้ใช้เป็นตัวอักษร";
      return;
    }
    else if (username.value.length < 5) {
      error.username = "กรุณากรอกชื่อผู้ใช้มากกว่า 5 ตัวอักษร";
      return;
    }
    else if (username.value.length > 50) {
      error.username = "ชื่อผู้ใช้ห้ามยาวเกินไป";
      return;
    }
    error.username = "";
  }

  //validatePassw
  function validatePassw() {
  const hasUpperCase = /[A-Z]/.test(passw.value);
  const hasLowerCase = /[a-z]/.test(passw.value);
  const hasNumber = /[0-9]/.test(passw.value);

    if (passw.value === "") {
      error.passw = "กรุณากรอกรหัสผ่าน";
      return;
    }
    else if (passw.value.length < 8) {
      error.passw = "รหัสผ่านห้ามน้อยกว่า 8 ตัวอักษร";
      return;
    }
    else if (hasUpperCase === false || hasLowerCase === false || hasNumber === false) {
      error.passw = 'รหัสผ่านจำเป็นต้องมีอักษรพิมพ์เล็ก-ใหญ่ และตัวเลข'
      return;
    }
    error.passw = "";
  }
  
  //validatePassw2
  function validatePassw2() {
    if (passw2.value === "") {
      error.passw2 = "กรุณากรอกยืนยันรหัสผ่าน";
      return;
    }
    else if (passw2.value !== passw.value) {
      error.passw2 = "รหัสผ่านไม่ตรงกัน";
      return;
    }
    error.passw2 = "";
  }

  //validateEmail
  function validateEmail() {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const vEmail = emailPattern.test(email.value)
    if (email.value === "") {
      error.email = "กรุณากรอกอีเมล";
      return;
    } 
    else if (vEmail === false) {
      error.email = "กรุณากรอกอีเมลให้ถูกต้อง";
      return;
    }
    error.email = "";
  }

  //validatePhone
  function validatePhone() {
    const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    const vPhone = phonePattern.test(phone.value)
    if (phone.value === "") {
      error.phone = "กรุณากรอกหมายเลขโทรศัพท์";
      return;
    }
    else if (vPhone === false) {
      error.phone = "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง";
      return;
    }
    error.phone = "";
  }

  //button signup
  async function submitSignup() {
    validatefname();
    validatelname();
    validateUsername();
    validatePassw();
    validatePassw2();
    validateEmail();
    validatePhone();
    if (
      error.fname !== "" ||
      error.lname !== "" ||
      error.username !== "" ||
      error.passw !== "" ||
      error.passw2 !== "" ||
      error.email !== "" ||
      error.phone !== ""
    ) {
      return;
    }

    axios.post("/user/signup", {
      u_fname: fname.value,
      u_lname: lname.value,
      u_username: username.value,
      u_pass: passw.value,
      u_phone: phone.value,
      u_email: email.value,
      cf_password: passw2.value
    })

      .then((res) => {
        if (res.data.check === false) {
          const sweet = Swal.fire({
            icon: 'error',
            title: 'Username is already exist',
            confirmButtonText: 'Close',
            confirmButtonColor: '#41BEB1'
          })
          return
        }
        const sweet = Swal.fire({
          icon: 'success',
          title: 'Sign up success',
          confirmButtonText: 'Close',
          confirmButtonColor: '#41BEB1'
        })
        router.push('/sign_in')
        // window.location.href = '/sign_in'
      })
      .catch((err) => {
        const sweet = Swal.fire({
          icon: 'error',
          title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
          confirmButtonText: 'Close',
          confirmButtonColor: '#41BEB1'
        })
        console.log(err.response.data)
      });
  }

  //button signin
  async function submitSignin() {
    validateUsername()
    validatePassw()
    if (error.username !== '' || error.passw !== '') {
      const sweet = Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ถูกต้อง',
        confirmButtonText: 'Close',
        confirmButtonColor: '#41BEB1'
      })
      return
    }
    axios.post("/user/signin", {
      username: username.value,
      password: passw.value
    })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log("ล็อกอินสำเร็จ")
        window.location.href = '/'
      })
      .catch(error => {
        console.log(error)
        const sweet = Swal.fire({
          icon: 'error',
          title: 'Incorrect username or password',
          confirmButtonText: 'Close',
          confirmButtonColor: '#41BEB1'
        })
      });
  }

  //get user from db
  const userProfile = ref({})
  async function getUser() {
    const token = localStorage.getItem('token')
    const fetchingData = await axios.get('/user/me')
    const { data } = fetchingData;
    userProfile.value = data
    //check role
    if (userProfile.value.role === 'admin') {
      localStorage.setItem('isAdmin', true)
      console.log('hi admin')
    }
  }


  function onAuthChange() {
    const token = localStorage.getItem('token')
    if (token) {
      getUser()
    }
  }

  function logout() {
    console.log('logout')
    localStorage.removeItem('token')
    if (userProfile.value.role === 'admin') {
      localStorage.removeItem('isAdmin')
    } 3
    userProfile.value = null
    window.location.href = '/sign_in'
  }

  const token = localStorage.getItem('token')

  return {
    fname,
    lname,
    username,
    passw,
    passw2,
    phone,
    email,
    error,
    validatefname,
    validatefname,
    validatelname,
    validateUsername,
    validatePassw,
    validatePassw2,
    validateEmail,
    validatePhone,
    submitSignup,
    submitSignin,
    onAuthChange,
    getUser,
    userProfile,
    logout,
    token
  }
})
