function validateForm() {
    var x = document.forms["myForms"]["firstname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}