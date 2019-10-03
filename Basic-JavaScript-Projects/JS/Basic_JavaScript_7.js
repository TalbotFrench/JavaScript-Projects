/* var X = 10;
function Add_numbers_1() {
    document.write(20 + X + "<br>");
}
function Add_numbers_2() {
    var y = 14;
    document.write(y + 100);
}
Add_numbers_1();
Add_numbers_2();*/
 var age = putit;
function get_Age(){
   
    if (age <= 18) {
        document.getElementById("answer").innerHTML = "You are still a child."
    } else{
        document.getElementById("answer").innerHTML = "You are an adult."
    }
}