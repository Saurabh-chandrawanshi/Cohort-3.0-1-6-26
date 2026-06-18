const themeBtn =
document.querySelector(".theme-toggle");

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle(
"dark-mode"
);

});

window.addEventListener("load",()=>{

setTimeout(()=>{

document
.querySelector(".loader")
.classList.add("hide");

},1200);

});

const cursor =
document.createElement("div");

cursor.classList.add("cursor");

document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{

cursor.style.left =
e.clientX+"px";

cursor.style.top =
e.clientY+"px";

});

let lastScroll = 0;

window.addEventListener("scroll",()=>{

const currentScroll = window.pageYOffset;

if(currentScroll > lastScroll &&
currentScroll > 200){

navbar.style.transform =
"translateY(-100%)";

}else{

navbar.style.transform =
"translateY(0)";
}

lastScroll = currentScroll;

});

const heroImage =
document.querySelector(".hero-image");

window.addEventListener("mousemove",(e)=>{

const x =
(e.clientX/window.innerWidth-0.5)*20;

const y =
(e.clientY/window.innerHeight-0.5)*20;

heroImage.style.transform =
`translate(${x}px,${y}px)`;

});
const counters =
document.querySelectorAll("[data-target]");

counters.forEach(counter=>{

const update=()=>{

const target=
+counter.dataset.target;

const value=
+counter.innerText;

const speed=target/100;

if(value<target){

counter.innerText=
Math.ceil(value+speed);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

}

update();

});

const buttons =
document.querySelectorAll(
".btn-primary"
);

buttons.forEach(btn=>{

btn.addEventListener(
"mousemove",
(e)=>{

const rect=
btn.getBoundingClientRect();

const x=
e.clientX-rect.left-
rect.width/2;

const y=
e.clientY-rect.top-
rect.height/2;

btn.style.transform=
`translate(${x*.2}px,
${y*.2}px)`;

});

btn.addEventListener(
"mouseleave",
()=>{

btn.style.transform=
"translate(0,0)";

});

});