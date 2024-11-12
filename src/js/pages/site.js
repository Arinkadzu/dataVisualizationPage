import { renderChart } from '../js/dataVisualization/chartJS.min.js'
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
            renderFunction: renderChart
        },
        chratJS2: {
            selector: 'chartJS2',
            renderFunction: testFunction
        }
    }
    
    
    function createVisualizationElements(data) {
        const mainContainer = document.getElementById("main");
    
        Object.values(data).forEach(item => {
            // Create the outer wrapper
            const wrapper = document.createElement("div");
            wrapper.className = "data-visualization__wrapper";
    
            // Create the inner visualization div with a unique class name
            const visualizationDiv = document.createElement("div");
            const className = `js-visualization-${item.selector}`;
            visualizationDiv.className = className;
    
            // Append the inner div to the wrapper, and the wrapper to the main container
            wrapper.appendChild(visualizationDiv);
            mainContainer.appendChild(wrapper);
    
            // Call the specific rendering function for this visualization
            if (typeof item.renderFunction === 'function') {
                item.renderFunction(className);
            }
        });
    }

    function testFunction(){
        console.log('TEST')
    }

    createVisualizationElements(dataVisualization);

});