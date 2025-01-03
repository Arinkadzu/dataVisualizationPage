export function getData(type) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'students':
                $.ajax({
                    url: 'data/latvian_students.json',
                    dataType: 'json',
                    success: function (data) {
                        // Index of needed data
                        const novadsIndex = data.fields.findIndex(field => field.id === "Pašvaldība");
                        const totalStudentsIndex = data.fields.findIndex(field => field.id === "Izglītojamo skaits kopā (1.-4.kurss)");

                        // Group data of NOVADS and summarize count of students
                        const novadsData = data.records.reduce((acc, record) => {
                            const novads = record[novadsIndex];
                            const studentCount = record[totalStudentsIndex] || 0; // Учитываем возможные пустые значения
                            acc[novads] = (acc[novads] || 0) + studentCount;
                            return acc;
                        }, {});

                        // Prepare data for graphs
                        const labels = Object.keys(novadsData); // Unique NOVADS
                        const studentCounts = Object.values(novadsData); // Total count of students

                        const chartData = {
                            labels: labels,
                            data: studentCounts
                        };

                        // Resolve the Promise with chart data
                        resolve(chartData);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error loading student data:', error);
                        reject(error);
                    }
                });
                break;
            case 'students-d3':
                $.ajax({
                    url: 'data/latvian_students.json',
                    dataType: 'json',
                    success: function (data) {
                        const labels = data.fields.slice(12, 17).map(item => item.id);
                        const studentCounts = data.records[29].slice(12, 17);

                        const chartData = labels.map((label, i) => ({
                            label: label,
                            value: studentCounts[i]
                        }));

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
