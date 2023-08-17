/**
 * @snippet       Advance popup alert box with customization using sweetalert library
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.0
 */
function run() {
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.body.appendChild(script);

  // Check if url contains jessie
  // if (window.location.href.indexOf('jessie') > -1) {
  var popBack =
    'https://lh3.googleusercontent.com/jkvpmPfi6a8Pu9wXvigcrNMqUiJbqiFI8nSaAu3Jm5Df6IZlZqu7xhp2WCmvx7lJ3bqVwDbpYUk9oCjPLw81Lgzsa8zGOBujAL0=s0';

  setTimeout(function () {
    var popPhoneElement = document.getElementById('main_phone');
    var popPhone = popPhoneElement.innerText;
    var popPhoneHref = popPhoneElement.getAttribute('href');
    popUpAlert(popPhone, popBack, popPhoneHref);
  }, 30000);

  var body = document.querySelector('body');
  var mouseY;

  body.addEventListener(
    'mouseleave',
    (event) => {
      mouseY = event.clientY;
      if (mouseY < 0) {
        // setTimeout(function () {
        var popPhoneElement = document.getElementById('main_phone');
        var popPhone = popPhoneElement.innerText;
        var popPhoneHref = popPhoneElement.getAttribute('href');
        popUpAlert(popPhone, popBack, popPhoneHref);
        // }, 30000);
      }
    },
    { once: true }
  );
  // }
}

//##### FUNCTIONS #####
function popUpAlert(popPhone, popBack, popPhoneHref) {
  Swal.fire({
    title: 'TIME IS RUNNING OUT',
    html:
      '<img src="' +
      popBack +
      '" />' +
      '<p class="mt-10 mb-20">Click <a href="' +
      popPhoneHref +
      '">Here</a>To Call Us Now To File Your Claim</p>' +
      '<a href="' +
      popPhoneHref +
      '" class="pop-phone">' +
      popPhone +
      '</a>',
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    showConfirmButton: false,
    backdrop: `
    rgba(0,0,0,0.5)
    -webkit-filter: blur(2px)
        opacity: 0.9
    color: #fff`,
  });
}
// in case the document is already rendered
if (document.readyState != 'loading') run();
// modern browsers
else if (document.addEventListener)
  document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else
  document.attachEvent('onreadystatechange', function () {
    if (document.readyState == 'complete') run();
  });
