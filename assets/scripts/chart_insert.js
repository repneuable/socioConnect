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
                    const row_monthly = data.avgmonth


                    const formattedData = rows.map(row => ({
                        date: moment(row[1]).format('YYYY-MM'),
                        id: row[0]
                    }));
                    console.log(formattedData)

                    /*
                    In this callback function, an if statement checks if the current month 
                    and year exists in the accumulator object. If it doesn't exist, a new 
                    key is created for the month and year and its value is set to 1. 
                    If it does exist, the value for that month and year is incremented by 1.

                    At the end of the reduce method, the groupedData variable contains 
                    an object where each key represents a month and year, and the value 
                    represents the number of times that month and year appear in the
                    formattedData array.
                    */

                    const groupedData = formattedData.reduce((acc, curr) => {
                        if (!acc[curr.date]) {
                            acc[curr.date] = 1;
                        } else {
                            acc[curr.date]++;
                        }
                        return acc;
                    }, {});

                    console.log(groupedData);


                    // Create the chart
                    const ctx = document.getElementById('myChart').getContext('2d');
                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: Object.keys(groupedData),
                            datasets: [{
                                label: 'Sign Ups',
                                data: Object.values(groupedData),
                                //backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                //borderColor: 'rgba(255, 99, 132, 1)',
                                //borderWidth: 1
                                backgroundColor: 'rgba(126, 49, 128, 0.2)',
                                borderColor: '#7E3180',
                                borderWidth: 3,
                                pointBackgroundColor: '#7E3180',
                                pointBorderColor: '#fff',
                                pointBorderWidth: 2,
                                pointRadius: 5,
                                pointHoverRadius: 7,
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true,
                                        ticks: {
                                        font: {
                                            weight: 'bold',
                                                size: 14,
                                                    color: '#7E3180'
                                        }
                                    }
                                },
                                x: {
                                    ticks: {
                                        font: {
                                            weight: 'bold',
                                                size: 14,
                                                    color: '#7E3180'
                                        }
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            weight: 'bold',
                                                size: 16,
                                                    color: '#7E3180'
                                        }
                                    }
                                }
                            }
                        }
                    });
                    // Use backticks for accessing the variables
                    document.getElementById('row-count').innerHTML = `Monthly Sign Ups: ${row_monthly}<br> Total # of Users: ${row_count}`

                });
        });
    });
});


