const baseURL = "https://ci-swapi.herokuapp.com/api/"
function getData(type, cb) {
var xhr = new XMLHttpRequest(); //XMLHttpRequest object is an inbuilt object that Javascript provides to allow us to consume APIs//


xhr.open("GET", baseURL + type + "/"); //GET and POST used most often- get used to retrieve data, post is when you send data. 2nd argument is the url we want to retrieve//
xhr.send();



xhr.onreadystatechange = function() {
    
    if (this.readyState == 4 && this.status == 200) {
       
     cb(JSON.parse(this.responseText));
       
    }
};

}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}


function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function(data) {
       data = data.results;
       var tableHeaders = getTableHeaders(data[0]);


       data.forEach(function(item) {
          var dataRow = [];
          Object.keys(item).forEach(function(key) {
              var rowData = item[key].toString();
              var truncatedData = rowData.substring(0, 15);
              dataRow.push(`<td>${truncatedData}</td>`);
           });
           tableRows.push(`<tr>${dataRow}</tr>)`);
    
       el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
});
}
