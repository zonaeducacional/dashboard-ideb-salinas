/**
 * Gerenciamento de Gráficos com Chart.js
 */
let chartInstance = null;

function renderSerieChart() {
  const canvas = document.getElementById("grafico_canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const etapa = window.currentFilters.etapa;
  const escolaId = window.currentFilters.escolaId;

  // Dados consolidados do município para a etapa
  const municipioDados = IDEB_DATA.municipioSerie[etapa] || [];
  const anos = municipioDados.map(d => d.ano);
  const idebMunicipio = municipioDados.map(d => d.ideb);
  const metasMunicipio = municipioDados.map(d => d.meta);

  const datasets = [
    {
      label: "Município (Salinas da Margarida)",
      data: idebMunicipio,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      borderWidth: 3,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointBackgroundColor: "#2563eb",
      tension: 0.3,
      fill: true
    }
  ];

  // Se houver escola selecionada, adicionar a série da escola
  if (escolaId) {
    const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
    if (escola && escola.dados[etapa]) {
      const escolaSerie = anos.map(ano => {
        const d = escola.dados[etapa][ano];
        return d ? d.ideb : null;
      });

      datasets.push({
        label: `Escola: ${escola.nome}`,
        data: escolaSerie,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        borderWidth: 3,
        pointStyle: 'rectRot',
        pointRadius: 7,
        pointHoverRadius: 9,
        pointBackgroundColor: "#10b981",
        tension: 0.3
      });
    }
  }

  // Linha de metas (se aplicável)
  const temMeta = metasMunicipio.some(m => m !== null);
  if (temMeta) {
    datasets.push({
      label: "Meta Projetada (Ciclo 1º)",
      data: metasMunicipio,
      borderColor: "#94a3b8",
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 3,
      pointBackgroundColor: "#94a3b8",
      fill: false
    });
  }

  // Destacar 2021 (Pandemia)
  const pointBackgroundColors = anos.map((ano, idx) => {
    if (ano === 2021) return "#ef4444"; // Vermelho para alerta de pandemia
    return "#2563eb";
  });

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
            font: { family: "'Inter', sans-serif", size: 12, weight: '500' },
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleFont: { family: "'Inter', sans-serif", size: 13, weight: 'bold' },
          bodyFont: { family: "'Inter', sans-serif", size: 12 },
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
                label += ' (Edição Pandemia - Aulas remotas)';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: "'Inter', sans-serif", size: 12 } }
        },
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 1,
            font: { family: "'Inter', sans-serif", size: 12 }
          },
          grid: { color: 'rgba(226, 232, 240, 0.6)' },
          title: {
            display: true,
            text: 'Nota IDEB (0 a 10)',
            font: { family: "'Inter', sans-serif", size: 12, weight: '600' }
          }
        }
      }
    }
  });
}
