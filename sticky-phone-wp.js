/**
 * @snippet       Sticky phone number below the page
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.0
 */
function run() {
  var mainPhone = document.getElementsByClassName('main_phone');
  if (mainPhone.length > 0) {
    var floatingPhoneDiv = document.getElementsByClassName('floating-phone');
    if (floatingPhoneDiv.length > 0) {
      var floatingPhoneLink = floatingPhoneDiv[0].getElementsByTagName('a');
      if (floatingPhoneLink.length > 0) {
        floatingPhoneLink[0].href = mainPhone[0].href;
        floatingPhoneLink[0].innerText = 'CALL NOW ' + mainPhone[0].innerText;
      } else {
        console.log('Cannot find floating link');
      }
    } else {
      console.log('Cannot find floating div');
    }
  } else {
    console.log('Cannot find main phone');
  }
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
