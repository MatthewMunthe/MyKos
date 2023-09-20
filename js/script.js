// Objects
function Room(number, tenantF, tenantL, phoneNum, price){
  this.number = number;
  this.tenantF = tenantF;
  this.tenantL = tenantL
  this.phoneNum = phoneNum;
  this.price = price;
}

function Kos(name, address, roomCount, room){
  this.name = name;
  this.address = address;
  this.roomCount = roomCount;
  this.room = room;
}

function Admin(fName, lName, email, phoneNum, password, role, kos){
  this.fName = fName;
  this.lName = lName;
  this.email = email;
  this.phoneNum = phoneNum;
  this.password = password;
  this.role = role;
  this.kos = kos;
}

function Tenant(fName, lName, email, phoneNum, password, role, status, kos){
  this.fName = fName;
  this.lName = lName;
  this.email = email;
  this.phoneNum = phoneNum;
  this.password = password;
  this.role = role;
  this.status = status;
  this.kos = kos;
}

// Array
let roomList = [];
let userList = [];
let adminList = [];
let tenantList = [
  {fName: "Matthew", lName: "Munthe", email: "munthematthew115@gmail.com", phoneNum: "082160556796", password: "Munsix06", role: "tenant",
    status: "Belum Lunas", kos: "Agung Jaya Kost"}
];

// Sign Up Page ===========================================

if(document.getElementById("sign-up")){
// Add event listener to each option
  const dropdown = document.getElementById("role-id");
  const options = dropdown.getElementsByTagName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].addEventListener("click", function() {
      // Set the selected value of the dropdown to the clicked option
      dropdown.value = this.value;
    });
  }

  const firstNameInput = document.getElementById("fnameSignUp");
  const lastNameInput = document.getElementById("lnameSignUp");
  const emailInput = document.getElementById("emailSignUp");
  const phoneNumInput = document.getElementById("phoneNumSignUp");
  const passInput = document.getElementById("passwordSignUp");
  const conPassInput = document.getElementById("confirmPasswordSignUp");

  // Valid email input
  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Valid name input
  var regName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

  // Valid password
  var regPass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 

  // Sign up button event listener
  const signUp = document.getElementById("signUpBtn");
  signUp.addEventListener("click", function(e){
    e.preventDefault();

    // First Name validation
    if(firstNameInput.value.length == 0){
      document.getElementById("sign-up-validation").innerHTML = "*nama depan harus diisi";
    } else
    if(firstNameInput.value.length > 30){
      document.getElementById("sign-up-validation").innerHTML = "*nama depan max. 30 karakter";
    }
    else
    if(!firstNameInput.value.match(regName)){
      document.getElementById("sign-up-validation").innerHTML = "*nama depan tidak valid";
    }
    // Last Name validation
    else
    if(lastNameInput.value.length == 0){
      document.getElementById("sign-up-validation").innerHTML = "*nama belakang harus diisi";
    } else
    if(lastNameInput.value.length > 30){
      document.getElementById("sign-up-validation").innerHTML = "*nama belakang max. 30 karakter";
    }
    else
    if(!lastNameInput.value.match(regName)){
      document.getElementById("sign-up-validation").innerHTML = "*nama belakang tidak valid";
    }
    //Email validation
    else
    if(emailInput.value.length == 0){
      document.getElementById("sign-up-validation").innerHTML = "*email harus diisi";
    }
    else
    if(!emailInput.value.match(regEmail)){
      document.getElementById("sign-up-validation").innerHTML = "*email tidak valid";
    }
    else
    if(phoneNumInput.value.length < 10 && phoneNumInput.value.length > 13){
      document.getElementById("sign-up-validation").innerHTML = "*nomor telepon tidak valid";
    }
    // Password validation
    else
    if(!passInput.value.match(regPass)){
      document.getElementById("sign-up-validation").innerHTML = "*panjang password min. 8 karakter,<br>mengandung kapital,<br>mengandung angka"
    }
    // Confirm password validation
    else
    if(!conPassInput.value.match(passInput)){
      document.getElementById("sign-up-validation").innerHTML = "*password konfirmasi berbeda";
    }
    // Role validation
    else {
      if(dropdown.value === "tenant"){
        let newTenant = new Tenant(firstNameInput.value, lastNameInput.value, emailInput.value, phoneNumInput.value, passInput.value, dropdown.value, null, null);
        tenantList.push(newTenant);
        userList.push(newTenant);
        localStorage.setItem('tenantActive', JSON.stringify(tenantList));
        window.location = 'tenant-home.html';
      } 
      else 
      if(dropdown.value === "admin"){
        let newAdmin = new Admin(firstNameInput.value, lastNameInput.value, emailInput.value, phoneNumInput.value, passInput.value, dropdown.value, null);
        adminList.push(newAdmin);        
        userList.push(newAdmin);
        localStorage.setItem('adminActive', JSON.stringify(adminList));
        window.location = 'kos-form.html';
      }
    }

    
  });

} 
// ========================================================

// Login Page =============================================
if(document.getElementById("log-in")){
  const emailInputLogIn = document.getElementById("emailLogIn");
  const passInputLogIn = document.getElementById("passwordLogIn");

  const logIn = document.getElementById("logInBtn");

  logIn.addEventListener("click", function(e){
    e.preventDefault();

    // Email validation
    if(emailInputLogIn.value.length == 0){
      document.getElementById("log-in-validation").innerHTML = "*email harus diisi";
    } else
      if(passInputLogIn.value.length == 0){
        document.getElementById("log-in-validation").innerHTML = "*password harus diisi";
      }
      else
      if(emailInputLogIn.value.length != 0 && passInputLogIn.value.length != 0){
        for(let i = 0; i < userList.length; i++){
          if(userList[i].email === emailInputLogIn && userList[i].password === passInputLogIn){
            if(userList[i].role === "tenant"){
              currUser = userList[i];
              window.location = 'tenant-home.html';
            }
            else
            if(userList[i].role === "admin"){
              currUser = userList[i];
              window.location = 'admin-home.html';
              console.log(currUser);
            }
          }
        }
      }
  });
}

// if(document.getElementById("admin-home")){
//   var adminHome = JSON.parse(localStorage.getItem('adminList'));
//   var adminHomeTenant = JSON.parse(localStorage.getItem('tenantList'));

//   document.querySelector("h1").innerHTML = adminHome[0].kos.name;
//   document.querySelector("p").innerHTML = adminHome[0].kos.address;
//   // console.log(tenan[0]);

//   for(let i = 0; i < tenantList.length; i++){
//     // if(tenantList[i].status == "Belum Lunas" && (tenantList[i].kos.name == adminHome[0].kos.name)){
//       console.log("test");
//       var newDiv = document.getElementsByClassName("admin-home-pendapatan");

//       var adminHomeUnpaid = document.createElement("div");
//       adminHomeUnpaid.className = "admin-home-unpaid";

//       var unpaidTenant = document.createElement("div");
//       unpaidTenant.className = "unpaid-tenant";

//       var unpaidLeft = document.createElement("div");
//       unpaidLeft.className = "unpaid-left";

//       var unpaidLeftImg = document.createElement("img");
//       unpaidLeftImg.src = "../icons/samllpp1.svg";

//       var unpaidLeftDesc = document.createElement("div");
//       unpaidLeftDesc.className = "unpaid-left-desc";

//       var unpaidLeftDescKamar = document.createElement("p");
//       unpaidLeftDescKamar.id = "admin-home-kamar";

//       var unpaidLeftDescNama = document.createElement("p");
//       unpaidLeftDescNama.id = "admin-home-nama";

//       var unpaidRight = document.createElement("div");
//       unpaidRight.className = "unpaid-right";

//       var unpaidRightStatus = document.createElement("p");
//       unpaidRightStatus.id = "admin-home-status";

//       var unpaidRightPrice = document.createElement("p");
//       unpaidRightPrice.id = "admin-home-price";
  
//       newDiv[i].appendChild(adminHomeUnpaid);
//       adminHomeUnpaid.appendChild(unpaidTenant);
//       unpaidTenant.appendChild(unpaidLeft);
//       unpaidLeft.appendChild(unpaidLeftImg);
//       unpaidLeft.appendChild(unpaidLeftDesc);
//       unpaidLeftDesc.appendChild(unpaidLeftDescKamar);
//       unpaidLeftDesc.appendChild(unpaidLeftDescNama);
//       unpaidTenant.appendChild(unpaidRight);
//       unpaidRight.appendChild(unpaidRightStatus);
//       unpaidRight.appendChild(unpaidRightPrice)

//       unpaidLeftDescKamar.innerHTML = "Kamar" + tenantList[i].kos.room.number;
//       unpaidLeftDescNama.innerHTML = tenantList[i].kos.room.fName + tenantList[i].kos.room.lName;
//       unpaidRightStatus.innerHTML = "Belum Lunas";
//       unpaidRightPrice.innerHTML = tenantList[i].kos.room.price;
//     // }
//   }

//   // let kosPendapatan = document.getElementById("admin-home-pendapatan-num");
//   // kosPendapatan.innerHTML = 
  
// }

if(document.getElementById("daftar-kamar")){
  var daftarKamarAdmin = JSON.parse(localStorage.getItem('adminList'));
  var daftarKamarTenant = JSON.parse(localStorage.getItem('tenantList'));
  
  document.getElementById("daftar-kamar-card").addEventListener('click', function(e){
    window.location = 'detail-tamu.html';
  });
  
  for(let i = 0; i < tenantList.length; i++){
    if(tenantList[i].kos.name === adminList[0].kos.name){
      var newDiv = document.getElementsByClassName("daftar-kamar-inner");

      var daftarKamarCard = document.createElement("div");
      daftarKamarCard.id = "daftar-kamar-card";

      var daftarKamarCardIcon = document.createElement("div");
      daftarKamarCardIcon.className = "daftar-kamar-card-icon";

      var daftarKamarCardIconImg = document.createElement("img");
      daftarKamarCardIconImg.src = "../icons/bed.svg"

      var daftarKamarCardInfo = document.createElement("div");
      daftarKamarCardInfo.className = "daftar-kamar-card-info";

      var nomorKamar = document.createElement("p");
      nomorKamar.className = "nomor-kamar";

      var namaPenghuni = document.createElement("p");
      namaPenghuni.className = "nama-penghuni";

      var namaPenghuniImg = document.createElement("img");
      namaPenghuniImg.src = "../icons/smallpp.svg";

      var nomorTelepon = document.createElement("p");
      nomorTelepon.className = "nomor-telepon";

      var nomorTeleponImg = document.createElement("img");
      nomorTeleponImg.src = "../icons/phone.svg";

      var tagihan = document.createElement("p");
      tagihan.className = "tagihan";

      var tagihanImg = document.createElement("img");
      tagihanImg.src = "../icons/money.svg";

      newDiv[0].appendChild(daftarKamarCard);
      daftarKamarCard.appendChild(daftarKamarCardIcon);
      daftarKamarCardIcon.appendChild(daftarKamarCardIconImg);
      daftarKamarCard.appendChild(daftarKamarCardInfo);
      daftarKamarCardInfo.appendChild(nomorKamar);
      daftarKamarCardInfo.appendChild(namaPenghuni);
      namaPenghuni.appendChild(namaPenghuniImg);
      daftarKamarCardInfo.appendChild(nomorTelepon);
      nomorTelepon.appendChild(nomorTeleponImg);
      daftarKamarCardInfo.appendChild(tagihan);
      tagihan.appendChild(tagihanImg);

      nomorKamar.innerHTML = "Kamar" + daftarKamarTenant[i].kos.room.number;
      namaPenghuni.innerHTML = daftarKamarTenant[i].fName + daftarKamarTenant[i].lName;
      nomorTelepon.innerHTML = daftarKamarTenant[i].phoneNum;
      tagihan.innerHTML = "Rp." + daftarKamarTenant[i].kos.room.price;
    }
  }
  
}

// ========================================================


// Script JS Admin Profile=======================================
// if(document.getElementById("admin-profile")){
//   // Get all the textareas
  
//   console.log("test");
// }
    

// if(document.getElementById("admin-profile") || document.getElementById("text-edit-nav-item")){
//   // Get the "Edit" text element
  
//   console.log("test");
// }
    
if(document.getElementById("admin-profile") || document.getElementById("text-edit-nav-item")){
  const textareas = document.querySelectorAll("#isi-di-admin-profile");
  const editText = document.getElementById("text-edit-nav-item");
  // Add click event listener to the "Edit" text
    editText.addEventListener("click", function () {
      // Toggle the disabled attribute and background color for each textarea
      textareas.forEach((textarea) => {
      textarea.disabled = !textarea.disabled;
      textarea.style.backgroundColor = textarea.disabled ? "transparent" : "#f4f4f4";
    });

    // Toggle the text of the "Edit" text
    editText.textContent = editText.textContent === "Edit" ? "Done" : "Edit";
  });
}
  


// Script JS Detail Tamu=====================================
if(document.getElementById("detail-tamu")){
  const textareaSpecial = document.getElementById("isi-di-detail-tamu-SP");
  const h3 = document.getElementById("teks-kamar103");
  const editText2 = document.getElementById("text-edit-nav-item-2");
  const textareas2 = document.querySelectorAll("#isi-di-detail-tamu");
  // Add click evenet listener to the "Edit" text
  editText.addEventListener("click", function () {
      // Toggle the disabled attribute and background color for each textarea
      textareas2.forEach((textarea) => {
      textarea.disabled = !textarea.disabled;
      textarea.style.backgroundColor = textarea.disabled ? "transparent" : "#f4f4f4";
  
      textareaSpecial.disabled = !textareaSpecial.disabled;
      textareaSpecial.style.backgroundColor = textareaSpecial.disabled ? "transparent" : "#f4f4f4";
    });

    // Toggle the text of the "Edit" text
    editText2.textContent = editText2.textContent === "Edit" ? "Done" : "Edit";
  });

  textareaSpecial.addEventListener('input', function() {
    // Update the h3 text with the textarea's current value
    h3.textContent = textareaSpecial.value;
  });
}
  
if(document.getElementById("kos-form")){
  var adminActive = JSON.parse(localStorage.getItem('adminActive'));
  const namaKos = document.getElementById("namaKos");
  const alamatKos = document.getElementById("alamatKos");
  const jumlahKamar = document.getElementById("jumlahKamar");
  const errorMsg = document.getElementById("kos-form-validation")
  
  document.getElementById("kosBtn").addEventListener('click', function(e){
    e.preventDefault();
    if(namaKos.value.length === 0){
      errorMsg.innerHTML = "*nama kos harus diisi";
    }
    else if(alamatKos.value.length === 0){
      errorMsg.innerHTML = "*alamat kos harus diisi";
    }
    else if(jumlahKamar.value.length === 0){
      errorMsg.innerHTML = "*jumlah kamar harus diisi"
    }
    else {
      const newKos = new Kos(namaKos.value, alamatKos.value, jumlahKamar.value, null);
      adminActive[0].kos = newKos;
      console.log(adminActive[0]);
      localStorage.setItem('adminList', JSON.stringify(adminActive));
      window.location = 'admin-home.html'
    }
  });
}
  
if(document.getElementById("tambah_kamar")){
  var daftarKamarAdmin = JSON.parse(localStorage.getItem('adminList'));
  var daftarKamarTenant = JSON.parse(localStorage.getItem('tenantList'));

  let emailRoom = document.getElementById("daftar-kamar-email");
  let numRoom = document.getElementById("daftar-kamar-nomor");
  let priceRoom = document.getElementById("daftar-kamar-harga");
  // Add Kamar
  const errorMsg = document.getElementById("tambah-kamar-validation");

  document.getElementById("tambahBtn").addEventListener('click', function(e){
    
    e.preventDefault();
    if(emailRoom.value.length === 0){
      errorMsg.innerHTML = "*email harus diisi";
    } 
    else if(numRoom.value.length === 0){
      errorMsg.innerHTML = "*kamar harus diisi";
    }
    else if(priceRoom.value.length === 0){
      errorMsg.innerHTML = "*harga harus diisi";
    }
    else {
      // for(let i = 0; i < 5; i++){
      //   // if(daftarKamarTenant[i].email === emailRoom.value){
      //     let temp = "kamae";
      //     console.log(temp);
      //     break;
      //   // }
      // }

      let newRoom = new Room(numRoom.value, null, null, null, priceRoom.value);
      
    }
  });
}