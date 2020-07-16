(function () {
  const win = window
  const doc = document.documentElement

  doc.classList.remove('no-js')
  doc.classList.add('js')

  // Reveal animations
  if (document.body.classList.contains('has-animations')) {
    /* global ScrollReveal */
    const sr = window.sr = ScrollReveal()

    sr.reveal('.feature', {
      duration: 600,
      distance: '20px',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      origin: 'right',
      interval: 100
    })

    sr.reveal('.media-canvas', {
      duration: 600,
      scale: '.95',
      easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
      viewFactor: 0.5
    })
  }

  // Wait that device mockup has loaded before displaying
  const deviceMockup = document.querySelector('.device-mockup')

  function deviceMockupLoaded () {
    deviceMockup.classList.add('has-loaded')
  }

  if (deviceMockup.complete) {
    deviceMockupLoaded()
  } else {
    deviceMockup.addEventListener('load', deviceMockupLoaded)
  }

  // Features title adjustment
  const featuresSection = document.querySelector('.features')
  const featuresTitle = featuresSection.querySelector('.section-title')
  const firstFeature = document.querySelector('.feature-inner')

  featuresTitlePos()
  win.addEventListener('resize', featuresTitlePos)

  function featuresTitlePos () {
    let featuresSectionLeft = featuresSection.querySelector('.features-inner').getBoundingClientRect().left
    let firstFeatureLeft = firstFeature.getBoundingClientRect().left
    let featuresTitleOffset = parseInt(firstFeatureLeft - featuresSectionLeft)
    if (firstFeatureLeft > featuresSectionLeft) {
      featuresTitle.style.marginLeft = `${featuresTitleOffset}px`
    } else {
      featuresTitle.style.marginLeft = 0
    }
  }

  // Moving objects
  const movingObjects = document.querySelectorAll('.is-moving-object')

  // Throttling
  function throttle (func, milliseconds) {
    let lastEventTimestamp = null
    let limit = milliseconds

    return (...args) => {
      let now = Date.now()

      if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
        lastEventTimestamp = now
        func.apply(this, args)
      }
    }
  }

  // Init vars
  let mouseX = 0
  let mouseY = 0
  let scrollY = 0
  let coordinateX = 0
  let coordinateY = 0
  let winW = doc.clientWidth
  let winH = doc.clientHeight

  // Move Objects
  function moveObjects (e, object) {
    mouseX = e.pageX
    mouseY = e.pageY
    scrollY = win.scrollY
    coordinateX = (winW / 2) - mouseX
    coordinateY = (winH / 2) - (mouseY - scrollY)

    for (let i = 0; i < object.length; i++) {
      const translatingFactor = object[i].getAttribute('data-translating-factor') || 20
      const rotatingFactor = object[i].getAttribute('data-rotating-factor') || 20
      const perspective = object[i].getAttribute('data-perspective') || 500
      let tranformProperty = []

      if (object[i].classList.contains('is-translating')) {
        tranformProperty.push('translate(' + coordinateX / translatingFactor + 'px, ' + coordinateY / translatingFactor + 'px)')
      }

      if (object[i].classList.contains('is-rotating')) {
        tranformProperty.push('perspective(' + perspective + 'px) rotateY(' + -coordinateX / rotatingFactor + 'deg) rotateX(' + coordinateY / rotatingFactor + 'deg)')
      }

      if (object[i].classList.contains('is-translating') || object[i].classList.contains('is-rotating')) {
        tranformProperty = tranformProperty.join(' ')

        object[i].style.transform = tranformProperty
        object[i].style.transition = 'transform 1s ease-out'
        object[i].style.transformStyle = 'preserve-3d'
        object[i].style.backfaceVisibility = 'hidden'
      }
    }
  }

  // Call function with throttling
  if (movingObjects) {
    win.addEventListener('mousemove', throttle(
      function (e) {
        moveObjects(e, movingObjects)
      },
      150
    ))
  }
}())

$(function(){
  //your current click function
  $('.scroll').on('click',function(e){
      e.preventDefault();
      $('html,body').animate({
          scrollTop:$($(this).attr('href')).offset().top + 'px'
      },1000,'swing');
  });
  
  // if we have anchor on the url (calling from other page)
  if(window.location.hash){
      // smooth scroll to the anchor id
      $('html,body').animate({
          scrollTop:$(window.location.hash).offset().top + 'px'
          },1000,'swing');
      }
  });

  const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

  var GoogleCalenderAppointments = null;
  var today = new Date();
  var lastDay = new Date(today);
  lastDay.setDate(today.getDate() + 4);
  
  function checkGoogleCalendarConflict(date) {
    var hasConflict = false;
    if (!GoogleCalenderAppointments) {
      //logic to get scheduled appointments
    }
  
    //iterate through relevant scheduled appointments
    //if argument `date` has conflict, return true
    //else, return false
  
    return hasConflict
  }
  
  function getTimeSlotsForDay(date) {
    var timeSlots = []
    var dayStart = new Date(date)
    var dayEnd = new Date(date)
  
    switch (date.getDay()) {
      case 0: //Sunday
        dayStart.setHours(9, 0, 0, 0)
        dayEnd.setHours(12, 0, 0, 0)
        break;
      case 6: //Saturday
        dayStart.setHours(8, 0, 0, 0)
        dayEnd.setHours(16, 0, 0, 0)
        break;
      default:
        dayStart.setHours(16, 0, 0, 0)
        dayEnd.setHours(21, 0, 0, 0)
    }
    do {
      if (!checkGoogleCalendarConflict(dayStart)) {
        timeSlots.push(new Date(dayStart))
      }
      dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + 45)
    } while (dayStart < dayEnd);
  
    return timeSlots
  }
  
  var message = ""
  for (var i = new Date(today); i < lastDay; i.setDate(i.getDate() + 1)) {
    message += i.toDateString() + ":\n"
    message += getTimeSlotsForDay(i).map(function(it) {
      return it.toTimeString();
    }).join(",\n") + "\n";
  }
  alert(message)