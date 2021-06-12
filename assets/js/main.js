(function () {
  'use strict'

  var stepperFormEl = document.querySelector('#stepperForm')
  window.stepperForm = new Stepper(stepperFormEl, {
    animation: true
  })

  var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'));
  var btnPreviousList = [].slice.call(document.querySelectorAll('.btn-previous-form'));

  var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'));
  var inputMailForm = document.getElementById('inputMailForm');
  var inputPasswordForm = document.getElementById('inputPasswordForm');
  var form = stepperFormEl.querySelector('.bs-stepper-content form');

  btnNextList.forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.stepperForm.next();
    })
  });

  btnPreviousList.forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.stepperForm.previous();
    })
  });

  stepperFormEl.addEventListener('show.bs-stepper', function (event) {
    form.classList.remove('was-validated');
    var nextStep = event.detail.indexStep;
    var currentStep = nextStep;

    if (currentStep > 0) {
      currentStep--;
    }

    var stepperPan = stepperPanList[currentStep];

    if ((stepperPan.getAttribute('id') === 'test-form-1' && !inputMailForm.value.length) ||
      (stepperPan.getAttribute('id') === 'test-form-2' && !inputPasswordForm.value.length)) {
      event.preventDefault();
      form.classList.add('was-validated');
    }
  });
})();