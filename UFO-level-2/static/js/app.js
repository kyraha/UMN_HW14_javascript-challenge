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
    if(inputValue.length == 0) return "";
    let dt = d3.timeParse("%m/%d/%Y")(inputValue);
    parsed_dt = d3.timeFormat("%m/%e/%Y")(dt).replace(" ", "")
    if(parsed_dt[0] == '0') {
        return parsed_dt.substring(1);
    }
    return parsed_dt;
}

function renderTable(dateFilter, inputCity, inputState, inputCountry, inputShape) {
    let tbody = d3.select("tbody");
    let counter = 0;
    tbody.text("");
    data.forEach(sighting => {
        if(
            (dateFilter === undefined || dateFilter.length == 0 || sighting.datetime === dateFilter) &&
            (inputCity === undefined || inputCity.length == 0 || sighting.city === inputCity.toLowerCase()) &&
            (inputState === undefined || inputState.length == 0 || inputState.toLowerCase() === sighting.state) &&
            (inputCountry === undefined || inputCountry.length == 0 || inputCountry.toLowerCase() === sighting.country) &&
            (inputShape === undefined || inputShape.length == 0 || inputShape.toLowerCase() === sighting.shape)
        )
        {
            row = tbody.append("tr");
            Object.entries(sighting).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
            counter++;
        }
    })
    let td = tbody.append("tr").append("td");
    td.attr("colspan", 7);
if(counter == 0) {
        td.text("No sightings were found on your criteria. Try other filters.")
    }
    else {
        td.text(`Total ${counter} sightings found by the criteria.`)
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

  var inputCity = d3.select("#city").property("value");
  var inputState = d3.select("#state").property("value");
  var inputCountry = d3.select("#country").property("value");
  var inputShape = d3.select("#shape").property("value");

  renderTable(
      reformatDate(inputValue),
      inputCity,
      inputState,
      inputCountry,
      inputShape
    );
}

renderTable("");