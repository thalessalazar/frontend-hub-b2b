(function () {
  'use strict'

  var stepperFormEl = document.querySelector('#stepperForm')
  window.stepperForm = new Stepper(stepperFormEl, {
    animation: true
  })

  var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'));
  var btnPreviousList = [].slice.call(document.querySelectorAll('.btn-previous-form'));

  // step 1
  var inputPassword = document.getElementById('inputPassword');
  var inputConfirmPassword = document.getElementById('inputConfirmPassword');

  var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'));
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

    let error = [] // { id - err }

    if (stepperPan.getAttribute("id") === "test-form-1") {
      if (!inputPassword.value.length) {
        error.push({ id: inputPassword.id, err: "Preencha este campo." })
      }
      if (!inputConfirmPassword.value.length) {
        error.push({ id: inputConfirmPassword.id, err: "Preencha este campo." })
      }
      if (inputConfirmPassword.value != inputPassword.value) {
        error.push({ id: inputConfirmPassword.id, err: "As senhas não conferem." })
      }
    }

    

    if (error.length > 0) {
      event.preventDefault();
      updateErrorMsg(error);
      form.classList.add('was-validated');
    }
  });


  const updateErrorMsg = (error) => {
    console.log(error)
    error.forEach(err => {
      let valid = document.getElementById(err.id).nextSibling.nextSibling;
      let errorExisting = ""
      
      if(valid.innerHTML != "") {
        errorExisting = valid.innerHTML;
      }

      valid.innerHTML = errorExisting + " " + err.err
    });
  }

})();