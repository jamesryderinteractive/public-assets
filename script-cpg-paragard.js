/**
 * @snippet       Submit form to leadprosper.io with form validations
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.6
 */
var styles = ` button[disabled] { background-color: #ccc!important; cursor: unset!important; pointer-events: none!important; }`;
var styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
jQuery(document).ready(function ($) {
  $('.mask_phone').on('input', function () {
    var result = $(this)
      .val()
      .replace(/[^0-9.]/g, '');
    result = result.replace(/^(0|1)\d+/, function (t) {
      return t.substring(1);
    });
    if (result.length > 10) {
      result = result.slice(0, 10);
    }
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
var sub1 = searchParams.get('sub1');
var sub2 = searchParams.get('sub2');
var sub3 = searchParams.get('sub3');
var affid = searchParams.get('affid');
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
if (storedGtmTag) {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', `${storedGtmTag.toUpperCase()}`);
}

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
  for (var i = 1; i <= numQuestions; i++) {
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
  var input_campaign_id = document.getElementById('lp_campaign_id').value;
  var input_supplier_id = document.getElementById('lp_supplier_id').value;
  var input_key = document.getElementById('lp_key').value;
  var jornaya = document.getElementById('jornaya').value;
  var ppath = window.location.href;
  var questionnaireElems = document.querySelectorAll('div[id^="question"]');
  var countQuestionnaire = questionnaireElems.length || 0;

  if (!sub1) {
    sub1 = 'apply.consumerprotectiongroup.com';
  }

  if (!sub3) {
    sub3 = window.location.pathname;
  }

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
    !hasAnswer
  ) {
    var errorMessage = 'Please fill in all required fields.';
    var errorDiv = document.getElementById('error-message');
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
    } else if (phone.replace(/\D/g, '').length !== 10) {
      document.getElementById('phone').classList.add('error');
      errorMessage = 'Phone number must be 10 digits';
    } else {
      document.getElementById('phone').classList.remove('error');
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
    paragard: arrAnswers[0],
    iud: arrAnswers[1],
    surgery: arrAnswers[2],
    breakage: arrAnswers[3],
    affid: affid,
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
    lp_subid1: sub1,
    lp_subid2: sub2,
    landing_page_url: ppath,
    jornaya_leadid: jornaya,
    gender: '',
    cost: '',
    UTM: '',
    source: utmSource ? utmSource : 'none',
    utm_source: utmSource ? utmSource : 'none',
    utm_campaign: utmCampaign,
    utm_medium: utmMedium,
    utm_content: utmContent,
    utm_term: utmTerm,
    gclid: gClid,
    leadid_token: jornaya ? jornaya : 'none',
    LEADID: phoneNumber,
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
          if (arrAnswers[3] === 'yes') {
            window.location.href = '/thank-you-paragard/?ref=' + refParam;
          } else {
            window.location.href = '/not-qualified-paragard/?ref=' + refParam;
          }
        } else {
          if (arrAnswers[3] === 'yes') {
            window.location.href = '/thank-you-paragard/';
          } else {
            window.location.href = '/not-qualified-paragard/';
          }
        }
      } else {
        console.log('Error:', response.statusText);
      }
    })
    .catch((error) => {});
}
