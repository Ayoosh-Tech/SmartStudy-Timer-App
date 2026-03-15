if ("Notification" in window) {
  Notification.requestPermission();
}

let time = 1500;
let timer;

function updateDisplay(){
let minutes = Math.floor(time / 60);
let seconds = time % 60;

document.getElementById("time").innerText =
minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function startTimer(){

clearInterval(timer); // prevents multiple timers

timer = setInterval(function(){

time--;
updateDisplay();

if(time <= 0){

clearInterval(timer);

/* Count completed sessions */
let sessions = localStorage.getItem("sessions") || 0;
sessions++;
localStorage.setItem("sessions", sessions);

/* Notification */
if(Notification.permission === "granted"){
new Notification("Study Session Complete 🎉",{
body:"Great job! Take a break."
});
}

alert("Study session finished!");

/* Reset timer automatically */
time = 1500;
updateDisplay();

}

},1000);

}

function pauseTimer(){
clearInterval(timer);
}

function resetTimer(){

clearInterval(timer);
time = 1500;
updateDisplay();

}

updateDisplay();

if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js");
}


function openStats(){

window.location.href = "stats.html";

}