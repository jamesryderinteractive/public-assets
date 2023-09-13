/**
 * @snippet       Submit form to leadprosper.io with form validations
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.2
 */
jQuery(document).ready(function ($) {
  $('.mask_phone').on('input', function () {
    var result = $(this)
      .val()
      .replace(/[^0-9.]/g, '');

    result = result.replace(/^(0|1)\d+/, function (t) {
      return t.substring(1);
    });

    // Limit the input to 10 digits
    if (result.length > 10) {
      result = result.slice(0, 10);
    }
    // Apply the formatting
    var formattedValue = '';
    if (result.length > 0) {
      formattedValue += result.slice(0, 3);
    }
    if (result.length > 3) {
      formattedValue += '-' + result.slice(3, 6);
    }
    if (result.length > 6) {
      formattedValue += '-' + result.slice(6);
    }

    $(this).val(formattedValue);
  });
});

//var searchParams = new URLSearchParams(window.location.search);

var utmSource = searchParams.get('utm_source');
var utmMedium = searchParams.get('utm_medium');
var utmCampaign = searchParams.get('utm_campaign');
var utmContent = searchParams.get('utm_content');
var utmTerm = searchParams.get('utm_term');
var gClid = searchParams.get('gclid');
var clickid = searchParams.get('clickid');
var subid_1 = searchParams.get('subid_1');
var subid_2 = searchParams.get('subid_2');
var subid_3 = searchParams.get('subid_3');
var refParam = searchParams.get('_ref');
var efTransactionId = searchParams.get('_ef_transaction_id');

var aElement = document.getElementById('main_phone');
var hrefValue = aElement.getAttribute('href');
var phoneNumber = hrefValue.replace('tel:', '');

var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var formattedDate = `${year}-${month}-${day}`;
// console.log(formattedDate);

var ipAddress = '111.111.11.11';

fetch('https://api.ipify.org')
  .then((response) => response.text())
  .then((data) => (ipAddress = data))
  .catch((error) => console.error(error));

if (gClid) {
  sessionStorage.setItem('gclid', gClid);
}
if (clickid) {
  sessionStorage.setItem('clickid', clickid);
}

var storedGtmTag = sessionStorage.getItem('gtmtag');
var storedGClid = sessionStorage.getItem('gclid');
var storeClickid = sessionStorage.getItem('clickid');

jQuery(function ($) {
  $('input[type=radio]').change(function (e) {
    // Add this line to pass the event object to the function
    e = e || window.event;

    if ($(this).hasClass('end')) {
      $('#lead-form').hide();
      $('#sorryDiv').show();
    }
  });
});

function submitForm(event) {
  event.preventDefault();

  // Get the select tag element
  var mySelectTag = document.getElementById('select__1');

  // Get the selected value of the select tag
  var selectedValue = mySelectTag.value;

  // Check if the selected value is equal to the value of the option you want to check
  if (selectedValue.toLowerCase() === 'unsure') {
    window.location.href = '/not-qualified-camp-lejeune-compensation/';
  } else {
    // console.log(selectedValue);

    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value.replace(/-/g, '');
    var question1select = document.getElementById('select__1').value;
    var question2 = document.querySelectorAll('input[name="question__2"]');
    var question3 = document.querySelectorAll('input[name="question__3"]');

    // console.log('phone: ' + phone);

    var checked = [false, false];
    var q = ['', ''];
    var questionsArray = [question2, question3];

    for (var j = 0; j < 2; j++) {
      for (var i = 0; i < questionsArray[j].length; i++) {
        if (questionsArray[j][i].checked) {
          checked[j] = questionsArray[j][i].checked;
          q[j] = questionsArray[j][i].value;
          break;
        }
      }
    }

    // console.log(q[0] + ' - ' + q[1]);
    // console.log(ipAddress);

    // Hidden
    var input_campaign_id = document.getElementById('lp_campaign_id').value;
    var input_supplier_id = document.getElementById('lp_supplier_id').value;
    var input_key = document.getElementById('lp_key').value;
    var jornaya = document.getElementById('jornaya').value;

    var ppath = window.location.href;

    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      phone === '' ||
      phone.length !== 10 ||
      question1select === '' ||
      !checked[0] ||
      !checked[1]
    ) {
      var errorMessage = 'Please fill in all required fields.';
      var errorDiv = document.getElementById('error-message');

      // Add a CSS class to empty required fields
      if (firstName === '') {
        document.getElementById('fname').classList.add('error');
      } else {
        document.getElementById('fname').classList.remove('error');
      }
      if (lastName === '') {
        document.getElementById('lname').classList.add('error');
      } else {
        document.getElementById('lname').classList.remove('error');
      }
      if (email === '') {
        document.getElementById('email').classList.add('error');
      } else {
        document.getElementById('email').classList.remove('error');
      }
      if (phone === '') {
        document.getElementById('phone').classList.add('error');
      } else if (phone.length !== 10) {
        document.getElementById('phone').classList.add('error');
        errorMessage = 'Phone number must be 10 digits';
      } else {
        document.getElementById('phone').classList.remove('error');
      }
      if (question1select === '') {
        document.getElementById('question1').classList.add('error');
      } else {
        document.getElementById('question1').classList.remove('error');
      }
      if (!checked[0]) {
        document.getElementById('question2').classList.add('error');
      } else {
        document.getElementById('question2').classList.remove('error');
      }
      if (!checked[1]) {
        document.getElementById('question3').classList.add('error');
      } else {
        document.getElementById('question3').classList.remove('error');
      }
      errorDiv.innerHTML = errorMessage;
      return;
    }

    var apiUrl = 'https://api.leadprosper.io/ingest';

    var data = {
      lp_campaign_id: input_campaign_id,
      lp_supplier_id: input_supplier_id,
      lp_key: input_key,
      lp_subid1: subid_1,
      lp_subid2: subid_2,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      phone_number: phone,
      ip_address: ipAddress,
      landing_page_url: ppath,
      jornaya_leadid: jornaya,
      gtmtag: storedGtmTag,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      gclid: gClid,
      contaminated: q[0],
      represented: q[1],
      tcpa_consent_date: formattedDate,
      qualification: question1select,
    };

    // console.log(JSON.stringify(data));

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //   console.log('Success:', response.message);
          if (refParam) {
            window.location.href = '/thank-you-camp/?ref=' + refParam;
          } else {
            window.location.href = '/thank-you-camp/';
          }
        } else {
          console.log('Error:', response.statusText);
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
}
