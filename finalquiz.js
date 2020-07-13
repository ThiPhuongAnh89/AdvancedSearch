function loadTheQuiz(element) {
    var output = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //  document.getElementById("ajax").innerHTML = this.responseText;
            var jsonObject = JSON.parse(this.responseText);
             var contactFName = document.getElementById("fname");
        var contactLName = document.getElementById("lname");
        var contactCity = document.getElementById("city");
        var message = "";
        var boolNameCheck = checkField(contactFName.value);
        if (!boolNameCheck) {
            alert("'Firstname' must be supplied before the quiz can be graded\n");
            changeClass(contactFName, "error");

        } else {
            changeClass(contactFName, "");
        }

        // lastname check
        var boolLNameCheck = checkField(contactLName.value);
        if (!boolLNameCheck) {
            alert("'Lastname' must be supplied  before the quiz can be graded\n");
            changeClass(contactLName, "error");
        } else {
            changeClass(contactLName, "");
        }
        var boolCityCheck = checkField(contactCity.value);
        if (!boolCityCheck) {
            alert("'City' must be supplied before the quiz can be graded\n");
            changeClass(contactCity, "error");

        } else {
            changeClass(contactCity, "");
        }

            for (var i = 0; i < jsonObject.finalquiz.question.length; i++) {

                var quizObject = jsonObject.finalquiz.question[i];

                output += "<b>Question  " + quizObject.qnumber   + "<br>" + quizObject.qtitle + "</b><br><br>";

                var radioInput =
                    '<label><input type="radio" name="question' +
                    i +
                    '" id="question' +
                    i +
                    '" value=" ' +
                    "a" +
                    '">' +"a. "+
                    quizObject.a + "   "+
                    "</label><br>" +
                    '<label><input type="radio" name="question' +
                    i +
                    '" id="question' +
                    i +
                    '"  value=" ' +
                    "b" +  
                    '">' + "b. "+
                    quizObject.b + "   "+
                    "</label><br>" +
                    '<label><input type="radio" name="question' +
                    i +
                    '" id="question' +
                    i +
                    '"  value=" ' +
                    "c" +  
                    '">' + "c. "+
                    quizObject.c + "   "+
                    "</label><br>" +
                    '<label><input type="radio" name="question' +
                    i +
                    '" id="question' +
                    i +
                    '"  value=" ' +
                    "d" + 
                    '">' + "d. "+
                    quizObject.d + "   "+
                    "</label><br>";

                output += radioInput + "<br><br>";
            }
            output += "<input type=submit onclick= gradeMe(); class = button value= Grade Quiz />";
            output += "<br>";
        }

        // Vadidate the information   
        
       
        if (boolNameCheck && boolLNameCheck && boolCityCheck) {
            document.getElementById("quiz").innerHTML = output;
        }
        
    }
    xhttp.open("GET", "finalquiz.json", true);
    xhttp.send();
}



function gradeMe() {
    var result = 0;
    var selectAnswer = [];
    var answerList = [" b", " a", " d", " a", " c"];
    var counter = 0;
    for (var i = 0; i < answerList.length; i++) {
        var elements = document.getElementsByName("question" + i);

        for (var k = 0; k < elements.length; k++) {

            if (elements[k].checked) {
                selectAnswer[i] = elements[k].value;

                counter++;
                console.log(counter);

            }
        }

    }

    for (var i = 0; i < answerList.length; i++) {
        if (selectAnswer[i] == answerList[i]) {
            result++;
        }
    }
    var n = (+result/5)*100;
    var confirmation = "";
    confirmation += "Your result is " + result + "/5" + "("+n +"%"+")";
    confirmation += "<p Name: >" + document.getElementById("fname").value + " " + document.getElementById("lname").value + "<br/>";
    var prov = document.getElementById("province");
    var province = prov.options[prov.selectedIndex].text;

    confirmation += "<p>" + document.getElementById("city").value + ",  " + province + "<br/>";
    var unanswer = 5 - counter;
    if (unanswer>=1)
        {
        alert("You have " + unanswer + " questions did not completed. You can submit after all questions are answered") 
        }
    else
        {
        document.getElementById("showmark").innerHTML = confirmation;
            }
}






function changeClass(field, newValue) {
    field.setAttribute("class", newValue);
}

// sources: on the form example
// function to validate content entered by the user
//
function checkField(fieldValue) {
    var check = true;

    fieldValue = fieldValue.trim();
    if (fieldValue.length == 0) {
        check = false;
        return check;
    }

    return check;
}
