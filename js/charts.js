let chartMunicipio = null;
let chartEscola = null;

function renderCharts() {
  const etapa = window.currentFilters.etapa;
  
  // 1. Chart Município
  const munCanvas = document.getElementById("grafico_municipio");
  if (munCanvas) {
    const ctx = munCanvas.getContext("2d");
    const dadosMun = IDEB_DATA.municipioSerie[etapa] || [];
    const anosMun = dadosMun.map(d => d.ano).sort((a,b)=>a-b);
    
    if (chartMunicipio) chartMunicipio.destroy();
    chartMunicipio = createChart(ctx, anosMun, dadosMun, "Município");
  }

  // 2. Chart Escola
  const escolaId = window.currentFilters.escolaId;
  const escCanvas = document.getElementById("grafico_escola"); // Will be created in app.js
  
  if (escCanvas && escolaId) {
    const ctx = escCanvas.getContext("2d");
    const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
    let dadosEsc = [];
    if (escola && escola.dados[etapa]) {
      dadosEsc = Object.keys(escola.dados[etapa]).sort().map(ano => {
        return { ano: parseInt(ano), ...escola.dados[etapa][ano] };
      });
    }
    const anosEsc = dadosEsc.map(d => d.ano).sort((a,b)=>a-b);
    
    if (chartEscola) chartEscola.destroy();
    chartEscola = createChart(ctx, anosEsc, dadosEsc, escola ? escola.nome : "Escola");
  }
}

function createChart(ctx, anos, dadosAtuais, labelEntidade) {
  const portData = anos.map(ano => {
    const d = dadosAtuais.find(x => x.ano === ano);
    return d && d.port ? d.port : null;
  });
  const matData = anos.map(ano => {
    const d = dadosAtuais.find(x => x.ano === ano);
    return d && d.mat ? d.mat : null;
  });

  const datasets = [
    {
      label: `Língua Portuguesa`,
      data: portData,
      borderColor: "#6e1538", // Burgundy
      backgroundColor: "rgba(110, 21, 56, 0.1)",
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: "#6e1538",
      tension: 0.3,
      fill: false
    },
    {
      label: `Matemática`,
      data: matData,
      borderColor: "#6b9795", // Teal
      backgroundColor: "rgba(107, 151, 149, 0.1)",
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: "#6b9795",
      tension: 0.3,
      fill: false
    }
  ];

  return new Chart(ctx, {
    type: "line",
    data: {
      labels: anos,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: "'Outfit', sans-serif", size: 13, weight: '500' },
            usePointStyle: true,
            padding: 15,
            color: '#594461'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(89, 68, 97, 0.95)',
          titleFont: { family: "'Outfit', sans-serif", size: 14, weight: 'bold' },
          bodyFont: { family: "'Outfit', sans-serif", size: 13 },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += context.parsed.y.toFixed(1);
              } else {
                label += 'Sem nota';
              }
              if (context.label === '2021') {
                label += ' (Pandemia)';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: "'Outfit', sans-serif", size: 12 }, color: '#594461' }
        },
        y: {
          min: 150, 
          max: 350,
          ticks: {
            stepSize: 20,
            font: { family: "'Outfit', sans-serif", size: 12 },
            color: '#594461'
          },
          grid: { color: 'rgba(89, 68, 97, 0.1)' },
          title: {
            display: true,
            text: 'Proficiência no SAEB (Escala)',
            font: { family: "'Outfit', sans-serif", size: 13, weight: '600' },
            color: '#6e1538'
          }
        }
      }
    }
  });
}
