function full_Sentence() {
    var part_1 = "This is";
    var part_2 = "a public";
    var part_3 = "service announcment.";
    var part_4 = "Run!";
    var whole_sentence = part_1.concat(part_2, part_3, part_4);
    document.getElementById("ged").innerHTML = whole_sentence;
}
function slice_Method(){
    var Sentence = "All work and no play makes talbot a dull jay.";
    var Section = Sentence.slice(27,33);
    document.getElementById("Slice").innerHTML = Section;
}