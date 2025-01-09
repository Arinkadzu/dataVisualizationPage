export function renderApexChart(selector, type, dataPromise) {
    const container = document.querySelector(`.${selector}`);

    dataPromise
        .then(data => {
            
            const chart = new ApexCharts(container, {
                chart: {
                    type: 'bar',
                    height: 350
                },
                series: [{
                    name: 'Veiksmīgo uzdevumu skaits',
                    data: data.values
                }],
                xaxis: {
                    categories: data.categories
                },
                plotOptions: {
                    bar: {
                        distributed: true 
                    }
                },
            });

            chart.render();
        })
        .catch(error => {
            console.error('Error rendering plot:', error);
        });
}

