const addBtn = document.getElementById("#addBtn");
const modal = document.querySelector("#transactionModal");
const closeBtn = document.querySelector("#closeModal");


addBtn.addEventListener("click",function(){
    modal.style.display="flex";
});

// closeBtn.addEventListener("click",function(){
//     modal.style.display="none";
// });

// window.addEventListener("click",function(event){
//     if(event.target==modal){
//         modal.style.display="none";

//     }

// });