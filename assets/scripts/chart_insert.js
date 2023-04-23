
// Get the CSV data
fetch('data.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data into arrays for Chart.js
        const salesData = [];
        const donationsData = [];
        const rows = data.split('\n');
        rows.forEach(row => {
            const values = row.split(',');
            salesData.push(parseInt(values[0]));
            donationsData.push(parseInt(values[1]));
        });

        // Create the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
