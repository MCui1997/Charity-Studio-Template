(function() {
  var CAMPAIGN_END_DATE = window.eventDateTime;
  var AMOUNT_RAISED = window.amountRaised;
  var TOTAL_AMOUNT_RAISED = window.totalAmountRaised;
  var CAMPAIGN_GOAL = window.campaignGoal;
  var HAS_ACTIVE_MATCHERS = window.hasActiveMatchers;
  var IS_IN_BONUS_ROUND = window.isInBonusRound;
  var MATCHER_LIST = window.matcherList;
  var WANT_CONFETTI = window.confetti;
  var COUNTDOWN_SWITCH = 48; //Number of hours left when countdown switches from days to hours
  var CAMPAIGN_DURATION = window.campaignDuration;
  var DONOR_GOAL = window.donorGoal;
  var EXTENDED_GOAL = 0;
  var HAD_BONUS_ROUND = false;
  var bonusDate = '';

  for (var i = 0; i < MATCHER_LIST.length; i++) {
    if (MATCHER_LIST[i].endPercent > 1) {
      if (IS_IN_BONUS_ROUND) {
        bonusDate = new Date(parseInt(MATCHER_LIST[i].endDate + '000'));
        CAMPAIGN_END_DATE = new Date(bonusDate.getTime() - (60000 * 60 * 3));
        //console.log(CAMPAIGN_END_DATE);
      }

      HAD_BONUS_ROUND = true;
      EXTENDED_GOAL = Math.round(MATCHER_LIST[i].endPercent * CAMPAIGN_GOAL);
      break;
    }
  }

  if (location.pathname.indexOf('donors') === -1 && location.pathname.indexOf('donate') === -1) {
    initLandingPage();
    templateTwoSupport();
  } else if (location.href.toLowerCase().indexOf('donors') > -1) {
    initDonorsPage();
  } else if (location.href.toLowerCase().indexOf('donate') > -1) {
		initDonatePage();
	}

  function initLandingPage() {
    var blocks = document.getElementsByClassName('countdown');
    var subs = document.getElementsByClassName('countdown-unit')
    //var progress = document.getElementsByClassName('progress-fill');
    var progress = document.getElementById('progressBar');
    var countdownElem = document.getElementsByClassName('countdown-container');
    var countdownHeader = document.getElementsByClassName('countdown-header');
    var clock = countdown(CAMPAIGN_END_DATE, COUNTDOWN_SWITCH);
    var clock2 = null;
    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    var donorGoalElem = document.getElementsByClassName('donor-goal');

    //progress[0].style.width = AMOUNT_RAISED + '%';
    //progress[2].style.width = AMOUNT_RAISED + '%';
    progress.value = AMOUNT_RAISED;

    if (clock.remaining().totalHours > CAMPAIGN_DURATION) {
      clock2 = new Date(CAMPAIGN_END_DATE);
      clock2.setHours(clock2.getHours() - CAMPAIGN_DURATION);
      clock2 = countdown(clock2.toString(), COUNTDOWN_SWITCH);
      countdownHeader[0].innerHTML = 'Campaign Starts In:';
      //countdownHeader[1].innerHTML = 'Campaign Starts In:';
      clock2.init(blocks[0], blocks[1], blocks[2], subs[0], subs[1], subs[2]);
      //clock2.init(blocks[3], blocks[4], blocks[5], subs[3], subs[4], subs[5]);
    } else if (clock.remaining().total > 0) {
      clock.init(blocks[0], blocks[1], blocks[2], subs[0], subs[1], subs[2]);
      //clock.init(blocks[3], blocks[4], blocks[5], subs[3], subs[4], subs[5]);
    } else if (clock.remaining().total === 0 && WANT_CONFETTI) {
      confetti.render();
    }

    if (clock.remaining().total === 0) {
      countdownElem[0].style.visibility = 'hidden';
      //countdownElem[1].style.display = 'none';
    }

    jQueryFunctions();
    checkCampaignStatus();
    handleDonorCardClick();

    function handleDonorCardClick() {
      var donorCardElems = document.getElementsByClassName('card');

      for (var i = 0; i < donorCardElems.length; i++) {
        donorCardElems[i].onclick = function(e) {
          if (this.children.length < 2) { return; }

          if (this.children[0].style.display === 'none') {
            this.children[0].style.display = 'initial';
            this.children[1].style.display = 'none';
          } else {
            this.children[0].style.display = 'none';
            this.children[1].style.display = 'flex';
          }
        }
      }
    }

    function checkCampaignStatus() {
      var bonusTextElem = document.getElementById('bonus-text');
      var bonusProgressElem = document.getElementsByClassName('bonus-progress');
      var originalGoalTextElem = document.getElementsByClassName('original-goal-text');
      var progressRing = document.getElementsByClassName('progress-ring');
      var progressFillBonusElem = document.getElementsByClassName('progress-fill-bonus');
      var progressPercentBonusElem = document.getElementsByClassName('progress-percent-bonus');
      var progressGoalBonusElem = document.getElementsByClassName('progress-goal-bonus');
      var progressPercentOriginal = document.getElementsByClassName('progress-percent-original');
      var progressRaised = document.getElementsByClassName('progress-raised');
      var completeMessage = document.getElementById('complete-message');
      var donorTotalsContainerCheck = document.getElementsByClassName('donor-totals-container-check');
      var donorTotalsContainer = document.getElementsByClassName('donor-totals-container mobile-hidden');
      var donorListContainer = document.getElementsByClassName('donor-list-container');
      var recentRing = document.getElementsByClassName('recent-ring');
      var viewAllDonorsBtn = document.getElementsByClassName('donors-all');
      var campaignStarted = clock.remaining().totalHours < CAMPAIGN_DURATION ? true : false;
      var isComplete = false;

      if (clock.remaining().total === 0) {
        isComplete = true;
      }

      if (HAD_BONUS_ROUND && TOTAL_AMOUNT_RAISED >= EXTENDED_GOAL) {
        isComplete = true;
      }

      if (!HAD_BONUS_ROUND && TOTAL_AMOUNT_RAISED >= CAMPAIGN_GOAL) {
        isComplete = true;
      }

      //THIS WILL NEED TO CHANGED. It's an override while we're developing
      campaignStarted = true;
      isComplete = false;

      if (!campaignStarted) {
        // PRE-CAMPAIGN
        console.log('State: Pre-Campaign');
        for (var i = 0; i < progressRing.length; i++) {
          progressRing[i].style.display = 'none';
          progressRaised[i].style.visibility = 'hidden';
          progressRaised[i].style.display = '';
        }

        for (var i = 0; i < recentRing.length; i++) {
          recentRing[i].style.display = 'none';
          donorTotalsContainerCheck[i].style.display = '';
        }
      } else if (isComplete) {
        //CAMPAIGN COMPLETE
        console.log('State: Complete');

        if (HAD_BONUS_ROUND) {
          for (var i = 0; i < progressRing.length; i++) {
            progressRing[i].style.display = 'none';
            progressRaised[i].style.display = '';
            progressPercentOriginal[i].innerHTML = '100%';
            bonusProgressElem[i].style.display = '';
            progressGoalBonusElem[i].innerHTML = '$' + numberWithCommas(EXTENDED_GOAL - CAMPAIGN_GOAL);
            progressPercentBonusElem[i].innerHTML = Math.floor((TOTAL_AMOUNT_RAISED - CAMPAIGN_GOAL) / (EXTENDED_GOAL - CAMPAIGN_GOAL) * 100) + '%';
            progressFillBonusElem[i].style.width = Math.floor((TOTAL_AMOUNT_RAISED - CAMPAIGN_GOAL) / (EXTENDED_GOAL - CAMPAIGN_GOAL) * 100) + 8 + '%';
          }
        } else {
          for (var i = 0; i < progressRing.length; i++) {
            progressRing[i].style.display = 'none';
            progressRaised[i].style.display = '';
            progressPercentOriginal[i].innerHTML = Math.floor(TOTAL_AMOUNT_RAISED / CAMPAIGN_GOAL * 100) + '%';
          }
        }

        for (var i = 0; i < recentRing.length; i++) {
          recentRing[i].style.display = 'none';
          donorTotalsContainer[i].style.display = '';
          donorListContainer[i].style.display = '';
        }

        for (var i = 0; i < viewAllDonorsBtn.length; i++) {
          viewAllDonorsBtn[i].style.display = '';
        }

        if (WANT_CONFETTI) {
          confetti.render();
        }

        countdownElem[0].style.visibility = 'hidden';
        //countdownElem[1].style.display = 'none';
        completeMessage.style.display = 'block';
      } else if (IS_IN_BONUS_ROUND) {
        //BONUS ROUND
        console.log('State: Bonus Round');
        for (var i = 0; i < progressRing.length; i++) {
          progressRing[i].style.display = 'none';
          progressRaised[i].style.display = '';
          progressPercentOriginal[i].innerHTML = '100%';
          bonusProgressElem[i].style.display = '';
          progressGoalBonusElem[i].innerHTML = '$' + numberWithCommas(EXTENDED_GOAL - CAMPAIGN_GOAL);
          progressPercentBonusElem[i].innerHTML = Math.floor((TOTAL_AMOUNT_RAISED - CAMPAIGN_GOAL) / (EXTENDED_GOAL - CAMPAIGN_GOAL) * 100) + '%';
          progressFillBonusElem[i].style.width = Math.floor((TOTAL_AMOUNT_RAISED - CAMPAIGN_GOAL) / (EXTENDED_GOAL - CAMPAIGN_GOAL) * 100) + 8 + '%';
        }

        for (var i = 0; i < recentRing.length; i++) {
          recentRing[i].style.display = 'none';
          donorTotalsContainer[i].style.display = '';
          donorListContainer[i].style.display = '';
        }

        for (var i = 0; i < viewAllDonorsBtn.length; i++) {
          viewAllDonorsBtn[i].style.display = '';
        }

        bonusTextElem.style.display = '';
      } else {
        //ACTIVE
        console.log('State: Active');
        for (var i = 0; i < progressRing.length; i++) {
          progressRing[i].style.display = 'none';
          progressRaised[i].style.display = '';
          progressPercentOriginal[i].innerHTML = Math.floor(TOTAL_AMOUNT_RAISED / CAMPAIGN_GOAL * 100) + '%';
        }

        for (var i = 0; i < recentRing.length; i++) {
          recentRing[i].style.display = 'none';
          donorTotalsContainer[i].style.display = '';
          donorListContainer[i].style.display = '';
        }

        for (var i = 0; i < viewAllDonorsBtn.length; i++) {
          viewAllDonorsBtn[i].style.display = '';
        }
      }
    }

    function jQueryFunctions() {
      var slide = 1;
      var graphPosition = 1;
      var fadeLength = 1000;

      $(".arrow-a").click(function() {

        switch (graphPosition) {
          case 1:
            $(".graph.first").fadeOut(fadeLength);
            $(".graph.second").fadeOut(fadeLength);
            break;
          case 2:
            $(".graph.first").fadeIn(fadeLength);
            break;
          case 3:
            $(".graph.second").fadeIn(fadeLength);
            break;
        }
        graphPosition -= 1;
        if (graphPosition < 1) {
          graphPosition = 3;
        }

      });
      $(".arrow-b").click(function() {
        switch (graphPosition) {
          case 1:
            $(".graph.first").fadeOut(fadeLength);
            break;
          case 2:
            $(".graph.second").fadeOut(fadeLength);
            break;
          case 3:
            $(".graph.first").fadeIn(fadeLength);
            $(".graph.second").fadeIn(fadeLength);
            break;
        }
        graphPosition += 1;
        if (graphPosition > 3) {
          graphPosition = 1;
        }
      });

      function slideTimer(currentSlide) {
        fadeLength = 1000;

        switch (currentSlide) {
          case 1:
            $(".banner1").fadeOut(fadeLength);
            break;
          case 2:
            $(".banner2").fadeOut(fadeLength);
            break;
          case 3:
            $(".banner3").fadeOut(fadeLength);
            break;
          case 4:
            $(".banner4").fadeOut(fadeLength);
            break;
          case 5:
            $(".banner5").fadeOut(fadeLength);
            break;
          case 6:
            $(".banner6").fadeOut(fadeLength);
          case 7:
            $(".banner1").fadeIn(fadeLength, function() {
              $(".banner2").fadeIn(fadeLength);
              $(".banner3").fadeIn(fadeLength);
              $(".banner4").fadeIn(fadeLength);
              $(".banner5").fadeIn(fadeLength);
              $(".banner6").fadeIn(fadeLength);
            });
            break;
        }
        if (currentSlide == 7) {
          nextSlide = 1;
        } else {
          nextSlide = currentSlide + 1;
        }
        clearTimeout(bannerFlip);
        bannerFlip = setTimeout(function() {
          slideTimer(nextSlide)
        }, 3000);
      }
      bannerFlip = setTimeout(function() {
        slideTimer(slide)
      }, 3000);
    }

    for (var i = 0; i < donorGoalElem.length; i++) {
      if (DONOR_GOAL > 0) {
        donorGoalElem[i].innerHTML = DONOR_GOAL;
      } else {
        donorGoalElem[i].parentElement.parentElement.style.display = 'none';
      }
    }
  }

  function initDonorsPage() {
    $('.donor-card-list').on('click', '.effect__click', function() {
				$(this).toggleClass('flipped')
    });

    checkCampaignStatus();

    function checkCampaignStatus() {
      var donorCardList = document.getElementsByClassName('donor-card-list');
      var donorsRingElem = document.getElementById('donors-ring');
      var headerImageContainer = document.getElementsByClassName('header-image-container')[0];
      var clock = countdown(CAMPAIGN_END_DATE, COUNTDOWN_SWITCH);
      var campaignStarted = clock.remaining().totalHours < CAMPAIGN_DURATION ? true : false;

      if (!campaignStarted) {
        donorsRingElem.style.display = 'none';
        headerImageContainer.innerHTML = headerImageContainer.innerHTML + '<br><br>Donations given before the campaign starts are hidden. Your donation will display when the campaign launches! Come back once we\'ve started and check our progress!';
      } else {
        donorsRingElem.style.display = 'none';
        donorCardList[0].style.display = 'inherit';
      }
    }
  }

	function initDonatePage() {
		var headerImage = document.getElementsByClassName('header-image');
		var subHeaderImage = document.getElementsByClassName('subheader-image-container');
		var backLink = document.getElementsByClassName('back-link');
		var rbLogo = document.getElementsByClassName('rb-new-footer');

		if (headerImage[1]) {
			headerImage[1].style.display = 'none';
		}

		if (subHeaderImage[1]) {
			subHeaderImage[0].innerHTML = 'Thank you';
			subHeaderImage[1].style.display = 'none';
		}

		if (backLink[1]) {
			backLink[1].style.display = 'none';
		}

		if (rbLogo[1]) {
			rbLogo[0].style.display = 'none';
		}

    checkCampaignStatus();
    trackDonation();

    function checkCampaignStatus() {
      var headerImageContainer = document.getElementsByClassName('header-image-container')[0];
      var clock = countdown(CAMPAIGN_END_DATE, COUNTDOWN_SWITCH);
      var campaignStarted = clock.remaining().totalHours < CAMPAIGN_DURATION ? true : false;

      // if (!campaignStarted) {
      //   headerImageContainer.innerHTML = headerImageContainer.innerHTML + '<br><br>Donations given before the campaign starts are hidden. Your donation will display when the campaign launches! Come back once we\'ve started and check our progress!';
      // }
    }

    function trackDonation() {
      var track = setInterval(function() {
        if (document.getElementsByClassName('donateThanksCont')[0]) {
          clearInterval(track);

          for (var i = 0; i < dataLayer.length; i++) {
            if (dataLayer[i].event && dataLayer[i].event === 'Donation') {
              fbq('track', 'Purchase', {
                currency: 'USD',
                value: dataLayer[i].conversionValue
              });
            }
          }
        }
      }, 500);
    }
	}

  function countdown(deadline, daysToHoursLimit) {
    function init(b1, b2, b3, s1, s2, s3) {
      function updateClock() {
        var remaining = getTimeRemaining();

        if (remaining.totalHours < daysToHoursLimit) {
          b1.innerHTML = ('0' + remaining.totalHours).slice(-2);
          b2.innerHTML = ('0' + remaining.minutes).slice(-2);
          b3.innerHTML = ('0' + remaining.seconds).slice(-2);
          s1.innerHTML = 'Hours';
          s2.innerHTML = 'Minutes';
          s3.innerHTML = 'Seconds';
        } else {
          b1.innerHTML = ('0' + remaining.days).slice(-2);
          b2.innerHTML = ('0' + remaining.hours).slice(-2);
          b3.innerHTML = ('0' + remaining.minutes).slice(-2);
          s1.innerHTML = 'Days';
          s2.innerHTML = 'Hours';
          s3.innerHTML = 'Minutes';
        }
      }

      setInterval(updateClock, 1000);
    }

    function getTimeRemaining() {
      var localDate = new Date(deadline);
      var timeLeft = Date.parse(localDate) - Date.parse(new Date());

      if (timeLeft < 0) {
        timeLeft = 0;
      }

      var seconds = Math.floor((timeLeft / 1000) % 60);
      var totalSeconds = Math.floor(timeLeft / 1000);
      var minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      var totalMinutes = Math.floor((timeLeft / 1000) / 60);
      var hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      var totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
      var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

      return {
        'total': timeLeft,
        'days': days,
        'hours': hours,
        'totalHours': totalHours,
        'minutes': minutes,
        'totalMinutes': totalMinutes,
        'seconds': seconds,
        'totalSeconds': totalSeconds
      };
    }

    return {
      init: init,
      remaining: getTimeRemaining
    }
  }

  function templateTwoSupport() {
    // on scroll calls the two functions
    window.onscroll = function () {
      stickyNav();
      
   
    };

    // getting dom variables
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;

    

  

    function stickyNav() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        if (window.innerWidth > 600) {
          document.getElementById("navbar").style =
            "border-radius: 0px; width: 100%";
        }
      } else {
        navbar.classList.remove("sticky");
    
        if (window.innerWidth > 600) {
          document.getElementById("navbar").style =
            "border-radius: 30px; width: 90%";
        }
      }
    }
    
    // function for back to top sticking
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backtoTop.style.display = "block";
      } else {
        backtoTop.style.display = "none";
      }
    }
    
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})();
