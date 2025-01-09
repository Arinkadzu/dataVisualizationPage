export function getData(type) {
    return new Promise((resolve, reject) => {
        switch (type) {
            case 'chartJS':
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
            case 'd3':
                $.ajax({
                    url: 'data/NMP.json',
                    dataType: 'json',
                    success: function (data) {
                        if (!data || !data.records || data.records.length === 0) {
                            reject("Invalid data format");
                            return;
                        }

                        function extractAge(ageString) {
                            return parseInt(ageString, 10);
                        }

                        const age_0_18 = data.records.filter(record => {
                            const age = extractAge(record[4]);
                            return age >= 0 && age <= 18;
                        }).reduce((sum, record) => sum + record[5], 0);

                        const age_19_35 = data.records.filter(record => {
                            const age = extractAge(record[4]);
                            return age >= 19 && age <= 35;
                        }).reduce((sum, record) => sum + record[5], 0);

                        const age_36_60 = data.records.filter(record => {
                            const age = extractAge(record[4]);
                            return age >= 36 && age <= 60;
                        }).reduce((sum, record) => sum + record[5], 0);

                        const age_60_plus = data.records.filter(record => {
                            const age = extractAge(record[4]);
                            return age > 60;
                        }).reduce((sum, record) => sum + record[5], 0);

                        const ageData = [
                            { label: "Vecums 0-18", value: age_0_18 },
                            { label: "Vecums 19-35", value: age_19_35 },
                            { label: "Vecums 36-60", value: age_36_60 },
                            { label: "Vecums 60+", value: age_60_plus }
                        ];

                        resolve({
                            ageData: ageData,
                        });
                    },
                    error: function (xhr, status, error) {
                        reject(error);
                    }
                });
                break;
            case 'plot':
                $.ajax({
                    url: 'data/laulibas.csv',
                    success: function (data) {

                        const dataPromise = new Promise((resolve, reject) => {
                            try {
                                const rows = data.trim().split('\n').slice(1);

                                const parsedData = rows.map(row => {
                                    const [year, value] = row.split(';').map(item => item.trim().replace(/"/g, ''));

                                    const numericYear = parseInt(year, 10);
                                    const numericValue = parseFloat(value);

                                    if (isNaN(numericYear) || isNaN(numericValue)) {
                                        return null;
                                    }

                                    return {
                                        year: numericYear,
                                        value: numericValue
                                    };
                                }).filter(item => item !== null);

                                resolve(parsedData);
                            } catch (error) {
                                console.error('Error parsing data:', error);
                                reject(error);
                            }
                        });

                        resolve(dataPromise);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error loading data:', error);
                    }
                });
                break;
            case 'apexChart':
                $.ajax({
                    url: 'data/NMP_Novadi.json',
                    dataType: 'json',
                    success: function (data) {
                        const sortedData = data.records.sort((a, b) => b[3] - a[3]);
                        const top10 = sortedData.slice(0, 10);
            
                        const chartData = {
                            categories: top10.map(item => item[1]),
                            values: top10.map(item => item[3])
                        };
            
                        const dataPromise = new Promise((resolve, reject) => {
                            try {
                                resolve(chartData);
                            } catch (error) {
                                console.error('Error parsing data:', error);
                                reject(error);
                            }
                        });

                        resolve(dataPromise);
                    },
                    error: function (xhr, status, error) {
                        console.error('Error loading data:', error);
                    }
                });
                break;

            default:
                console.log("Invalid request");
                reject("Invalid data type");
        }
    });
}
