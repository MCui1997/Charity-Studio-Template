// on scroll calls the two functions
window.onscroll = function () {
  stickyNav();
  scrollFunction();
  boldAbt();
  boldTeam();
  boldDonor();
  boldMatcher();
};

// getting dom variables
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

var about = document.getElementById("about");
var aboutOffset = about.offsetTop;

var team = document.getElementById("teams");
var teamOffset = team.offsetTop;

var donor = document.getElementById("donors");
var donorOffset = donor.offsetTop;

var matcher = document.getElementById("matchers");
var matcherOffset = matcher.offsetTop;

var backtoTop = document.getElementById("backtoTop");
windowWidth = $(window).width();

// function for sticky navbar
function stickyNav() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    if (windowWidth > 600) {
      $("#navbar").width("100%");
      $("#navbar").css("border-radius", "0px");
    }
  } else {
    navbar.classList.remove("sticky");
    if (windowWidth > 600) {
      $("#navbar").width("90%");
      $("#navbar").css("border-radius", "30px");
    }
  }
}

function boldAbt() {
  if (window.pageYOffset >= aboutOffset - 100) {
    $(".nav-link").css("font-weight", "normal");
    $("#abtNav").css("font-weight", "bold");

    $("#abtNavText").css("border", "none");
    $("#teamNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#donorNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#matcherNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });
  }
}

function boldTeam() {
  if (window.pageYOffset >= teamOffset - 200) {
    $(".nav-link").css("font-weight", "normal");
    $("#teamNav").css("font-weight", "bold");

    $("#teamNavText").css("border", "none");
    $("#abtNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#donorNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#matcherNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });
  }
}

function boldDonor() {
  if (window.pageYOffset >= donorOffset - 200) {
    $(".nav-link").css("font-weight", "normal");
    $("#donorNav").css("font-weight", "bold");

    $("#donorNavText").css("border", "none");
    $("#teamNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#abtNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#matcherNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });
  }
}

function boldMatcher() {
  if (window.pageYOffset >= matcherOffset - 200) {
    $(".nav-link").css("font-weight", "normal");
    $("#matcherNav").css("font-weight", "bold");

    $("#matcherNavText").css("border", "none");
    $("#teamNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#donorNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });

    $("#abtNavText").css({
      "border-bottom-style": "dashed",
      "border-width": "1px",
    });
  }
}

// function for back to top going to top of page
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// function for back to top sticking
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtoTop.style.display = "block";
  } else {
    backtoTop.style.display = "none";
  }
}

//function for Read More Button
function readMore() {
  var fade = document.getElementById("bottom_fade");
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
