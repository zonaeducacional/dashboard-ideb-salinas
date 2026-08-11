/**
 * Lógica Principal da Aplicação - Dashboard de Proficiência
 */

window.currentFilters = {
  etapa: "AI",        
  escolaId: ""        
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  populateEscolaSelect();
  setupEventListeners();
  updateDashboard();
}

function setupEventListeners() {
  const etapaSelect = document.getElementById('etapa');
  if (etapaSelect) {
    etapaSelect.addEventListener('change', (e) => {
      window.currentFilters.etapa = e.target.value;
      populateEscolaSelect();
      updateDashboard();
    });
  }



  const escolaSelect = document.getElementById('escola');
  if (escolaSelect) {
    escolaSelect.addEventListener('change', (e) => {
      window.currentFilters.escolaId = e.target.value;
      updateDashboard();
    });
  }
}

function populateEscolaSelect() {
  const escolaSelect = document.getElementById('escola');
  if (!escolaSelect) return;

  const etapa = window.currentFilters.etapa;

  const escolasFiltradas = IDEB_DATA.escolas.filter(e => {
    if (!e.etapas.includes(etapa)) return false;
    return true;
  });

  const currentVal = window.currentFilters.escolaId;

  escolaSelect.innerHTML = `<option value="">Selecione uma escola (${escolasFiltradas.length} disponíveis)</option>`;
  escolasFiltradas.sort((a,b) => a.nome.localeCompare(b.nome)).forEach(e => {
    const opt = document.createElement('option');
    opt.value = e.id;
    opt.textContent = `${e.nome} (${e.rede.toUpperCase()})`;
    escolaSelect.appendChild(opt);
  });

  if (escolasFiltradas.some(e => e.id === currentVal)) {
    escolaSelect.value = currentVal;
  } else {
    window.currentFilters.escolaId = "";
    escolaSelect.value = "";
  }
}

function updateDashboard() {
  renderMunicipioView();
  renderEscolaView();
  
  if (typeof renderCharts === 'function') {
    renderCharts();
  }
}

function getLatestData(serie) {
  if (!serie || serie.length === 0) return null;
  const sorted = [...serie].sort((a, b) => b.ano - a.ano);
  return sorted[0]; // Gets 2025 or whatever is latest
}

// -------------------------------------------------------------
// VISÃO DO MUNICÍPIO
// -------------------------------------------------------------
function renderMunicipioView() {
  const etapa = window.currentFilters.etapa;
  const serieMun = IDEB_DATA.municipioSerie[etapa] || [];
  
  // 1. Render KPIs Município
  const kpiContainer = document.getElementById("kpis-municipio");
  const latest = getLatestData(serieMun);
  
  if (kpiContainer) {
    let portStr = latest && latest.port ? latest.port.toFixed(1) : '-';
    let matStr = latest && latest.mat ? latest.mat.toFixed(1) : '-';
    
    kpiContainer.innerHTML = `
      <div class="kpi-card" style="border-left-color: var(--color-burgundy);">
        <div class="kpi-label" style="color: var(--color-burgundy);">Língua Portuguesa (2025)</div>
        <div class="kpi-value" style="color: var(--color-purple);">${portStr}</div>
      </div>
      <div class="kpi-card" style="border-left-color: var(--color-teal);">
        <div class="kpi-label" style="color: var(--color-teal);">Matemática (2025)</div>
        <div class="kpi-value" style="color: var(--color-purple);">${matStr}</div>
      </div>
    `;
  }

  // 2. Render Tabela Município
  const tableContainer = document.getElementById("tabela-municipio");
  if (tableContainer) {
    let rowsHtml = [...serieMun].sort((a,b) => b.ano - a.ano).map(r => {
      const classPort = typeof getSaebClassification === 'function' ? getSaebClassification(r.port, 'port', etapa) : { nivel: '-', sintese: '-' };
      const classMat = typeof getSaebClassification === 'function' ? getSaebClassification(r.mat, 'mat', etapa) : { nivel: '-', sintese: '-' };
      return `
        <tr>
          <td><b>${r.ano}</b></td>
          <td style="color: var(--color-burgundy); font-weight: bold; font-size: 1.05em;">${r.port ? r.port.toFixed(1) : '-'}</td>
          <td>
            <div style="font-weight: bold; color: #444; font-size: 0.85em;">${classPort.nivel}</div>
            <div style="font-size: 0.75em; color: #777; max-width: 200px; line-height: 1.2; margin-top: 2px;">${classPort.sintese}</div>
          </td>
          <td style="color: var(--color-teal); font-weight: bold; font-size: 1.05em;">${r.mat ? r.mat.toFixed(1) : '-'}</td>
          <td>
            <div style="font-weight: bold; color: #444; font-size: 0.85em;">${classMat.nivel}</div>
            <div style="font-size: 0.75em; color: #777; max-width: 200px; line-height: 1.2; margin-top: 2px;">${classMat.sintese}</div>
          </td>
          <td style="font-weight: 500;">${r.ideb ? r.ideb.toFixed(1) : '-'}</td>
          <td style="font-weight: 500;">${r.fluxo ? (r.fluxo * 100).toFixed(0) + '%' : '-'}</td>
        </tr>
      `;
    }).join('');

    tableContainer.innerHTML = `
      <div class="table-responsive">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Ano</th>
              <th>Port. (SAEB)</th>
              <th>Avaliação Port.</th>
              <th>Mat. (SAEB)</th>
              <th>Avaliação Mat.</th>
              <th>IDEB</th>
              <th>Aprov.</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="5">Sem dados</td></tr>'}
          </tbody>
        </table>
      </div>
    `;
  }
}

// -------------------------------------------------------------
// VISÃO DA ESCOLA
// -------------------------------------------------------------
function renderEscolaView() {
  const container = document.getElementById("view-escola");
  if (!container) return;

  const escolaId = window.currentFilters.escolaId;
  const etapa = window.currentFilters.etapa;

  if (!escolaId) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--color-burgundy);">
        <i class="fas fa-school" style="font-size: 3rem; margin-bottom: 1rem; color: var(--color-teal);"></i>
        <h3>Nenhuma escola selecionada</h3>
        <p>Selecione uma escola no menu lateral para visualizar os dados detalhados e comparar com a rede.</p>
      </div>
    `;
    return;
  }

  const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
  if (!escola || !escola.dados[etapa]) return;

  // Convert object { "2025": {...} } to array [{ano: 2025, ...}]
  const serieEsc = Object.keys(escola.dados[etapa]).map(ano => ({ ano: parseInt(ano), ...escola.dados[etapa][ano] }));
  const latest = getLatestData(serieEsc);

  let portStr = latest && latest.port ? latest.port.toFixed(1) : '-';
  let matStr = latest && latest.mat ? latest.mat.toFixed(1) : '-';

  let rowsHtml = [...serieEsc].sort((a,b) => b.ano - a.ano).map(r => {
    const classPort = typeof getSaebClassification === 'function' ? getSaebClassification(r.port, 'port', etapa) : { nivel: '-', sintese: '-' };
    const classMat = typeof getSaebClassification === 'function' ? getSaebClassification(r.mat, 'mat', etapa) : { nivel: '-', sintese: '-' };
    return `
    <tr>
      <td><b>${r.ano}</b></td>
      <td style="color: var(--color-burgundy); font-weight: bold; font-size: 1.05em;">${r.port ? r.port.toFixed(1) : '-'}</td>
      <td>
        <div style="font-weight: bold; color: #444; font-size: 0.85em;">${classPort.nivel}</div>
        <div style="font-size: 0.75em; color: #777; max-width: 200px; line-height: 1.2; margin-top: 2px;">${classPort.sintese}</div>
      </td>
      <td style="color: var(--color-teal); font-weight: bold; font-size: 1.05em;">${r.mat ? r.mat.toFixed(1) : '-'}</td>
      <td>
        <div style="font-weight: bold; color: #444; font-size: 0.85em;">${classMat.nivel}</div>
        <div style="font-size: 0.75em; color: #777; max-width: 200px; line-height: 1.2; margin-top: 2px;">${classMat.sintese}</div>
      </td>
      <td style="font-weight: 500;">${r.ideb ? r.ideb.toFixed(1) : '-'}</td>
      <td style="font-weight: 500;">${r.fluxo ? (r.fluxo * 100).toFixed(0) + '%' : '-'}</td>
    </tr>
  `}).join('');

  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">${escola.nome}</h2>
      <p class="section-subtitle">${escola.localidade} • INEP: ${escola.inep} • <span class="badge badge-${escola.rede}">${escola.rede.toUpperCase()}</span></p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card" style="border-left-color: var(--color-burgundy);">
        <div class="kpi-label" style="color: var(--color-burgundy);">Língua Portuguesa (2025)</div>
        <div class="kpi-value" style="color: var(--color-purple);">${portStr}</div>
      </div>
      <div class="kpi-card" style="border-left-color: var(--color-teal);">
        <div class="kpi-label" style="color: var(--color-teal);">Matemática (2025)</div>
        <div class="kpi-value" style="color: var(--color-purple);">${matStr}</div>
      </div>
    </div>

    <div class="chart-container">
      <canvas id="grafico_escola"></canvas>
    </div>

    <h3 style="color: var(--color-purple); margin-bottom: 1rem;">Série Histórica (Escola)</h3>
    <div class="table-responsive">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Ano</th>
            <th>Port. (SAEB)</th>
            <th>Avaliação Port.</th>
            <th>Mat. (SAEB)</th>
            <th>Avaliação Mat.</th>
            <th>IDEB</th>
            <th>Aprov.</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="5">Sem dados</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}


