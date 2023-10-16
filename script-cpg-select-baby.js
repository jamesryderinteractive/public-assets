/**
 * @snippet       Submit form to leadprosper.io with form validations
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.0
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

var searchParams = new URLSearchParams(window.location.search);
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
var gtmtag = searchParams.get('gtmtag');

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

if (gtmtag) {
  sessionStorage.setItem('gtmtag', gtmtag);
}

if (gClid) {
  sessionStorage.setItem('gclid', gClid);
}
if (clickid) {
  sessionStorage.setItem('clickid', clickid);
}

var storedGtmTag = sessionStorage.getItem('gtmtag');
var storedGClid = sessionStorage.getItem('gclid');
var storeClickid = sessionStorage.getItem('clickid');
// console.log(gtmtag);
if (storedGtmTag) {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', `${storedGtmTag.toUpperCase()}`);
}

//steps//
jQuery(function ($) {
  var $steps = $('.stepbox');
  function next(e, val) {
    e.preventDefault();

    var currentStep = $('.stepbox:not(.hidden)');
    if (val) {
      var nextStep = currentStep.next('.stepbox');
    } else {
      //   nextStep = $('.popin');
      window.location.href = '/not-qualified-baby-food-compensation/';
    }

    $('.progress').css({ display: '' });
    currentStep.fadeOut(function () {
      currentStep.addClass('hidden');

      if (nextStep.length) {
        nextStep.fadeIn('slow', function () {
          nextStep.removeClass('hidden');
        });

        var progress;
        if (nextStep.data('progress')) {
          progress = parseInt(nextStep.data('progress'));
        } else {
          progress =
            (100 / $steps.length) * (nextStep.index() - $steps.first().index());
        }

        $('.progress > span').text(Math.round(progress) + '% Complete');
        $('.progress .bar span').css({ width: progress + '%' });

        return;
      }
    });
  }

  //$('.stepbox button').click(next);

  $('#select__1').change(function (e) {
    e = e || window.event;

    if ($(this).val() !== 'None') {
      //   console.log('select ' + $(this).val());
      next(e, true);
    } else {
      next(e, false);
    }
  });

  $('input[type=radio]').change(function (e) {
    // Add this line to pass the event object to the function
    e = e || window.event;

    if (!$(this).hasClass('end')) {
      //   console.log('select ' + $(this).val());
      next(e, true);
    } else {
      next(e, false);
    }
  });
});

//end steps//

/**
 * Check if the radio button were checked wether Yes, No or not selected
 *
 * @param {number} numQuestions numbers of questionnaires
 * @returns arrays of answers yes, no or empty string
 */
function checkAnswers(numQuestions) {
  var form = document.getElementById('lead-form');
  var answers = form.elements;
  var arrAnswers = [];
  // NOTE: The questionnaire will always start with the 1st element radio button
  for (var i = 2; i <= numQuestions; i++) {
    var question = 'question__' + i;
    if (answers[question] && typeof answers[question] !== 'undefined') {
      var selectedOption = answers[question].value.toLowerCase();
      arrAnswers.push(selectedOption);
      if (selectedOption === 'yes' || selectedOption === 'no') {
        document.getElementById('question' + i).classList.remove('error');
      } else {
        document.getElementById('question' + i).classList.add('error');
      }
    } else {
      console.error(`Element named ${question} is not found in the form.`);
    }
  }
  return arrAnswers;
}

function submitForm(event) {
  event.preventDefault();

  var firstName = document.getElementById('fname').value;
  var lastName = document.getElementById('lname').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value.replace(/-/g, '');
  var question1select = document.getElementById('select__1').value;

  //   var question2 = document.querySelectorAll('input[name="question__2"]');
  //   var question3 = document.querySelectorAll('input[name="question__3"]');
  //   var question4 = document.querySelectorAll('input[name="question__4"]');
  //   var question5 = document.querySelectorAll('input[name="question__5"]');

  // Hidden
  var input_campaign_id = document.getElementById('lp_campaign_id').value;
  var input_supplier_id = document.getElementById('lp_supplier_id').value;
  var input_key = document.getElementById('lp_key').value;
  var jornaya = document.getElementById('jornaya').value;
  var ppath = window.location.href;
  var questionnaireElems = document.querySelectorAll('[id^="question"]');
  var countQuestionnaire = questionnaireElems.length || 0;

  var arrAnswers = checkAnswers(countQuestionnaire);
  var hasAnswer =
    arrAnswers.indexOf('yes') !== -1 || arrAnswers.indexOf('no') !== -1
      ? true
      : false;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    phone.replace(/\D/g, '').length !== 10 ||
    !question1select ||
    !hasAnswer
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

    errorDiv.innerHTML = errorMessage;
    return;
  }

  var apiUrl = 'https://api.leadprosper.io/ingest';

  var data = {
    lp_campaign_id: input_campaign_id,
    lp_supplier_id: input_supplier_id,
    lp_key: input_key,
    lp_action: '',
    products: question1select,
    diagnosed: arrAnswers[0],
    parents: arrAnswers[1],
    premature: arrAnswers[2],
    age: arrAnswers[3],
    phone: phone,
    email: email,
    postal_code: '',
    ip_address: ipAddress,
    tcpa_consent_date: formattedDate,
    first_name: firstName,
    last_name: lastName,
    city: '',
    state: '',
    address1: '',
    subid_1: subid_1,
    subid_2: subid_2,
    subid_3: subid_3,
    landing_page_url: ppath,
    jornaya_leadid: jornaya,
    gender: '',
    cost: '',
    UTM: '',
    utm_source: utmSource,
    utm_campaign: utmCampaign,
    utm_medium: utmMedium,
    utm_content: utmContent,
    utm_term: utmTerm,
    gclid: gClid,
    source_did: phoneNumber,
    lead_source_id: '',
    zip_code: '',
    comments: '',
    _ef_transaction_id: efTransactionId,
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        if (refParam) {
          window.location.href = '/thank-you-baby-food/?ref=' + refParam;
        } else {
          window.location.href = '/thank-you-baby-food/';
        }
      } else {
        console.log('Error:', response.statusText);
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}