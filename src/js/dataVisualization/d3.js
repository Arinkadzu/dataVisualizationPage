import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function renderD3(selector, type, dataPromise) {
    const ctx = document.querySelector(`.${selector}`);
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create a container for the chart
    const svg = d3.select(ctx)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    dataPromise.then(data => {
        // Define the color scale
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.label))
            .range(d3.schemeCategory10);

        // Compute the pie
        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(radius * 0.5) // Inner radius for doughnut
            .outerRadius(radius);

        // Join the data
        const slices = svg.selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.label))
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        // Add labels
        svg.selectAll("text")
            .data(pie(data))
            .enter()
            .append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#fff")
            .text(d => d.data.label);
        console.log(data);
    }).catch(error => console.error("Error loading data:", error));
}
