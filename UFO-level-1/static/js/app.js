// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit",runEnter);

function reformatDate(inputValue) {
    let dt = d3.timeParse("%m/%d/%Y")(inputValue);
    parsed_dt = d3.timeFormat("%m/%e/%Y")(dt).replace(" ", "")
    if(parsed_dt[0] == '0') {
        return parsed_dt.substring(1);
    }
    return parsed_dt;
}

function renderTable(dateFilter) {
    let tbody = d3.select("tbody");
    let counter = 0;
    tbody.text("");
    data.forEach(sighting => {
        if(dateFilter.length == 0 || sighting.datetime === dateFilter) {
            row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
            counter++;
        }
    })
    if(counter == 0) {
        let td = tbody.append("tr").append("td");
        td.attr("colspan", 7);
        td.text("No sightings were recorded for this date.")
        console.log(td);
    }
}


// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Print the value to the console
  // console.log(reformatDate(inputValue));

  renderTable(reformatDate(inputValue));
}

renderTable("");