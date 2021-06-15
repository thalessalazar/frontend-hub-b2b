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

  var progressBar = document.getElementById("progressbar");

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
    console.log(event);

    form.classList.remove('was-validated');
    var nextStep = event.detail.indexStep;
    var currentStep = nextStep;

    console.log(currentStep);

    if (currentStep > 0) {
      currentStep--;
    }

    localStorage.setItem("currentStep", currentStep);

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
    } else {
      if (nextStep < event.detail.from) {
        rollbackCompleteStep(nextStep)
        rollbackCompleteStep(currentStep)
      } else {
        updateCompleteStep();
      }
      updateProgressBar(currentStep);
    }
  });

  const updateErrorMsg = (error) => {
    console.log(error)
    error.forEach(err => {
      let valid = document.getElementById(err.id).nextSibling.nextSibling;
      let errorExisting = ""

      if (valid.innerHTML != "") {
        errorExisting = valid.innerHTML;
      }

      valid.innerHTML = errorExisting + " " + err.err
    });
  }

  const updateProgressBar = (step) => {
    if (step == 0) {
      progressBar.style.width = "0%";
    }

    let [percent,] = progressBar.style.width.split("%");
    percent = parseInt(percent);
    percent += 33;

    progressBar.style.width = `${percent}%`
  }

  const updateCompleteStep = () => {
    const stepper = document.querySelector(".step.active")
    stepper.classList.add("complete");

    const circle = document.querySelector(".step.active .bs-stepper-circle");
    circle.innerHTML = `<i class="fa fa-check"></i>`
  }

  const rollbackCompleteStep = (step) => {
    const stepper = document.getElementById(`step-${step + 1}`);
    stepper.classList.remove("complete");

    const circle = document.querySelector(`#step-${step + 1} .bs-stepper-circle`);
    console.log(circle);
    circle.innerHTML = step + 1;
  }

})();