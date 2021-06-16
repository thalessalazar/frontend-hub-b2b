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
    let collaboratorList = document.getElementById("collaborator-list");

    const newCollaboratorIten = `<div class="col-12 collaborator-item"> <div class="row"><div class="form-group mb-4 col-6">
    <label for="">E-mail<span class="text-danger font-weight-bold"></span></label><input type="email" class="form-control" placeholder="" required>
    <div class="invalid-feedback"></div></div><div class="form-group col-5"><div class="select-list"><div class="select-list-item">
    <label for="">Setor</label><select name=""><option value="a">a</option><option value="a">a</option><option value="a">a</option>
    <option value="a">a</option><option value="a">a</option><option value="a">a</option></select></div></div></div><div class="col-1">
    <label for=""></label> <button id="remove-${control}" onclick="removeCollaborator(this.id)" class="btn btn-remove-collaborator"><i class="fa fa-close">
    </i></button></div></div></div>`

    collaboratorList.insertAdjacentHTML("beforeend", newCollaboratorIten);

    $('select').niceSelect();

    updateCounter("up");
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
    
    updateCounter("down")
}