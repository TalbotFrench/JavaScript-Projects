


function Animal_Funtion() {
var Animal_Output;
var Animals = document.getElementById("Animal_Input").value;
var Animal_String = " is a great Animal!";
switch(Animals){
    case "Cat":
    Animal_Output = "Cat " + Animal_String;
    break;
    case "Dog":
    Animal_Output = "Cat " + Animal_String;
    break;
    case "Horse":
    Animal_Output = "Cat " + Animal_String;
    break;
    case "Fish":
    Animal_Output = "Cat " + Animal_String;
    break;
    default:
    Animal_Output = "Please enter the animal exactly as written above."
}
document.getElementById("Output").innerHTML = Color_Output;
}

function Change() {
    var A = document.getElementsByClassName("Click");
    A[0].innerHTML = "The text has changed!";
}

