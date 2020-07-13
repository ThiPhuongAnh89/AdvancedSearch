var locationWellData = [];
var nodeList = [];
var nodeListPro = [];
var compareLocation;
var productionDataArray = [];
var section;
var township;
var range;
var meridian;


function vadidateSection() {
    section = document.getElementById("section").value;
   

    if (section[0] != 'A' && section[0] != 'a' && section[0] != 'B' && section[0] != 'b' && section[0] != 'C' && section[0] != 'c' && section[0] != 'D' && section[0] != 'd') {
     
        alert('Invalid Section given! Section: A-D or a-d and 1-16 ');
           return false;
    }
    if (isNaN(section.substring(1))) //whether a value is an illegal number (Not-a-Number).
    /*https://www.w3schools.com/jsref/jsref_isnan.asp*/
    {  
         alert('Invalid Section given! Section: A-D or a-d and 1-16 ');
         return false;
        
    }
    var number = parseInt(section.substring(1))
    if (number > 16 || number < 1) {
      
         alert('Invalid Section given! Section: A-D or a-d and 1-16 ');
          return false;
    }
    if (section.length == 0 || section.length > 3) {
      
         alert('Invalid Section given! Section: A-D or a-d and 1-16 ');
          return false;
    }
    return true;
}



function vadidateTownship() {
    township = document.getElementById("township").value;
    if (isNaN(township)) {
      
        alert('Enter Township between 1 - 126 range.');
          return false;
    }
    var number = parseInt(township)
    if (number > 127 || number < 1) {
         alert('Enter Township between 1 - 126 range.');
        return false;
    }

    return true;
}


function vadidateRange() {

    range = document.getElementById("range").value;
    if (isNaN(range)) {
        alert('Enter Range between 1 - 24 range.');
        return false;
    }
    var number = parseInt(range)
    if (number > 24 || number < 1) {
       
        alert('Enter Range between 1 - 24 range.');
         return false;
    }

    return true;
}



function vadidateMeridian() {

    meridian = document.getElementById("meridian").value;

        if (meridian[0] != 'W' && meridian[0] != 'w') {
          
            alert('Invalid Meridian given! meridian: W and 4-6 ');
              return false;
        }
        if (isNaN(meridian.substring(1))) //whether a value is an illegal number (Not-a-Number).
        /*https://www.w3schools.com/jsref/jsref_isnan.asp*/
        {
          
            alert('Invalid Meridian given! meridian: W and 4-6 ');
              return false;
        }
        var number = parseInt(meridian)
        if (number > 6 || number < 4) {
          
            alert('Invalid Meridian given! meridian: W and 4-6 ');
              return false;
        }
        if (meridian.length == 0 || meridian.length > 2) {
           
            alert('Invalid Meridian given! meridian: W and 4-6 ');
             return false;
        }
        return true;
    }




function initialization() {
    loadProductData();
}


function loadWellXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // var xmlDocument = this.responseText;
            searchWellData(this);
        }
    };
    xhttp.open("GET", "welldata.xml", true);
    xhttp.send();
}


function loadProductData(element) {

    var parser, xmlDoc;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {


        if (this.readyState == 4 && this.status == 200) {
            /*https://www.w3schools.com/xml/dom_parser.asp*/
            var content = this.responseText;
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(content, "text/xml");


            for (var pos = 0; pos < xmlDoc.getElementsByTagName("productiondata").length; pos++) {

                var location = xmlDoc.getElementsByTagName("location")[pos].childNodes[0].nodeValue.trim();
                var date = xmlDoc.getElementsByTagName("date")[pos].childNodes[0].nodeValue.trim();
                var oilproduction = xmlDoc.getElementsByTagName("oilproduction")[pos].childNodes[0].nodeValue.trim();
                var waterproduction = xmlDoc.getElementsByTagName("waterproduction")[pos].childNodes[0].nodeValue.trim();
                var gasproduction = xmlDoc.getElementsByTagName("gasproduction")[pos].childNodes[0].nodeValue.trim();


                productionDataArray.push({
                    location: location,
                    date: date,
                    oilproduction: oilproduction,
                    waterproduction: waterproduction,
                    gasproduction: gasproduction
                });

            }

        }

    };

    xhttp.open("GET", "productiondata.xml", true);
    xhttp.send();
}


function getElementCheckboxChecked() {
    var choices = [];
    var els = document.getElementsByName('option');

    for (var i = 0; i < els.length; i++) {

        if (els[i].checked) {
            return els[i].value;
        }

    }

}


function searchWellData(element) {
    var nodeList, proNodeList, saveItem, location, welldepth, perfdepth, perfzone, stroke, strokepermin, proLocation;
    var xmlDocument = element.responseXML;
    nodeList = xmlDocument.getElementsByTagName("welldata");


    section = document.getElementById("section").value;
    township = document.getElementById("township").value;
    range = document.getElementById("range").value;
    meridian = document.getElementById("meridian").value;

  //  if(((document.getElementById("opt1").checked == true) && vadidateSection && (township== null) && (range==null) && (meridian == null)) || ((document.getElementById("opt2").checked == true) && vadidateSection() && vadidateTownship() && vadidateRange() && vadidateMeridian())){
        
    
    var input1 = section.concat("-").concat(township).concat("-").concat(range).concat("-").concat(meridian);
   
    var input = input1.toUpperCase();

    // var input = document.getElementById("myInput").value.toUpperCase();
    size = input.length;

    var style = "";
    var filledProductionData = true;
    var results = false;


    if (document.getElementById("opt1").checked == true || document.getElementById("opt2").checked == true) {

        //var divText = "<h1>The Information details</h1><br /><div class= scroll><table align=center  border=1><tr><th>Location</th><th>Welldepth</th><th>Perfdepth</th><th>Perfzone</th><th>Stroke</th><th>Strokepermin</th></tr>";
       var divText = "<h1>The Information details</h1><br /><div class =scrollpartB ><table align=center  border=1><tr><th>Location</th><th>Welldepth</th><th>Perfdepth</th><th>Perfzone</th><th>Stroke</th><th>Strokepermin</th></tr>";

        if (getElementCheckboxChecked() == "full") {
            console.log("---------->" + input);


            for (var i = 0; i < nodeList.length; i++) {
                saveItem = nodeList[i];
                var location = saveItem.getElementsByTagName("location")[0].textContent;


                if (location.trim() == (input)) {

                    compareLocation = location;

                    var welldepth = saveItem.getElementsByTagName("welldepth")[0].textContent;

                    var perfdepth = saveItem.getElementsByTagName("perfdepth")[0].textContent;

                    var perfzone = saveItem.getElementsByTagName("perfzone")[0].textContent;

                    var stroke = saveItem.getElementsByTagName("stroke")[0].textContent

                    var strokepermin = saveItem.getElementsByTagName("strokepermin")[0].textContent;

                    divText += '<tr><td>' + location + '</td><td>' + welldepth + '</td><td>' + perfdepth + '</td><td>' + perfzone + '</td><td>' + stroke + '</td><td>' + strokepermin + '</td></tr></tr><tr class="' + style + '" id="tr-' + location.trim().replace(/-/g, "") + '" ><td id="td-' + location.trim().replace(/-/g, "") + '" colspan=7></td></tr>';

                    results = true;

                }
            }


      //  } if ((getElementCheckboxChecked() == "section") && vadidateSection() && (township= null) && (range=null) && (meridian = null)) {
        } else {


            filledProductionData = false;
            var input = document.getElementById('section').value;


            for (var i = 0; i < nodeList.length; i++) {
                saveItem = nodeList[i];
                var location = saveItem.getElementsByTagName("location")[0].textContent;

                if (input.toUpperCase() == location.trim().substr(0, 2) || input.toUpperCase() == location.trim().substr(0, 3)) {


                    compareLocation = location;

                    var welldepth = saveItem.getElementsByTagName("welldepth")[0].textContent;

                    var perfdepth = saveItem.getElementsByTagName("perfdepth")[0].textContent;

                    var perfzone = saveItem.getElementsByTagName("perfzone")[0].textContent;

                    var stroke = saveItem.getElementsByTagName("stroke")[0].textContent

                    var strokepermin = saveItem.getElementsByTagName("strokepermin")[0].textContent;

                    divText += '<tr><td>' + location + '</td><td>' + welldepth + '</td><td>' + perfdepth + '</td><td>' + perfzone + '</td><td>' + stroke + '</td><td>' + strokepermin + '</td><td align=right> <a href="javascript:void(0);" onclick=searchProductionDataByLocation("' + location.trim() + '")>More detail</a></td></tr></tr><tr class="hide" id="tr-' + location.trim().replace(/-/g, "") + '" ><td id="td-' + location.trim().replace(/-/g, "") + '" colspan=7></td></tr>';

                    results = true;

                }
            }

        }


        divText += "</table></div>";
        
        

        if (results ) {

            document.getElementById("results").innerHTML = divText;

        } 
        else {

            document.getElementById("results").innerHTML = "<b>No results for your search!</b>";
           // alert("please vadidate your search");

        }
        
        }

    if (filledProductionData) {
        searchProductionDataByLocation(input);
    }

    }

    
 
    




function searchProductionDataByLocation(location) {

    var results = false;

    var date = "";

    var oilpro = "";

    var oilproduction = "";

    var waterproduction = "";

    var gasproduction = "";

    var content = "<div class='internal'><h3>The " + location + " Information details are:</h3><table><tr><th>Date</th><th>Oilproduction</th><th>Waterproduction</th><th>Gasproduction</th></tr>";


    for (var pos = 0; pos < productionDataArray.length; pos++) {

        if (productionDataArray[pos].location == location) {


            date = productionDataArray[pos].date;

            oilproduction = productionDataArray[pos].oilproduction;

            waterproduction = productionDataArray[pos].waterproduction;

            gasproduction = productionDataArray[pos].gasproduction;

            content += "<tr><td>" + date + "</td><td>" + oilproduction + "</td><td>" + waterproduction + "</td><td>" + gasproduction + "</td></tr>";

            results = true;

        }

    }

    content += "</table></div>";

    if (results) {
        /*https://stackoverflow.com/questions/1206911/why-do-i-need-to-add-g-when-using-string-replace-in-javascript, https://codethief.io/javascript-replace-all/*/
        document.getElementById("td-" + location.trim().replace(/-/g, "")).innerHTML = content;
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.remove("hide");
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.add("show");

    } else {

        document.getElementById("results").innerHTML = "<b>No results for your search!</b>!";

    }

}

function ClearSearch() {
    document.getElementById("results").innerHTML = " ";
}
