/**
 * @snippet       Next page click events for radio buttons, select options & button clicks
 * @sourcecode    https://github.com/jamesryderinteractive/public-assets
 * @author        Jeff Ray Lazo
 * @version       1.0.2
 */
function run() {
  // Radio buttons selection
  var radioButtons = document.querySelectorAll('.quform-field-radio');
  for (var r = 0; r < radioButtons.length; r++) {
    radioButtons[r].addEventListener('change', function () {
      var nextBtnDivClassName = '';
      var radioBtnName = this.name;

      if (this.value.toLowerCase() === 'yes') {
        switch (radioBtnName) {
          // Page 4
          case 'quform_19_83':
            nextBtnDivClassName = '.quform-button-next-19_69';
            break;
          // Page 7
          case 'quform_19_86':
            nextBtnDivClassName = '.quform-button-next-19_75';
            break;
          // Page 8
          case 'quform_19_87':
            nextBtnDivClassName = '.quform-button-next-19_77';
            break;
          default:
            window.location.href = '/not-qualified/';
            break;
        }
      } else {
        // "NO" value
        switch (radioBtnName) {
          // Page 1
          case 'quform_19_4':
            nextBtnDivClassName = '.quform-button-next-19_23';
            var progressBar = document.querySelector('.quform-page-progress');
            if (progressBar !== null) {
              progressBar.style.display = 'block';
            } else {
              console.log('Missing progress bar');
            }
            break;
          // Page 4
          case 'quform_19_83':
            nextBtnDivClassName = '.quform-button-next-19_69';
            break;
          // Page 8
          case 'quform_19_87':
            nextBtnDivClassName = '.quform-button-next-19_77';
            break;
          default:
            window.location.href = '/not-qualified/';
            break;
        }
      }

      var nextBtnDiv = document.querySelector(nextBtnDivClassName);
      if (nextBtnDiv !== null) {
        var nextBtn = nextBtnDiv.querySelector('button');
        if (nextBtn !== null) {
          nextBtn.click();
        } else {
          console.log('Next button click missing');
        }
      } else {
        console.log('Next button div missing');
      }
    });
  }

  // Select options
  var selectOptions = document.querySelectorAll('.quform-field-select');
  for (var s = 0; s < selectOptions.length; s++) {
    selectOptions[s].addEventListener('change', function () {
      var optionValue = this.value.toLowerCase();

      switch (optionValue) {
        case '46+':
        case '41+':
        case '1st trimester':
        case 'less than 10 times':
          window.location.href = '/not-qualified/';
          break;
      }

      var nextBtnDivClassName = '';
      var selectName = this.name;

      switch (selectName) {
        // Page 2
        case 'quform_19_81':
          nextBtnDivClassName = '.quform-button-next-19_65';
          break;
        // Page 3
        case 'quform_19_82':
          nextBtnDivClassName = '.quform-button-next-19_67';
          break;
        // Page 5
        case 'quform_19_84':
          nextBtnDivClassName = '.quform-button-next-19_71';
          break;
        // Page 6
        case 'quform_19_85':
          nextBtnDivClassName = '.quform-button-next-19_73';
          break;
      }

      var nextBtnDiv = document.querySelector(nextBtnDivClassName);
      if (nextBtnDiv !== null) {
        var nextBtn = nextBtnDiv.querySelector('button');
        if (nextBtn !== null) {
          nextBtn.click();
        } else {
          console.log('Next button click missing');
        }
      } else {
        console.log('Next button div missing');
      }
    });
  }

  // FIXME: Need to add additional checker if the user clicks the back button in the first page
  //   var firstBackDivBtn = document.querySelector('.quform-button-back-12_56');
  //   if (firstBackDivBtn !== null) {
  //     var firstBackBtn = firstBackDivBtn.querySelector('button');
  //     console.log(firstBackBtn);
  //     firstBackBtn.addEventListener('click', function () {
  //       console.log('Back button click');
  //       var progressBar = document.querySelector('.quform-page-progress');
  //       if (progressBar !== null) {
  //         console.log('Add display none');
  //         progressBar.style.display = 'none';
  //       } else {
  //         console.log('Missing progress bar');
  //       }
  //     });
  //   } else {
  //     console.log('First back button missing');
  //   }
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
