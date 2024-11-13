export function getData(type) {
    return new Promise((resolve, reject) => {
        switch(type) {
            case 'students':
                $.ajax({
                    url: 'data/latvian_students.json',
                    dataType: 'json',
                    success: function (data) {
                        // Extract labels (fields 12 to 16) and student counts for records (columns 12 to 16)
                        const labels = data.fields.slice(12, 17).map(item => item.id);
                        const studentCounts = data.records[29].slice(12, 17);

                        // Prepare the data for the chart
                        const chartData = {
                            labels: labels,
                            data: studentCounts
                        };
                        console.log(type, ' data:', chartData)
                        
                        // Resolve the Promise with chart data
                        resolve(chartData);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error loading student data:', error);
                        reject(error);
                    }
                });
                break;

            case 'NMP':
                console.log('Fetching NPM data...');
                $.ajax({
                    url: 'data/NMP_Novadi.json',
                    dataType: 'json',
                    success: function (data) {
                        const labels = data.records.map(record => record[1]);
                        const counts = data.records.map(record => record[4]);
                        const chartData = {
                            labels: labels,
                            data: counts
                        };
                        console.log(type, ' data:', chartData)
                        resolve(chartData);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error loading NPM data:', error);
                        reject(error);
                    }
                });
                break;

            default:
                console.log("Invalid request");
                reject("Invalid data type");
        }
    });
}
