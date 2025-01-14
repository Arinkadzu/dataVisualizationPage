export function renderPlotly(selector, type, dataPromise) {
    const container = document.querySelector(`.${selector}`);

    dataPromise
        .then(courseData => {
            const trace = {
                x: ["1. kurss", "2. kurss", "3. kurss", "4. kurss"],
                y: [courseData.course1, courseData.course2, courseData.course3, courseData.course4],
                type: "bar",
                marker: {
                    color: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]
                },
            };

            const layout = {
                xaxis: { title: "Kursi" },
                yaxis: { title: "Studentu skaits" },
                width: 800,
                height: 500,
            };

            Plotly.newPlot(container, [trace], layout);

        })
        .catch(error => console.error('Error loading data:', error));
}
