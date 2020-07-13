var nodeList = [];
var productionDataArray = [];


function initialization() {
    loadWellXMLDoc();
    loadProductData();
}

/* PART1: READ DATA FROM 2 FILES*/
function loadWellXMLDoc() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // var xmlDocument = this.responseText;
            //  searchWellData(this);

            var content = this.responseText;
            var parserWell = new DOMParser();
            var xmlDocument = parserWell.parseFromString(content, "text/xml");


            for (var i = 0; i < xmlDocument.getElementsByTagName("welldata").length; i++) {

                var location = xmlDocument.getElementsByTagName("location")[i].childNodes[0].nodeValue.trim();
                var welldepth = xmlDocument.getElementsByTagName("welldepth")[i].childNodes[0].nodeValue.trim();
                var perfdepth = xmlDocument.getElementsByTagName("perfdepth")[i].childNodes[0].nodeValue.trim();
                var perfzone = xmlDocument.getElementsByTagName("perfzone")[i].childNodes[0].nodeValue.trim();
                var stroke = xmlDocument.getElementsByTagName("stroke")[i].childNodes[0].nodeValue.trim();
                var strokepermin = xmlDocument.getElementsByTagName("strokepermin")[i].childNodes[0].nodeValue.trim();


                nodeList.push({
                    location: location,
                    welldepth: welldepth,
                    perfdepth: perfdepth,
                    perfzone: perfzone,
                    stroke: stroke,
                    strokepermin: strokepermin
                });



            }

        }
    };
    xhttp.open("GET", "welldata.xml", true);
    xhttp.send();
}


function loadProductData() {

    var parser, xmlDoc;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {


        if (this.readyState == 4 && this.status == 200) {
            // searchProductionData(this);
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

/* PART 2: SEARCH FOR LOCATION AND WELLDEPTH TEXT FIELD */

function searchWellData(element) {
    loadWellXMLDoc();
    var location, welldepth, perfdepth, perfzone, stroke, strokepermin;
    //  var xmlDocument = element.responseXML;
    // nodeList = xmlDocument.getElementsByTagName("welldata");

    var input1 = document.getElementById("location").value.toUpperCase();
    var input2 = document.getElementById("welldepth").value.toUpperCase();

    var style = "";
    var results = false;



    var divText = "<h1 align=center >The Information details</h1><br /><div class =scroll ><table align=center  border=1><tr><th>Location</th><th>Welldepth</th><th>Perfdepth</th><th>Perfzone</th><th>Stroke</th><th>Strokepermin</th></tr>";


    for (var i = 0; i < nodeList.length; i++) {

        //  var location = saveItem.getElementsByTagName("location")[0].textContent;
        location = nodeList[i].location;
        welldepth = nodeList[i].welldepth;

        //  var welldepth = saveItem.getElementsByTagName("welldepth")[0].textContent;


        if (location.trim().startsWith(input1) && welldepth.trim().startsWith(input2))
        //  if ( welldepth.trim().startsWith(input2))

        {

            perfdepth = nodeList[i].perfdepth;

            perfzone = nodeList[i].perfzone;

            stroke = nodeList[i].stroke;

            strokepermin = nodeList[i].strokepermin;

            // divText += '<tr><td>' + location + '</td><td>' + welldepth + '</td><td>' + perfdepth + '</td><td>' + perfzone + '</td><td>' + stroke + '</td><td>' + strokepermin + '</td><td align=right> <a href="javascript:void(0);" onclick=searchProductionDataByLocation('+ location + ', ' + welldepth + ', ' + perfdepth + ', ' + perfzone + ', ' + stroke + ', ' + strokepermin + ')>More detail</a></td></tr></tr><tr class="hide" id="tr-' + location.trim().replace(/-/g, "") + '"><td id="td-' + location.trim().replace(/-/g, "") + '" colspan=7></td></tr>';

            divText += '<tr><td>' + location + '</td><td>' + welldepth + '</td><td>' + perfdepth + '</td><td>' + perfzone + '</td><td>' + stroke + '</td><td>' + strokepermin + '</td><td align=right> <a href="javascript:void(0);" onclick=searchProductionDataByLocation("' + location.trim() + '")>More detail</a></td></tr></tr><tr class="hide" id="tr-' + location.trim().replace(/-/g, "") + '" ><td id="td-' + location.trim().replace(/-/g, "") + '" colspan=7></td></tr>';

            results = true;
        }
    }


    divText += "</table></div>";



    if (results) {

        document.getElementById("results").innerHTML = divText;



    } else {

        document.getElementById("results").innerHTML = "<b>No results for your search!</b>";
        // alert("please vadidate your search");

    }


}

/* FOR SEE MORE DETAIL LINK */

//function searchProductionDataByLocation(location,welldepth,perfdepth,perfzone,stroke,strokepermin) {

function searchProductionDataByLocation(location) {


    var results = false;

    var date = "";

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

            //content += "<tr><td>" + date + "</td><td>" + oilproduction + "</td><td>" + waterproduction + "</td><td>" + gasproduction + "</td><td align=right>" + " <a href="javascript:void(0);" >Fill the text</a>"+ "</td></tr>";


            content += '<tr><td>' + date + '</td><td>' + oilproduction + '</td><td>' + waterproduction + '</td><td>' + gasproduction;

            content += '</td><td align=right>';


            content += '<a href="javascript:void(0);" onclick=fillData("' + date + '","' + location.trim() + '")>Fill data</a>';
            content += '</td></tr>';

            results = true;

        }

    }


    content += "</table></div>";

    if (results) {

        document.getElementById("td-" + location.trim().replace(/-/g, "")).innerHTML = content;
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.remove("hide");
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.add("show");

    } else {

        document.getElementById("results").innerHTML = "<b>No results for your search!</b>!";

    }


}


/* PART2: SEARCH FOR OILPRODUCTION AND GASPRODUCTION TEXT FIELD*/

function searchProductionData(element) {
    loadProductData();

    var date;

    var oilproduction;

    var waterproduction;

    var gasproduction;

    var input3 = document.getElementById("oilproduction").value;
    var input4 = document.getElementById("gasproduction").value;

    var style = "";
    var results = false;



    var divText = "<h1>The Information details</h1><br /><div class=scroll ><table align=center  border=1><tr><th>Date</th><th>Oilproduction</th><th>Waterproduction</th><th>Gasproduction</th></tr>";



    for (var pos = 0; pos < productionDataArray.length; pos++) {

        oilproduction = productionDataArray[pos].oilproduction;

        var location = productionDataArray[pos].location;

        gasproduction = productionDataArray[pos].gasproduction;

        if (oilproduction.trim().startsWith(input3) && gasproduction.trim().startsWith(input4)) {

            //if (oilproduction.trim().startsWith(input3)) {
            waterproduction = productionDataArray[pos].waterproduction;
            date = productionDataArray[pos].date;

            // divText += '<tr><td>' + date + '</td><td>' + oilproduction + '</td><td>' + waterproduction + '</td><td>' + gasproduction + '</td></tr>';

            divText += '<tr><td>' + date + '</td><td>' + oilproduction + '</td><td>' + waterproduction + '</td><td>' + gasproduction + '</td><td align=right> <a href="javascript:void(0);" onclick=searchWellDataByLocation("' + date + '","' + location.trim() + '")>More detail</a></td></tr></tr><tr class="hide" id="tr-' + location.trim().replace(/-/g, "") + '"><td id="td-' + location.trim().replace(/-/g, "") + '" colspan=7></td></tr>';


            results = true;
        }



    }


    divText += "</table></div>";



    if (results) {

        document.getElementById("results").innerHTML = divText;



    } else {

        document.getElementById("results").innerHTML = "<b>No results for your search!</b>";
        // alert("please vadidate your search");

    }
}





/* FOR SEE MORE DETAIL LINK */
function searchWellDataByLocation(date, location) {


    var results = false;

    // var location1 = "";

    var welldepth = "";

    var perfdepth = "";

    var perfzone = "";

    var stroke = "";

    var strokepermin = "";

    var content = "<div class='internal'><h3>The " + location + " Information details are:</h3><table><tr><th>Location</th><th>welldepth</th><th>perfdepth</th><th>perfzone</th><th>stroke</th><th>strokepermin</th></tr>";


    for (var i = 0; i < nodeList.length; i++) {


        if ((nodeList[i].location.trim() == location)) {

            console.log(nodeList[i].location.trim() + "----" + location);

            location = nodeList[i].location.trim();

            welldepth = nodeList[i].welldepth;

            perfdepth = nodeList[i].perfdepth;

            perfzone = nodeList[i].perfzone;

            stroke = nodeList[i].stroke;

            strokepermin = nodeList[i].strokepermin;



            content += '<tr><td>' + location + '</td><td>' + welldepth + '</td><td>' + perfdepth + '</td><td>' + perfzone + '</td><td>' + stroke + '</td><td>' + strokepermin;

            content += '</td><td align=right>';


            content += '<a href="javascript:void(0);" onclick=fillData("' + date + '","' + location.trim() + '")>Fill data</a>';
            content += '</td></tr>';

            results = true;

        }

    }

    content += "</table></div>";

    if (results) {

        document.getElementById("td-" + location.trim().replace(/-/g, "")).innerHTML = content;
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.remove("hide");
        document.getElementById("tr-" + location.trim().replace(/-/g, "")).classList.add("show");

    } else {

        document.getElementById("results").innerHTML = "<b>No results for your search!</b>!";

    }


}


/*PART3 FILL TO THE TEXT FIED */

//function fillData(locationField, welldepthField, perfdepthField, perfzoneField, strokeField, strokeperminField, dateField, oilproductionField, waterproductionField, gasproductionField) {
/*
function fillData() {


    document.getElementById("location").value = locationField;

    document.getElementById("location").value = locationField;
    document.getElementById("welldepth").value = welldepthField;
    document.getElementById("perfdepth").value = perfdepthField;
    document.getElementById("perfzone").value = perfzoneField;
    document.getElementById("stroke").value = strokeField;
    strokeperminField = document.getElementById("strokepermin").value;
    document.getElementById("date").value = dateField;
    oilproductionField = document.getElementById("oilproduction").value;
    document.getElementById("waterproduction").value = waterproductionField;
    document.getElementById("gasproduction").value = gasproductionField;

}

*/


function searchAndFilledProductionDataByLocation(date, location) {

    for (var pos = 0; pos < productionDataArray.length; pos++) {

        if ((productionDataArray[pos].location == location) && (productionDataArray[pos].date == date)) {

            document.getElementById("date").value = productionDataArray[pos].date;
            document.getElementById("oilproduction").value = productionDataArray[pos].oilproduction;
            document.getElementById("waterproduction").value = productionDataArray[pos].waterproduction;
            document.getElementById("gasproduction").value = productionDataArray[pos].gasproduction;

        }

    }

}


function searchAndFilledWellDataByLocation(location) {

    for (var i = 0; i < nodeList.length; i++) {


        if (nodeList[i].location.trim() == location) {

            document.getElementById("location").value = nodeList[i].location.trim();
            document.getElementById("welldepth").value = nodeList[i].welldepth;
            document.getElementById("perfdepth").value = nodeList[i].perfdepth;
            document.getElementById("perfzone").value = nodeList[i].perfzone;
            document.getElementById("stroke").value = nodeList[i].stroke;
            document.getElementById("strokepermin").value = nodeList[i].strokepermin;


        }

    }

}


function fillData(date, location) {
    searchAndFilledWellDataByLocation(location);
    searchAndFilledProductionDataByLocation(date, location);
}



/*PART4 CLEAR THE TEXT FIED */

function ClearSearch() {
    document.getElementById("results").innerHTML = " ";
}
