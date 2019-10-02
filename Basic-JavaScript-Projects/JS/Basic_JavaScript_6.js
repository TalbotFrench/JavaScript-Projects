/*function Age_Function() {
    var Age, Can_Vote;
    Age = document.getElementById("Age").Value;
    Can_Vote = (Age < 18) ? "You are too Young":"You are old enough";
    document.getElementById("Vote").innerHTML = Can_Vote + " to vote.";
}*/
/*function Vehicle(Make, Model, Year, Color) {
    this.Vehicle_Make = Make;
    this.Vehicle_Model = Model;
    this.Vehicle_Year = Year;
    this.Vehicle_Color = Color;
}*/
/*
 function Person(First, Last, Age,){
this.firstName = First;
this.lastName = Last;
this.age = Age;
document.getElementById("person").innerHTML = Suzie.firstName + Suzie.lastName + Suzie.Age;
}
*/
function Nested_Function() {
    document.getElementById("Nested_Function").innerHTML = Count();
    function Count() {
        var Starting_point = 9;
        function Plus_one() {Starting_point += 1;}
        Plus_one();
        return Starting_point;
        }
}

