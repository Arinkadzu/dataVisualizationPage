import * as Plot from "../lib/plot/plot.min.js";

export function renderPlot(selector, type, dataPromise) {

    dataPromise.then(chartData => {
        const plot = Plot.rectY({length: 10000}, Plot.binX({y: "count"}, {x: Math.random})).plot();
        const div = document.querySelector(`.${selector}`);
        div.append(plot);
    }).catch(error => console.error("Error loading data:", error));
}
