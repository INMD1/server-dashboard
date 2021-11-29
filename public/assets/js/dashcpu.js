const cpuuasge = document.getElementById('usage').getContext('2d');
const cpuclock = document.getElementById('clock').getContext('2d');

const labelss = ['10s', '20s', '30s', '40s', '50s', '60s'];

const cpu_clock_config = {
  type: 'line',
  data: {
    labels: labelss,
    datasets: [{
      label: 'clock 0',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: 'clock 1',
      borderColor: 'rgb(255, 213, 0)',
      data: [10, 30, 25, 12, 40, 43, 25],
    },
    {
      label: 'clock 2',
      borderColor: 'rgb(0,212,255)',
      data: [5, 80, 20, 60, 40, 10, 5],
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
  }
};

const cpuu_asge_config = {
  type: 'line',
  data: {
    labels: labelss,
    datasets: [{
      label: 'cpu use (%)',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {

    }
  }
};


const usagedraw = new Chart(cpuclock, cpu_clock_config);
const clockdraw = new Chart(cpuuasge, cpuu_asge_config);