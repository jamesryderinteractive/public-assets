function run() {
  // Get the hidden input elements
  var hiddenCid = document.getElementById('input_1_25');
  var hiddenSid = document.getElementById('input_1_26');
  var hiddendSkey = document.getElementById('input_1_27');
  // Check if cid, sid and skey hidden elements exist
  if (hiddenCid !== null && hiddenSid !== null && hiddendSkey !== null) {
    if (window.location.href.indexOf('_ref=am-jared') > -1) {
      // Set hidden values
      hiddenCid.value = '17798';
      hiddenSid.value = '40716';
      hiddendSkey.value = 'ppzmbnz73cejnz';
    } else if (window.location.href.indexOf('_ref=am-jessie') > -1) {
      // Set hidden values
      hiddenCid.value = '17798';
      hiddenSid.value = '39205';
      hiddendSkey.value = 'xzvlalmq2trn7d';
    } else if (window.location.href.indexOf('_ref=am-artem') > -1) {
      // Set hidden values
      hiddenCid.value = '17798';
      hiddenSid.value = '40717';
      hiddendSkey.value = 'v1x6agpx1iqm3j';
    } else {
      console.log('no dynamic found url');
    }
  } else {
    console.log('cannot find the hidden fields');
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
