
const colors = ['#FF5733', '#33FF8A', '#3333FF', '#FFFFFF'];

let index = 0
const btnColor = document.getElementById("btnColor")
btnColor.addEventListener("click", () => {
    if (index >= colors.length) {
        index = 0
    }
    document.body.style.backgroundColor = colors[index];
    index++
})


/*
   const btnColor = document.getElementById('btnColor');
   const color = document.querySelector('.color');


   btnColor.addEventListener ('click', () => {
       const numeroRandom = getNumeroRandom();


       document.body.style.backgroundColor = colors[numeroRandom];
       color.textContent = color [numeroRandom];
   });


getNumeroRandom = () => {
   return Math.floor(Math.random()*colors.length);
};*/

