/**
 * Gerenciamento de Gráficos com Chart.js (Foco em Proficiência SAEB)
 */
let chartInstance = null;

function renderSerieChart() {
  const canvas = document.getElementById("grafico_canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const etapa = window.currentFilters.etapa;
  const escolaId = window.currentFilters.escolaId;

  let dadosAtuais = [];
  let labelEntidade = "";

  if (escolaId) {
    const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
    if (escola && escola.dados[etapa]) {
      labelEntidade = escola.nome;
      // Object.keys preserves order if we just sort them numerically
      dadosAtuais = Object.keys(escola.dados[etapa]).sort().map(ano => {
        return { ano: parseInt(ano), ...escola.dados[etapa][ano] };
      });
    }
  } else {
    labelEntidade = "Município (Salinas da Margarida)";
    dadosAtuais = IDEB_DATA.municipioSerie[etapa] || [];
  }

  // Filtrar apenas anos que realmente existem
  const anos = dadosAtuais.map(d => d.ano).sort((a,b)=>a-b);
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
      label: `Língua Portuguesa (${labelEntidade})`,
      data: portData,
      borderColor: "#3b82f6", // Blue
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#3b82f6",
      tension: 0.3,
      fill: false
    },
    {
      label: `Matemática (${labelEntidade})`,
      data: matData,
      borderColor: "#10b981", // Green
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#10b981",
      tension: 0.3,
      fill: false
    }
  ];

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
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
            color: '#e2e8f0'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
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
          grid: { display: false, color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { font: { family: "'Outfit', sans-serif", size: 12 }, color: '#94a3b8' }
        },
        y: {
          min: 150, // Base proficiency level usually above 150
          max: 350,
          ticks: {
            stepSize: 20,
            font: { family: "'Outfit', sans-serif", size: 12 },
            color: '#94a3b8'
          },
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          title: {
            display: true,
            text: 'Proficiência no SAEB (Escala)',
            font: { family: "'Outfit', sans-serif", size: 13, weight: '600' },
            color: '#cbd5e1'
          }
        }
      }
    }
  });
}
