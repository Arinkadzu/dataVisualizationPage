import { renderChart } from '../js/dataVisualization/chartJS.js'
import { getData } from '../js/utils/requestData.js'

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
        chartJSbar: {
            selector: 'chartJS-bar',
            title: 'NMP',
            renderFunction: renderChart,
            type: 'line',
            data: getData('NMP'),
            question: 'Navādi salidzinājas NMP sniegšanā. Kurš novāds ir labākais no visiem?'
        },
        chartJSdoughnut: {
            selector: 'chartJS--doughnut',
            title: 'Izglītojamo skaits uz 01.01.2024',
            renderFunction: renderChart,
            type: 'doughnut',
            data: getData('students'),
            question: 'Kura kursā ir visvairāk studentus? kā jūs to uzzinājat?'
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
                item.renderFunction(className,item.type,item.data);
            }
        });
    }

    function testFunction() {
        console.log('WORKING')
    }

    //function getData() {

        //TRY for api data.gov.lv
        // Define the parameters for the query
        // var data = {
        //     resource_id: 'a7a8fff9-2478-479a-9dd9-53fc5cde7ce3', // Resource ID of the dataset
        //     limit: 100 // Limit the results to 5 entries
        // };

        // console.log('Searching for data');

        // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL
        // const url = `https://data.gov.lv/dati/lv/api/3/action/datastore_search?resource_id=${data.resource_id}&limit=${data.limit}`;

        // fetch(proxyUrl + url) // Prepend the proxy URL to the API request
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data); // Logs the data from the API
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });

        //Local request:
        
    //}
    createVisualizationElements(dataVisualization);

});