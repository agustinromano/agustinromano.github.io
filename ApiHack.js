'use strict';


function getFoodInfo() {
  $('.js-form').on('submit', function (event) {
    const input = $("#foodSearchInput").val();
    console.log("input: " + input);
    event.preventDefault();

    const apiKey = 'RwF2lQB673HZPRaw9tmfa7arFAiPTb8e3Q1FSMh5';
    const url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${input}&sort=n&max=25&offset=0&api_key=${apiKey} `;
    console.log(url);

    fetch(url)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson))
  })
}

function displayResults(test) {
  console.log(test);
  const dataInfo = test.list.item.map(item => {
    return Object.values(item);
  })

  table.clear();
  table.rows.add(dataInfo);
  table.draw();
}

let table = null;

$(document).ready(function () {
  table = $('#myTable').DataTable({
    responsive: true,
    data: null,
    columnDefs: [
      {
        targets: 3,
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="index.html?nbno=' + encodeURIComponent(data) + '">' + data + '</a>';
          }

          return data;
        }
      }
    ],

    colums: [
      { title: "offset" },
      { title: "group" },
      { title: "name" },
      { title: "ndbno" },
      { title: "ds" },
      { title: "manu" }
    ]
  })
  getFoodInfo();
});

