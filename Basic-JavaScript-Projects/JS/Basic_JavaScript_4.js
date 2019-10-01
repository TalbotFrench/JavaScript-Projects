function my_Dictionary() {
    var Animal = {
        Species:"Dragon",
        Color:"Black",
        Breed:"Longarian Long Wing",
        Age:256,
        Sound:"Roarrrr!"
    }
    delete Animal.Sound;
    document.getElementById("Dictionary").innerHTML = Animal.Sound;
}