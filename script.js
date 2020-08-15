
window.onscroll = function() {
  stickyNav();
  scrollFunction();
}

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var backtoTop = document.getElementById("backtoTop");
windowWidth = $(window).width();

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    if(windowWidth > 600){
      $("#navbar").width("100%");
      $("#navbar").css("border-radius","0px");
    }
    
  
  } else {
    navbar.classList.remove("sticky");
    if (windowWidth > 600){
      $("#navbar").width("90%");
      $("#navbar").css("border-radius","30px");
    }
    
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