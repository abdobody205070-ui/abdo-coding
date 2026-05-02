
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let currentUser = null;
let progress = 0;

// LOGIN
function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,password)
  .then(user=>{
    currentUser = user.user;
    showDashboard();
  })
  .catch(e=>alert(e.message));
}

// REGISTER
function register(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email,password)
  .then(()=>alert("تم إنشاء الحساب"))
  .catch(e=>alert(e.message));
}

// LOGOUT
function logout(){
  auth.signOut().then(()=>location.reload());
}

// DASHBOARD
function showDashboard(){
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  document.getElementById("userEmail").innerText = currentUser.email;
  loadProgress();
}

// COURSES
function openCourse(type){
  document.getElementById("courseView").classList.remove("hidden");

  let title = document.getElementById("courseTitle");
  let video = document.getElementById("videoPlayer");

  if(type==="html"){
    title.innerText="HTML Course";
    video.src="https://www.youtube.com/embed/qz0aGYrrlhU";
  }

  if(type==="css"){
    title.innerText="CSS Course";
    video.src="https://www.youtube.com/embed/1Rs2ND1ryYc";
  }

  if(type==="js"){
    title.innerText="JavaScript Course";
    video.src="https://www.youtube.com/embed/W6NZfCO5SIk";
  }
}

// PROGRESS
function completeLesson(){
  progress += 10;
  localStorage.setItem("progress",progress);
  loadProgress();
  alert("✔ تم الإكمال");
}

function loadProgress(){
  progress = localStorage.getItem("progress") || 0;
  document.getElementById("progress").innerText = progress + "%";
}

// PROFILE
function openProfile(){
  document.getElementById("profileBox").classList.toggle("hidden");
}

// AUTO LOGIN
auth.onAuthStateChanged(user=>{
  if(user){
    currentUser = user;
    showDashboard();
  }
});
