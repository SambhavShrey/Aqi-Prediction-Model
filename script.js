function filterCities() {
    var input, filter, dropdown, items, item, i;
    input = document.getElementById('cityInput');
    filter = input.value.toUpperCase();
    dropdown = document.getElementById('cityDropdown');
    items = dropdown.getElementsByTagName('span');
    
    // If the input is empty, show all dropdown items
    if (!filter.trim()) {
        dropdown.style.display = 'block';
        for (i = 0; i < items.length; i++) {
            item = items[i];
            item.style.display = 'block';
        }
        return;
    }

    // Loop through all dropdown items, and hide those that don't match the search query
    for (i = 0; i < items.length; i++) {
        item = items[i];
        if (item.textContent.toUpperCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }

    // Show the dropdown if there are matching items
    var visibleItems = Array.from(items).filter(item => item.style.display !== 'none');
    dropdown.style.display = visibleItems.length > 0 ? 'block' : 'none';
}
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityInput');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Event listener for input keyup event
    cityInput.addEventListener('keyup', function() {
        const filter = cityInput.value.toUpperCase();
        dropdownItems.forEach(function(item) {
            if (item.textContent.toUpperCase().indexOf(filter) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Event listener for dropdown item click
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            cityInput.value = item.textContent;
            // Hide the dropdown after selection
            document.getElementById('cityDropdown').style.display = 'none';
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediction-form');
    const resultDiv = document.getElementById('prediction-result');
    const cityInput = document.getElementById('cityInput');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const temperature = parseFloat(document.getElementById('temperature').value);
        const humidity = parseFloat(document.getElementById('humidity').value);
        const windSpeed = parseFloat(document.getElementById('wind-speed').value);

        const aqi = calculateAQI(temperature, humidity, windSpeed);

        resultDiv.classList.remove('hidden');
        document.getElementById('aqi-value').textContent = aqi;

        // Determine AQI category and display additional information
        determineAQICategory(aqi);
    });
   
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            console.log("Dropdown item clicked");
            cityInput.value = item.textContent;
        });
        
    });
});

// Function to calculate AQI
function calculateAQI(temperature, humidity, windSpeed) {
    return temperature + humidity + windSpeed;
}

// Function to determine AQI category
function determineAQICategory(aqi) {
    let category;
    if (aqi < 50) {
        category = "Good";
    } else if (aqi < 100) {
        category = "Moderate";
    } else if (aqi < 150) {
        category = "Unhealthy for Sensitive Groups";
    } else if (aqi < 200) {
        category = "Unhealthy";
    } else if (aqi < 300) {
        category = "Very Unhealthy";
    } else {
        category = "Hazardous";
    }

    // Display AQI category
    document.getElementById('aqi-category').textContent = category;

    displayAdditionalInfo(category);
}

// Function to display additional information
function displayAdditionalInfo(category) {
    const sensitiveGroups = {
        "Good": "None",
        "Moderate": "Unusually sensitive people should consider reducing prolonged or heavy exertion.",
        "Unhealthy for Sensitive Groups": "People with respiratory or heart conditions, the elderly, and children are likely to be affected.",
        "Unhealthy": "Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.",
        "Very Unhealthy": "Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.",
        "Hazardous": "Everyone should avoid all outdoor exertion."
    };

    const healthEffects = {
        "Good": "None",
        "Moderate": "Air quality is acceptable; however, there may be some pollutants that may pose a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
        "Unhealthy for Sensitive Groups": "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
        "Unhealthy": "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
        "Very Unhealthy": "Health alert: everyone may experience more serious health effects.",
        "Hazardous": "Health warnings of emergency conditions. The entire population is likely to be affected."
    };

    const cautionaryStatements = {
        "Good": "None",
        "Moderate": "Unusually sensitive people: Consider reducing prolonged or heavy exertion.",
        "Unhealthy for Sensitive Groups": "People with respiratory or heart disease: Limit prolonged exertion.",
        "Unhealthy": "Active children and adults, and people with respiratory disease, such as asthma: Limit prolonged outdoor exertion.",
        "Very Unhealthy": "Active children and adults, and people with respiratory disease, such as asthma: Avoid outdoor exertion; everyone else: Limit outdoor exertion.",
        "Hazardous": "Everyone: Avoid outdoor exertion."
    };

    // Display sensitive groups, health effects, and cautionary statements
    document.getElementById('sensitive-groups').textContent = sensitiveGroups[category];
    document.getElementById('health-effects').textContent = healthEffects[category];
    document.getElementById('cautionary-statements').textContent = cautionaryStatements[category];

}