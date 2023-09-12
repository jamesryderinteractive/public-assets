// jQuery(document).ready(function () {
//   jQuery('#input_1_2 input[type="radio"]').change(function () {
//     jQuery('#gform_next_button_1_2').trigger('click');
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   var radioButtons = document.querySelectorAll(
//     '#choice_4_3_0'
//   );

//   var radioButtons = document.querySelectorAll(
//     '#choice_4_3_1'
//   );

//   var nextButton = document.querySelector('#gform_next_button_4_6');
//   nextButton.style.display = 'none';
// nextButton.style.visibility = 'hidden';

// //   console.log(radioButtons);
// //   console.log(nextButton);

//   for (var i = 0; i < radioButtons.length; i++) {
//     radioButtons[i].addEventListener('change', function () {
//       console.log('Radion Button Events');
//       nextButton.click();
//     });
//   }
// });

const element = document.getElementById('myElement');
const computedStyle = getComputedStyle(element);
if (computedStyle.display === 'none') {
  console.log('Element is hidden');
} else {
  console.log('Element is visible');
}

const hiddenElements = document.querySelectorAll('[style*="display: none"]');

const divElements = document.querySelectorAll('div');
const visibleDivs = Array.from(divElements).filter((div) => {
  const computedStyle = getComputedStyle(div);
  return computedStyle.display !== 'none';
});

document.addEventListener('DOMContentLoaded', function () {
  var radioButtons = document.querySelectorAll('input[name="input_3"]');
  var nextButton = document.querySelector('#gform_next_button_4_6');

  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('change', function () {
      if (this.value === 'Yes' || this.value === 'No') {
        nextButton.click();
      }
    });
  }
});
