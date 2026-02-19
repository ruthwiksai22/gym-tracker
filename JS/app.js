window.addEventListener("load",function(){
setTimeout(function(){
const splash=document.getElementById("splash");
if(splash){splash.classList.add("hide");}
},1500);
updateDashboard();
});

function animateValue(el,start,end,duration){
if(!el)return;
let startTime=null;
function anim(t){
if(!startTime)startTime=t;
const progress=Math.min((t-startTime)/duration,1);
el.innerText=Math.floor(progress*(end-start)+start);
if(progress<1)requestAnimationFrame(anim);
}
requestAnimationFrame(anim);
}

function updateDashboard(){
const meals=JSON.parse(localStorage.getItem("diet"))||[];
const workouts=JSON.parse(localStorage.getItem("workouts"))||[];

const totalWorkout=workouts.reduce((s,w)=>s+w.duration,0);

animateValue(document.getElementById("meals"),0,meals.length,800);
animateValue(document.getElementById("workoutTime"),0,totalWorkout,800);
animateValue(document.getElementById("calories"),0,totalWorkout*8,800);

const progress=Math.min((totalWorkout/300)*100,100);

document.getElementById("progressText").innerText=Math.round(progress)+"%";
document.getElementById("progressValue").innerText=Math.round(progress)+"%";

updateProgressCircle(progress);
updateBadges(totalWorkout);
updateStreak(workouts);
}

function updateProgressCircle(progress){
const circle=document.querySelector(".progress-circle");
if(!circle)return;
circle.style.background=`conic-gradient(#a855f7 ${progress*3.6}deg,#1c1c28 0deg)`;
}

function updateStreak(workouts){
if(workouts.length===0)return;
document.getElementById("streakCount").innerText=workouts.length+" Days";
}

function updateBadges(totalWorkout){
if(totalWorkout>0)
document.getElementById("badgeFirst")?.classList.add("unlocked");

if(totalWorkout>=300)
document.getElementById("badge300")?.classList.add("unlocked");
}
