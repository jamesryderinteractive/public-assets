/**
 * @snippet       Next page phone number script
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.0
 */
//##### FUNCTIONS #####
/**
 * Set the data with key name, value & expiration.
 * @param {string} key - The key name
 * @param {string} value - The value of the key
 * @param {number} ttl - The number in milliseconds. Ex. const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
 */
function setKeyWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Get the value of key name and check if the key has
 * expires if expires remove the key name
 * @param {string} key - The key name
 * @returns - The value of the key
 */
function getValuetWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

// Run scripts after page load 'a[href*="example"]'
function run() {
  var mainPhones = document.getElementsByClassName('main-phone');
  if (mainPhones.length > 0) {
    var hrefMainPhone = mainPhones[0].href;
    var elementorClassNames = mainPhones[0].className.match(/\b\w+-\w+\b/g);
    console.log(elementorClassNames);
    var hasClass = elementorClassNames.includes('elementor-element');
    if (hasClass) {
      var elementorLink = mainPhones[0].querySelector('a[href*="tel:"]');
      hrefMainPhone = elementorLink.href;
      cleanTextMainPhone = elementorLink.text
        .replace(/\n/g, '')
        .replace(/\t/g, '');
      textMainPhone = cleanTextMainPhone;
      console.log(hrefMainPhone);
    } else {
      console.log('cant find class= ', hasClass);
    }
    var oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    setKeyWithExpiry('mainPhone', hrefMainPhone, oneDay);
    setKeyWithExpiry('textPhone', textMainPhone, oneDay);
  } else {
    console.log('Cant find main phone');
  }

  // Check if url contains 'thank-you', 'clc-qualified'
  if (
    window.location.href.indexOf('thank-you') > -1 ||
    window.location.href.indexOf('clc-qualified') > -1
  ) {
    var mainPhone = getValuetWithExpiry('mainPhone');
    var textPhone = getValuetWithExpiry('textPhone');
    var phoneTopBtn = document.querySelector('.kb-button');
    // console.log(phoneTopBtn);
    if (phoneTopBtn !== null) {
      phoneTopBtn.href = mainPhone;
      var phoneTopBtnText = phoneTopBtn.querySelector('.kt-btn-inner-text');
      phoneTopBtnText.innerText = textPhone;
    } else {
      console.error("Can't find the phone top button");
    }

    var callUsDivs = document.getElementsByClassName('call-us-div');
    if (callUsDivs.length > 0) {
      var callUsBtns = callUsDivs[0].getElementsByTagName('a');
      if (callUsBtns.length > 0) {
        var callUsBtn = callUsBtns[0];
        callUsBtn.href = mainPhone;
        callUsBtn.innerText = textPhone;
        callUsBtn.setAttribute('data-id', mainPhone);
      } else {
        console.error('Call us button missing');
      }
    } else {
      console.error('Call us div missing');
    }
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
