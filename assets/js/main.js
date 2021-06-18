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

  // step 2
  var inputFullName = document.getElementById("inputFullName");
  var inputEmail = document.getElementById("inputEmail");
  var inputPhone = document.getElementById("inputPhone");
  var inputEmailCorp = document.getElementById("inputEmailCorp");

  var btnStep3 = document.getElementById("btnFinishStep3");
  var btnBackStep3 = document.getElementById("btnBackFinishStep");

  var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'));
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

    if (stepperPan.getAttribute("id") === "test-form-2") {
      if (!inputFullName.value.length) {
        error.push({ id: inputFullName.id, err: "Preencha este campo." });
      }
      if (!inputEmail.value.length) {
        error.push({ id: inputEmail.id, err: "Preencha este campo." });
      }
      if (!inputPhone.value.length) {
        error.push({ id: inputPhone.id, err: "Preencha este campo." });
      }
      if (!inputEmailCorp.value.length) {
        error.push({ id: inputEmailCorp.id, err: "Preencha este campo." });
      }
      if (!validEmail(inputEmail)) {
        error.push({ id: inputEmail.id, err: "E-mail inválido." });
      }
      if (!validEmail(inputEmailCorp)) {
        error.push({ id: inputEmailCorp.id, err: "E-mail inválido." });
      }
    }

    if (error.length > 0) {
      event.preventDefault();
      updateErrorMsg(error);
      form.classList.add('was-validated');
    } else {
      if (nextStep < event.detail.from) {
        rollbackCompleteStep(nextStep)
        rollbackProgressBar(nextStep);
      } else {
        updateCompleteStep();
        updateProgressBar(currentStep);
      }
    }
  });

  btnStep3.addEventListener("click", (event) => {
    form.classList.remove('was-validated');
    const emailstep3 = document.getElementsByClassName("emailstep3");

    console.log(emailstep3);

    let error = []; // id - err

    for (let x = 0; x < emailstep3.length; x++) {
      if (!validEmail(emailstep3[x])) {
        error.push({ id: emailstep3[x].id, err: "E-mail inválido." });
      }
    }

    if (error.length > 0) {
      console.log(error);
      updateErrorMsg(error);
      form.classList.add('was-validated');
    } else {
      showFinishStep3();
      updateProgressBar(3);
    }
  });

  btnBackStep3.addEventListener("click", (event) => {
    hideFinishStep();
    rollbackProgressBar(2);
  });

  const updateErrorMsg = (error) => {
    error.forEach(err => {
      let valid = document.getElementById(err.id).nextSibling.nextSibling;
      console.log(valid);
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

    if(step == 3) {
      percent = 100;
    }

    progressBar.style.width = `${percent}%`
  }

  const rollbackProgressBar = (step) => {
    let [percent,] = progressBar.style.width.split("%");
    percent = parseInt(percent);
    step == 0 ? percent = 1 : percent -= 33;

    progressBar.style.width = `${percent}%`;
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
    circle.innerHTML = step + 1;
  }

  const validEmail = (field) => {
    let user = field.value.substring(0, field.value.indexOf("@"));
    let domain = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((user.length >= 1) &&
      (domain.length >= 3) &&
      (user.search("@") == -1) &&
      (domain.search("@") == -1) &&
      (user.search(" ") == -1) &&
      (domain.search(" ") == -1) &&
      (domain.search(".") != -1) &&
      (domain.indexOf(".") >= 1) &&
      (domain.lastIndexOf(".") < domain.length - 1)) {
      return true;
    }
    return false;
  }

  const showFinishStep3 = () => {
    const collaboratorStep = document.getElementById("collaboratorStep");
    collaboratorStep.classList.add("d-none");

    const finishStep3 = document.getElementById("finishStep3");
    finishStep3.classList.remove("d-none");
  }

  const hideFinishStep = () => {
    const collaboratorStep = document.getElementById("collaboratorStep");
    collaboratorStep.classList.remove("d-none");
    
    const finishStep3 = document.getElementById("finishStep3");
    finishStep3.classList.add("d-none");
  }

})();