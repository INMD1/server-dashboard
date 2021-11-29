const cpuuasge = document.getElementById('usage').getContext('2d');
const cpuclock = document.getElementById('clock').getContext('2d');

const labelss = ['10s', '20s', '30s', '40s', '50s', '60s'];

const cpu_clock_config = {
  type: 'line',
  data: {
    labels: labelss,
    datasets: [{
        label: 'send',
        borderColor: 'rgb(15 , 76, 129)',
        data: [30, 40, 10, 0, 26, 30, 45],
      },{
      label: 'reception',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
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
  }
};


const usagedraw = new Chart(cpuclock, cpu_clock_config);
const clockdraw = new Chart(cpuuasge, cpuu_asge_config);