'use strict'

$(document).ready(function () {
    table = $('#newTable').DataTable({
      responsive: {
        breakpoint:[
          
        ]}
      data : null,
      colums : [
        { title: "ndbno"},
        { title: "name"},
        { title: "weight"},
        { title: "measure" },
        { title: "nutrients"},
      ]
    })
    getNutrientInfo();
  });

const urlParams = new URLSearchParams(window.location.search);
const nbno = urlParams.get('nbno');

function getNutrientInfo() {
      const apiKey = 'RwF2lQB673HZPRaw9tmfa7arFAiPTb8e3Q1FSMh5';
      const url = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${apiKey}&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nbno=${nbno}`;
      console.log(url);
      
      fetch(url)
        .then(response => response.json())
        .then(responseJson => displayNutrients(responseJson))
};

function displayNutrients(results) {
    console.log(results);
    const dataInfo = results.report.foods.map(foods => {
      return Object.values(foods);
    });
  
    table.clear();
    table.rows.add(dataInfo);
    table.draw();
};
  
  let table = null;
  
