'use strict'

var control = 0;

$(document).ready(function () {
    const actual = 0;
    const total = 15;

    document.getElementById("actual").innerText = actual;
    document.getElementById("total").innerText = total;
});

const buttonAddCollaborator = document.getElementById("btnAddCollaborator");
buttonAddCollaborator.addEventListener("click", () => {
    if (collaboratorIsFull()) {
        alterStatusButton();
        return 0;
    } else {
        let collaboratorList = document.getElementById("collaborator-list");

        const newCollaboratorIten = `<div class="col-12 collaborator-item"> <div class="row"><div class="form-group mb-4 col-6">
        <label for="">E-mail<span class="text-danger font-weight-bold"></span></label><input id="emailStep3-${control}" type="email" class="form-control emailstep3" placeholder="" required>
        <div class="invalid-feedback"></div></div><div class="form-group col-5"><div class="select-list"><div class="select-list-item">
        <label for="">Setor</label><select id="selectStep3-${control}" name=""><option value="a">a</option><option value="a">a</option><option value="a">a</option>
        <option value="a">a</option><option value="a">a</option><option value="a">a</option></select></div></div></div><div class="col-1 form-group">
        <label for="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <button id="remove-${control}" onclick="removeCollaborator(this.id)" class="btn btn-remove-collaborator"><i class="fa fa-close">
        </i></button></div></div></div>`

        collaboratorList.insertAdjacentHTML("beforeend", newCollaboratorIten);

        $('select').niceSelect();

        updateCounter("up");
    }
});

const updateCounter = (mode) => {
    const actualObject = document.getElementById("actual");

    mode == "up" ? control++ : control--;

    actualObject.innerText = control;
}

function removeCollaborator(id) {
    const button = document.getElementById(id);
    const collaboratoritem = button.parentNode.parentNode.parentNode;

    collaboratoritem.remove();
    updateCounter("down");
    alterStatusButton();
}

const collaboratorIsFull = () => {
    const actual = parseInt(document.getElementById("actual").innerText);
    const total = parseInt(document.getElementById("total").innerText);

    if (actual >= total) {
        return true;
    }

    return false;
}

const alterStatusButton = () => {
    const actual = parseInt(document.getElementById("actual").innerText);
    const total = parseInt(document.getElementById("total").innerText);
    const btnAddCollaborator = document.getElementById("btnAddCollaborator");

    actual >= total ? btnAddCollaborator.disabled = true : btnAddCollaborator.disabled = false;
}