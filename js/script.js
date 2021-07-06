const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


/* Fermeture du menu si lien vers page a été cliqué  */
///////////////////////////////////////////////////////
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


//Windows scroll

//Smooth scroll
///////////////
window.scrollTo({
    top: 0,
    left: 0, 
    behavior: 'smooth'
  });


//Heigth nav
let toSec = document.querySelector('ul').querySelectorAll('a');
let navbar = document.querySelector('.navbar');
let nav_h = navbar.offsetHeight;
// let tab = [...toSec];


toSec.forEach(
    a => {
        a.addEventListener('click', () => {
        let x = a.id.slice(2);
        let topSec = document.getElementById(x).offsetTop;
        let valueScroll = topSec - nav_h;
        window.scrollTo(0,valueScroll);
        });
    }
);


//GoToTop
/////////
let gototop = document.getElementById('toTop');
gototop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
})

