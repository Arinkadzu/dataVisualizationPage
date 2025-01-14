import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm"; 

export function renderPlot(selector, type, dataPromise) {
    const container = document.querySelector(`.${selector}`);

    dataPromise
        .then(data => {

            const filteredData = data.slice(-10);

            const plot = Plot.plot({
                marks: [
                    Plot.line(filteredData, { x: "year", y: "value", stroke: "blue" }),
                    Plot.dot(filteredData, { x: "year", y: "value", fill: "blue" })
                ],
                x: { 
                    label: "Gads", 
                    grid: true,
                    tickFormat: (d) => d.toString()
                },
                y: { 
                    label: "Laulību skaits uz 1 000 iedzīvotāju", 
                    grid: true 
                },
                height: 400,
                width: 600
            });

            container.innerHTML = '';
            container.appendChild(plot);
        })
        .catch(error => {
            console.error('Error rendering plot:', error);
        });
}

