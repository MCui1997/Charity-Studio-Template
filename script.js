
window.onscroll = function() {
  stickyNav();
  scrollFunction();
}

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var width = $(window).width();
var backtoTop = document.getElementById("backtoTop");

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    $("#navbar").width("100%");
  
  } else {
    navbar.classList.remove("sticky");
    $("#navbar").width("90%");
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtoTop.style.display = "block";
  } else {
    backtoTop.style.display = "none";
  }
}


function readMore() {
  var fade = document.getElementById("bottom_fade")
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.display = "none";
    fade.style.display = "block";
  } else {
   
    fade.style.display = "none";
    dots.style.display = "none";
    btnText.style.display = "none";
    moreText.style.display = "contents";
  }
}