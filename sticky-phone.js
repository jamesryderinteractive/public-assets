/**
 * @snippet       Sticky phone number below the page
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.0
 */
function run() {
  var mainPhone = document.getElementById('main_phone');
  if (mainPhone.length > 0) {
    var surveyForm = document.getElementById('form');
    if (surveyForm.length > 0) {
      var floatingPhoneDiv =
        surveyForm.getElementsByClassName('floating-phone');
      if (floatingPhoneDiv.length > 0) {
        var floatingPhoneLink = floatingPhoneDiv.getElementsByTagName('a');
        if (floatingPhoneLink.length > 0) {
          floatingPhoneLink[0].href = mainPhone.href;
          floatingPhoneLink[0].innerText = mainPhone.innerText;
        } else {
          console.log('Cannot find floating link');
        }
      } else {
        console.log('Cannot find floating div');
      }
    } else {
      console.log('Cannot find survey form');
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
