const cpu = document.getElementById('cpuchart').getContext('2d');
const ctx = document.getElementById('myChart').getContext('2d');
const ctx1 = document.getElementById('myChart1').getContext('2d');
const ram = document.getElementById('ramchart').getContext('2d');
/*setInterval(() => {
    const data = ramconifg.data.datasets[0].data;
    let a = Math.floor(Math.random() * 100);
    data[0] = a
    data[1] = (100-a)
    ramchart.update();

    const data1 = cpuconfig.data.datasets[0].data;
    let cpu = Math.floor(Math.random() * 100);
    data1[0] = cpu
    data1[1] = (100-cpu)
    cpuchart.update();
}, 5000);*/

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
        datasets: [{
            label: "send",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            responsive: false,
            y: {
                beginAtZero: true
            }
        }
    }
});
const myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['10s', '20s', '30s', '40s', '50s', '60s'],
        datasets: [{
            label: "reception",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            responsive: false,
            y: {
                beginAtZero: true
            }
        }
    }
});

// cpu 차트 설정
const cpuconfig = {
    type: 'doughnut',
    data: {
        labels: ['Uase', 'Free'],
        datasets: [{
            label: "reception",
            data: [10, 20],
            backgroundColor: [
                'rgb(255, 205, 86)',
                'rgb(255, 99, 132)',
                ],
            borderColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderWidth: 1
        }]
    }
}

// 램 차트 설정
const ramconifg = {
    type: 'doughnut',
    data: {
        labels: ['Uase', 'Free'],
        datasets: [{
            label: "reception",
            data: [60, 40],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 0.2)'
            ],
            borderWidth: 1
        }]
    },
}

const cpuchart = new Chart(cpu, cpuconfig);
const ramchart = new Chart(ram , ramconifg);