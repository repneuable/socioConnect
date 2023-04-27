// Get the CSV data
$(document).ready(function () {
    $('#loadChart').click(function () {
        $('#chartContainer').load('static/assets/chart.html', function () {
            fetch('/get-data')
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const rows = data.rows
                    const row_count = data.count

                    /*
                    const formattedData = rows.map(row => ({
                        date: row[1],
                        id: row[0]
                    }));
                    console.log(formattedData)
                    */

                    const formattedData = rows.map(row => ({
                        date: moment(row[1]).format('YYYY-MM'),
                        id: row[0]
                    }));
                    console.log(formattedData)

                    const groupedData = formattedData.reduce((acc, curr) => {
                        if (!acc[curr.date]) {
                            acc[curr.date] = 1;
                        } else {
                            acc[curr.date]++;
                        }
                        return acc;
                    }, {});

                    console.log(groupedData);
                    /*
                    // Create the chart
                    const ctx = document.getElementById('myChart').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: formattedData.map(row => row.date),
                            datasets: [{
                                label: 'Sign Ups',
                                data: formattedData.map(row => row.id),
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });


                    */


                    // Create the chart
                    const ctx = document.getElementById('myChart').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: Object.keys(groupedData),
                            datasets: [{
                                label: 'Sign Ups',
                                data: Object.values(groupedData),
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });
                    document.getElementById('row-count').innerText = `Total Sign Ups: ${row_count}`
                });
        });
    });
});


/* OLD EXAMPLE 1
$(document).ready(function () {
    $('#loadChart').click(function () {
        $('#chartContainer').load('static/assets/chart.html', function () {
            const salesData = [100, 200, 150, 300, 250, 400, 350, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250];
            const donationsData = [50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625];

            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Sales',
                        data: salesData,
                        borderColor: 'blue',
                        fill: false
                    }, {
                        label: 'Donations',
                        data: donationsData,
                        borderColor: 'green',
                        fill: false
                    }]
                }
            });
        });
    });
});*/

/* OLD VERSION 2

// Get the CSV data
fetch('/get-data')
.then(response => response.text())
.then(data => {

*/

/*
// Parse CSV data into arrays for Chart.js
const salesData = [];
const donationsData = [];
const rows = data.split('\n');
rows.forEach(row => {
    const values = row.split(',');
    salesData.push(parseInt(values[0]));
    donationsData.push(parseInt(values[1]));
});
*/

/*
// Create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.map(row => row.date),
        datasets: [{
            label: 'Sign Ups',
            data: data.map(row => row.id),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
});
*/
