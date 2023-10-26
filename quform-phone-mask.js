jQuery(document).ready(function ($) {
  $('.mask_phone').on('input', function () {
    // var result = $(this).val().replace(/[^0-9.]/g, '');

    // result = result.replace(/^(0|1)\d+/, function(t) {
    //   return t.substring(1);
    // });

    // // Limit the input to 10 digits
    // if (result.length > 10) {
    //   result = result.slice(0, 10);
    // }
    // // Apply the formatting
    // var formattedValue = '';
    // if (result.length > 0) {
    //   formattedValue += result.slice(0, 3);
    // }
    // if (result.length > 3) {
    //   formattedValue += '-' + result.slice(3, 6);
    // }
    // if (result.length > 6) {
    //   formattedValue += '-' + result.slice(6);
    // }

    var number = $(this)
      .val()
      .replace(/[^0-9]/g, '');
    var formattedNumber = number.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    $(this).val(formattedValue);
  });
});
