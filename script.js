window.onscroll = function() {stickyNav()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
var width = $(window).width();

function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    if(width>"600px"){
    $("#navbar").width("100%");
    }
  } else {
    navbar.classList.remove("sticky");
    if(width>"600px"){
    $("#navbar").width("90%");
    }
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