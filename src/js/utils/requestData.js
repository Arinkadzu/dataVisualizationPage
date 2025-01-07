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
                    url: 'data/NMP.json',
                    dataType: 'json',
                    success: function (data) {
                        if (!data || !data.records || data.records.length === 0) {
                            reject("Invalid data format");
                            return;
                        }

                        console.log('console.log(data);', data);

                        // Функция для извлечения возраста из строки, например "86 gadi" -> 86
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

                        console.log('console.log(ageData);', ageData);

                        resolve({
                            ageData: ageData,
                        });
                    },
                    error: function (xhr, status, error) {
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
