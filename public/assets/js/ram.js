const ramusage = document.getElementById('ramusage').getContext('2d');

const labelss = ['10s', '20s', '30s', '40s', '50s', '60s'];


const config = {
    type: 'line',
    data: {
        labels: labelss,
        datasets: [{
            label: 'Usage',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
            label: 'Free',
            borderColor: 'rgb(255, 213, 0)',
            data: [10, 30, 25, 12, 40, 43, 25],
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                },
            }
        }
    }
}

const draw = new Chart(ramusage, config);
