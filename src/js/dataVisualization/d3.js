import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function renderD3(selector, type, dataPromise) {
    const ctx = document.querySelector(`.${selector}`);
    const width = 800;
    const height = 500;

    const margin = { top: 40, right: 40, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(ctx)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const pastelColors = [
        "#a8dadc", "#ffb3ba", "#c0f0c0", "#fef2c7", "#ffd6a5", 
        "#b8c6ff", "#ff9a8b", "#ff77b6", "#d4fc79", "#f0e1a3"
    ];

    const color = d3.scaleOrdinal(pastelColors);

    const xScale = d3.scaleBand().padding(0.1);
    const yScale = d3.scaleLinear();

    dataPromise.then(data => {
        if (!data || !data.ageData || data.ageData.length === 0) {
            console.error("Data is not properly formatted or empty");
            return;
        }

        const ageData = data.ageData;

        if (ageData.some(d => d.value === undefined || d.value === null)) {
            console.error("Invalid data in ageData:", ageData);
            return;
        }

        xScale.domain(ageData.map(d => d.label)).range([0, innerWidth]);
        yScale.domain([0, d3.max(ageData, d => d.value)]).range([innerHeight, 0]);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));

        svg.selectAll(".bar")
            .data(ageData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.label))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.value))
            .attr("fill", (d, i) => color(i));

        svg.selectAll(".text")
            .data(ageData)
            .enter()
            .append("text")
            .attr("class", "text")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.value) - 10)
            .attr("text-anchor", "middle")
            .text(d => d.value);
    }).catch(error => console.error("Error loading data:", error));
}

