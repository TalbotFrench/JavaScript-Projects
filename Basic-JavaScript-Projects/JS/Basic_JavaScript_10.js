/* function myFunction() {
    var str = "Hello World!";
    var n = str.length;
    document.getElementById("demo").innerHTML = n;
  }

Function callLoop() {
    var Digit = "";
    var X = 1;
    while (X < 11) {
        Digit += "<br>" + X;
        X++;
    }
    document.getElementById("Loop").innerHTML = Digit;

}*/
var Instruments = ["Guitar", "Drums", "Piano", "Bass", "Violin", "Trumpet", "Flute"];
var Content = "";
var Y;
function for_Loop() {
    for (Y =0; Y < Instruments.length; Y++) {
        Content += Instruments[Y] + "<br>";
    }
    document.getElementById("List_of_Instruments").innerHtml = Content;
}

function array_Function(){
    var Thing = [];
    Thing[0] = "Lane"
    Thing[1] = "Rode"
    Thing[2] = "Strep"
    document.getElementById("thing").innerHTML = "in this picture there is a " + Thing[0] +
    ".";
}

function constant_function(){
    const Flag = {type:"American", Color:"Red, White & Blue!"};
    Flag.price = "$50";
    document.getElementById("Constant").innerHTML = "The cost of the " + Flag.type +  " flag is $50";
}

let car = {
    make: "Dodge ",
    model: "Viper ",
    year: "2021 ",
    color: "Red ",
    description : function() {
        return "the car is a " + this.year + this.color + this.make + this.model;
    }
};
document.getElementById("Car_Object").innerHTML = car.description();
