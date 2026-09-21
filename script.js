// ===============================
// Active Sidebar Menu
// ===============================

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

    });

});

// ===============================
// Notification
// ===============================

const notification = document.querySelector(".notification");

if(notification){

notification.addEventListener("click",()=>{

    alert("You have 3 new notifications!");

});

}

// ===============================
// Profile Dropdown
// ===============================

const profile = document.querySelector(".profile");

if(profile){

profile.addEventListener("click",()=>{

    alert("Profile Menu\n\n• My Profile\n• Settings\n• Logout");

});

}

// ===============================
// Card Hover Animation
// ===============================

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

    card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

    card.style.transform="translateY(0px)";

});

});

// ===============================
// Live Date
// ===============================

const today = new Date();

const options = {

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

};

console.log(today.toLocaleDateString("en-IN",options));

// ===============================
// Greeting
// ===============================

const hour = new Date().getHours();

let greeting="Good Morning";

if(hour>=12 && hour<17){

greeting="Good Afternoon";

}

else if(hour>=17){

greeting="Good Evening";

}

const heading=document.querySelector("header h1");

if(heading){

heading.innerHTML=greeting+", Md Jakariya 👋";

}

// ===============================
// Button Animation
// ===============================

const buttons=document.querySelectorAll("button");

buttons.forEach(btn=>{

btn.addEventListener("mousedown",()=>{

btn.style.transform="scale(.95)";

});

btn.addEventListener("mouseup",()=>{

btn.style.transform="scale(1)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

// ===============================
// Table Row Highlight
// ===============================

const rows=document.querySelectorAll("table tr");

rows.forEach((row,index)=>{

if(index===0) return;

row.addEventListener("mouseenter",()=>{

row.style.background="#edf3ff";

});

row.addEventListener("mouseleave",()=>{

row.style.background="white";

});

});

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll("a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(href && href.startsWith("#")){

e.preventDefault();

document.querySelector(href).scrollIntoView({

behavior:"smooth"

});

}

});

});

// ===============================
// Console Message
// ===============================

console.log("Student Dashboard Loaded Successfully!");
