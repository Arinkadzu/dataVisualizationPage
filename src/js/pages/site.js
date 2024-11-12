import { renderChart } from '../js/dataVisualization/chartJS.js'

let darkMode = false;
function switchToDarkMode(state) {
    if (state) {
        //switch to dark mode
        $('.main-container').addClass('dark-mode');
    } else {
        //switch to light mode
        $('.main-container').removeClass('dark-mode');
    }
}

function getCurrentSectionText() {
    const currentHash = window.location.hash;

    const sections = document.querySelectorAll('section[id]');

    for (const section of sections) {
        if (section.id === currentHash.slice(1)) {
            return section.textContent.trim();
        }
    }

    // No matching section found, return an empty string
    return "";
}

$(document).ready(function () {

    //Elements render
    $('.heading').html('<h4>Changed</h4>');
    $('.star--dark').attr('src', 'images/star-dark.svg');
    $('.star--light').attr('src', 'images/star-light.svg');
    $('.stars--light').attr('src', 'images/stars-light.svg');
    $('.stars--dark').attr('src', 'images/stars-dark.svg');


    $('.toggle-btn').on('click', function () {
        //var Status = $(this).val();
        console.log('click');
        if (!darkMode) {
            darkMode = true;
            $(this).addClass('toggle-btn--dark');
        } else {
            darkMode = false;
        }
        switchToDarkMode(darkMode);
    });

    $('.image-annotation').html(`<span></span>`);

    $('.dropdown-item__icon').html(`<img class="star star--small star--dark" src="images/star-dark.svg" alt="Star element">`);

    const currentSectionSpan = document.querySelector('.current-section');

    if (currentSectionSpan) {
        currentSectionSpan.textContent = getCurrentSectionText();
    }

    const dataVisualization = {
        chartJS: {
            selector: 'chartJS',
            title: 'Driving Tester Distribution',
            renderFunction: renderChart,
            question: 'Ok?'
        },
        chartJS2: {
            selector: 'chartJS2',
            title: 'Driving Tester Distribution2',
            renderFunction: renderChart,
            question: 'Ok?'
        }
    }


    function createVisualizationElements(data) {
        const mainContainer = document.getElementById("main");

        Object.values(data).forEach(item => {
            // Create the outer wrapper
            const section = document.createElement("div");
            section.className = "main__section__wrapper";

            const visualizationWrapper = document.createElement("div");
            visualizationWrapper.className = "data-visualization__wrapper";
            // Create the title
            const title = document.createElement("div");
            title.className = "visualization-title";
            title.textContent = item.title;
            // Create the inner visualization div with a unique class name
            const visualizationDiv = document.createElement("div");
            const className = `js-visualization-${item.selector}`;
            visualizationDiv.className = className;

            // Append the inner div to the wrapper, and the wrapper to the main container
            visualizationWrapper.appendChild(title);
            visualizationWrapper.appendChild(visualizationDiv);

            const formWrapper = document.createElement("div");
            const form = document.createElement("input");
            const label = document.createElement("label");
            label.innerText = item.question;
            formWrapper.className = "form__wrapper";
            form.className = `js-form-input-${item.selector}`;

            formWrapper.appendChild(label);
            formWrapper.appendChild(form);

            section.appendChild(visualizationWrapper);
            section.appendChild(formWrapper);
            mainContainer.appendChild(section);


            // Call the specific rendering function for this visualization
            if (typeof item.renderFunction === 'function') {
                item.renderFunction(className);
            }
        });
    }

    function testFunction() {
        console.log('WORKING')
    }

    function getData() {
        console.log('Searching for data');

        // Define the parameters for the query
        var data = {
            resource_id: 'a7a8fff9-2478-479a-9dd9-53fc5cde7ce3', // Resource ID of the dataset
            limit: 5 // Limit the results to 5 entries
            // Add more parameters here if needed (e.g., q for search terms)
        };

        // Make the request using jQuery's $.ajax
        $.ajax({
            url: 'https://data.gov.lv/dati/lv/api/3/action/datastore_search', // API URL
            type: 'GET', // HTTP method (GET request)
            data: data, // Pass the data object with parameters
            dataType: 'json', // Expect a JSON response
            success: function (response) {
                console.log(response); // Logs the API response
                // You can now use the `response` data for further processing (e.g., display it in the UI)
            },
            error: function (xhr, status, error) {
                console.error('Error fetching data:', error); // Log any errors
            },
            complete: function () {
                console.log('Search complete'); // Runs after the request completes (success or failure)
            }
        });
    }



    getData();
    createVisualizationElements(dataVisualization);

});