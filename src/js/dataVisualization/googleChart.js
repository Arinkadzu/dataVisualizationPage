export function renderGoogleChart(selector, type, dataPromise) {
    const container = document.querySelector(`.${selector}`);

    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(() => {
        dataPromise
            .then(data => {
                const googleChartData = [['Pašvaldība', 'Studentu skaits', 'Procentuālais daudzums']];
                data.labels.forEach((label, index) => {
                    googleChartData.push([label, data.studentCounts[index], parseFloat(data.percentages[index])]);
                });

                const dataTable = google.visualization.arrayToDataTable(googleChartData);

                const options = {
                    legend: 'none',
                    pieSliceText: 'label',
                    pieStartAngle: 100,
                    slices: { 0: { offset: 0.1 }, 1: { offset: 0.1 } }, 
                    chartArea: { width: '90%', height: '90%' },
                    width: 800, 
                    height: 400,
                };

                const chart = new google.visualization.PieChart(container);
                chart.draw(dataTable, options);
            })
            .catch(error => console.error('Error loading data:', error));
    });
}
