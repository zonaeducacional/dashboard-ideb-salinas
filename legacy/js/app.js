/**
 * Lógica Principal da Aplicação e Controle de Estado
 */

window.currentFilters = {
  etapa: "AI",        // "AI", "AF", "EM"
  rede: "todas",      // "todas", "publica", "municipal", "estadual"
  escolaId: ""        // ID/INEP da escola selecionada
};

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  populateEscolaSelect();
  setupEventListeners();
  initMap();
  updateDashboard();
}

function setupEventListeners() {
  // Radio buttons de Etapa
  document.querySelectorAll('input[name="etapa"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      window.currentFilters.etapa = e.target.value;
      populateEscolaSelect(); // Atualizar opções de escola para a etapa
      updateDashboard();
    });
  });

  // Select de Rede
  const redeSelect = document.getElementById('rede');
  if (redeSelect) {
    redeSelect.addEventListener('change', (e) => {
      window.currentFilters.rede = e.target.value;
      populateEscolaSelect();
      updateDashboard();
    });
  }

  // Select de Escola
  const escolaSelect = document.getElementById('escola');
  if (escolaSelect) {
    escolaSelect.addEventListener('change', (e) => {
      window.currentFilters.escolaId = e.target.value;
      updateDashboard();
    });
  }

  // Botão Limpar Seleção
  const btnLimpar = document.getElementById('limpar');
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      window.currentFilters.escolaId = "";
      if (escolaSelect) escolaSelect.value = "";
      updateDashboard();
    });
  }

  // Botões de Download CSV
  const btnBaixarLista = document.getElementById('baixar_lista');
  if (btnBaixarLista) {
    btnBaixarLista.addEventListener('click', (e) => {
      e.preventDefault();
      exportListaCSV();
    });
  }

  const btnBaixarSerie = document.getElementById('baixar_serie');
  if (btnBaixarSerie) {
    btnBaixarSerie.addEventListener('click', (e) => {
      e.preventDefault();
      exportSerieCSV();
    });
  }

  // Navegação por Abas
  document.querySelectorAll('#abas a[data-bs-toggle="tab"]').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('#abas a').forEach(a => a.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

      tabBtn.classList.add('active');
      const targetId = tabBtn.getAttribute('href').replace('#', '');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

function populateEscolaSelect() {
  const escolaSelect = document.getElementById('escola');
  if (!escolaSelect) return;

  const etapa = window.currentFilters.etapa;
  const rede = window.currentFilters.rede;

  // Filtrar escolas elegíveis
  const escolasFiltradas = IDEB_DATA.escolas.filter(e => {
    if (!e.etapas.includes(etapa)) return false;
    if (rede !== "todas") {
      if (rede === "publica" && e.rede !== "municipal" && e.rede !== "estadual") return false;
      if (rede !== "publica" && e.rede !== rede) return false;
    }
    return true;
  });

  // Guardar valor atual se ainda válido
  const currentVal = window.currentFilters.escolaId;

  escolaSelect.innerHTML = `<option value="">Todas as escolas (${escolasFiltradas.length})</option>`;
  escolasFiltradas.forEach(e => {
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

function selectEscola(escolaId) {
  window.currentFilters.escolaId = escolaId;
  const escolaSelect = document.getElementById('escola');
  if (escolaSelect) escolaSelect.value = escolaId;
  updateDashboard();
}

function updateDashboard() {
  const etapa = window.currentFilters.etapa;
  const rede = window.currentFilters.rede;
  const escolaId = window.currentFilters.escolaId;

  // 1. Trilha de Navegação (Breadcrumb)
  const trilhaEl = document.getElementById('trilha');
  let etapaNome = "Anos Iniciais (1º ao 5º)";
  if (etapa === "AF") etapaNome = "Anos Finais (6º ao 9º)";
  if (etapa === "EM") etapaNome = "Ensino Médio";

  let redeNome = "Todas as Redes";
  if (rede === "municipal") redeNome = "Rede Municipal";
  if (rede === "estadual") redeNome = "Rede Estadual";
  if (rede === "publica") redeNome = "Rede Pública";

  let escolaNome = escolaId ? (IDEB_DATA.escolas.find(e => e.id === escolaId)?.nome || "") : "Todas as Escolas";

  if (trilhaEl) {
    trilhaEl.innerHTML = `
      <div class="breadcrumb-bar">
        <span class="crumb">Bahia</span>
        <span class="sep"><i class="fas fa-chevron-right"></i></span>
        <span class="crumb">Salinas da Margarida</span>
        <span class="sep"><i class="fas fa-chevron-right"></i></span>
        <span class="crumb">${etapaNome}</span>
        <span class="sep"><i class="fas fa-chevron-right"></i></span>
        <span class="crumb highlight">${escolaNome}</span>
      </div>
    `;
  }

  // 2. Atualizar Titulo do Mapa
  const tituloMapaEl = document.getElementById('titulo_mapa');
  const subMapaEl = document.getElementById('sub_mapa');
  if (tituloMapaEl) tituloMapaEl.textContent = `Salinas da Margarida — ${etapaNome}`;
  if (subMapaEl) subMapaEl.textContent = `Censo Escolar 2025 • ${redeNome}`;

  // 3. Atualizar Marcadores no Mapa
  renderMapMarkers();

  // 4. Calcular e Renderizar KPIs
  renderKPIs();

  // 5. Renderizar Ficha da Escola (se selecionada)
  renderFichaEscola();

  // 6. Atualizar Gráfico da Série Histórica
  renderSerieChart();

  // 7. Atualizar Tabela de Ranking
  renderTabelaRanking();

  // 8. Atualizar Tabela de Dados Completa
  renderTabelaDados();
}

function renderKPIs() {
  const kpisContainer = document.getElementById('kpis');
  if (!kpisContainer) return;

  const etapa = window.currentFilters.etapa;
  const escolaId = window.currentFilters.escolaId;

  let ideb2025 = null;
  let ideb2023 = null;
  let port2025 = null;
  let mat2025 = null;
  let fluxo2025 = null;
  let labelEntidade = "Município de Salinas da Margarida";

  if (escolaId) {
    const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
    if (escola && escola.dados[etapa]) {
      labelEntidade = escola.nome;
      const d2025 = escola.dados[etapa][2025];
      const d2023 = escola.dados[etapa][2023];
      if (d2025) {
        ideb2025 = d2025.ideb;
        port2025 = d2025.port;
        mat2025 = d2025.mat;
        fluxo2025 = d2025.fluxo;
      }
      if (d2023) ideb2023 = d2023.ideb;
    }
  } else {
    // Dados consolidados do município
    const serie = IDEB_DATA.municipioSerie[etapa] || [];
    const d2025 = serie.find(d => d.ano === 2025);
    const d2023 = serie.find(d => d.ano === 2023);
    if (d2025) {
      ideb2025 = d2025.ideb;
      port2025 = d2025.port;
      mat2025 = d2025.mat;
      fluxo2025 = d2025.fluxo;
    }
    if (d2023) ideb2023 = d2023.ideb;
  }

  // Cálculo da variação
  let variacaoHtml = "";
  if (ideb2025 !== null && ideb2023 !== null) {
    const diff = ideb2025 - ideb2023;
    const isUp = diff >= 0;
    const sign = isUp ? "+" : "";
    const colorClass = isUp ? "trend-up" : "trend-down";
    const icon = isUp ? "fa-arrow-up" : "fa-arrow-down";
    variacaoHtml = `<span class="trend-badge ${colorClass}"><i class="fas ${icon}"></i> ${sign}${diff.toFixed(1)} vs 2023</span>`;
  }

  kpisContainer.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card main-kpi" style="border-left-color: #3b82f6">
        <div class="kpi-label">Língua Portuguesa (Saeb 2025)</div>
        <div class="kpi-value-row">
          <span class="kpi-value" style="color: #3b82f6">${port2025 !== null ? port2025.toFixed(1) : '-'}</span>
        </div>
        <div class="kpi-subtext">${labelEntidade}</div>
      </div>

      <div class="kpi-card main-kpi" style="border-left-color: #10b981">
        <div class="kpi-label">Matemática (Saeb 2025)</div>
        <div class="kpi-value-row">
          <span class="kpi-value" style="color: #10b981">${mat2025 !== null ? mat2025.toFixed(1) : '-'}</span>
        </div>
        <div class="kpi-subtext">${labelEntidade}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">IDEB vs Aprovação</div>
        <div class="kpi-dual-metrics">
          <div class="sub-metric">
            <span class="lbl"><i class="fas fa-star text-yellow"></i> IDEB</span>
            <span class="val">${ideb2025 !== null ? ideb2025.toFixed(1) : '-'}</span>
          </div>
          <div class="sub-metric">
            <span class="lbl"><i class="fas fa-check text-emerald"></i> Aprovação</span>
            <span class="val">${fluxo2025 !== null ? (fluxo2025 * 100).toFixed(0) + '%' : '-'}</span>
          </div>
        </div>
        <div class="kpi-subtext">Cuidado com o truque da aprovação</div>
      </div>
    </div>
  `;
}

function renderFichaEscola() {
  const container = document.getElementById('ficha_escola');
  if (!container) return;

  const escolaId = window.currentFilters.escolaId;
  if (!escolaId) {
    container.innerHTML = `
      <div class="alert-info-banner">
        <i class="fas fa-info-circle"></i>
        <span>Exibindo os dados consolidados do **Município de Salinas da Margarida**. Clique em um marcador no mapa ou selecione uma escola na barra lateral para detalhar.</span>
      </div>
    `;
    return;
  }

  const escola = IDEB_DATA.escolas.find(e => e.id === escolaId);
  if (!escola) return;

  container.innerHTML = `
    <div class="escola-card-header">
      <div class="escola-info">
        <span class="badge badge-${escola.rede}">${escola.rede.toUpperCase()}</span>
        <h3 class="escola-title">${escola.nome}</h3>
        <p class="escola-meta">
          <i class="fas fa-map-marker-alt"></i> ${escola.localidade} • 
          <i class="fas fa-fingerprint"></i> INEP: <b>${escola.inep}</b>
        </p>
      </div>
      <button class="btn-clear-selection" onclick="window.currentFilters.escolaId=''; updateDashboard();">
        <i class="fas fa-times"></i> Fechar seleção
      </button>
    </div>
  `;
}

function renderTabelaRanking() {
  const container = document.getElementById('tabela');
  if (!container) return;

  const etapa = window.currentFilters.etapa;
  const rede = window.currentFilters.rede;

  // Filtrar e ordenar escolas que possuem dados na etapa
  const lista = IDEB_DATA.escolas
    .filter(e => {
      if (!e.etapas.includes(etapa)) return false;
      if (rede !== "todas") {
        if (rede === "publica" && e.rede !== "municipal" && e.rede !== "estadual") return false;
        if (rede !== "publica" && e.rede !== rede) return false;
      }
      return true;
    })
    .map(e => {
      const d2025 = e.dados[etapa] ? e.dados[etapa][2025] : null;
      const d2023 = e.dados[etapa] ? e.dados[etapa][2023] : null;
      return {
        id: e.id,
        nome: e.nome,
        rede: e.rede,
        localidade: e.localidade,
        ideb2025: d2025 ? d2025.ideb : -1,
        ideb2023: d2023 ? d2023.ideb : null,
        port: d2025 ? d2025.port : null,
        mat: d2025 ? d2025.mat : null,
        fluxo: d2025 ? d2025.fluxo : null
      };
    })
    .sort((a, b) => (b.port + b.mat) - (a.port + a.mat)); // Sort by total proficiency instead of IDEB

  let rowsHtml = lista.map((item, idx) => {
    const isSelected = window.currentFilters.escolaId === item.id;
    const idebText = item.ideb2025 > 0 ? item.ideb2025.toFixed(1) : "-";

    return `
      <tr class="${isSelected ? 'row-selected' : ''}" onclick="selectEscola('${item.id}')">
        <td class="td-pos"><b>#${idx + 1}</b></td>
        <td class="td-nome">
          <span class="school-name-text">${item.nome}</span>
          <span class="school-sub">${item.localidade}</span>
        </td>
        <td><span class="badge badge-${item.rede}">${item.rede.toUpperCase()}</span></td>
        <td style="color: #3b82f6; font-weight: bold;">${item.port !== null ? item.port.toFixed(1) : '-'}</td>
        <td style="color: #10b981; font-weight: bold;">${item.mat !== null ? item.mat.toFixed(1) : '-'}</td>
        <td>${idebText}</td>
        <td>${item.fluxo !== null ? (item.fluxo * 100).toFixed(0) + '%' : '-'}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="table-responsive">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Escola</th>
            <th>Rede</th>
            <th>Português (SAEB)</th>
            <th>Matemática (SAEB)</th>
            <th>IDEB 2025</th>
            <th>Aprovação</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml || '<tr><td colspan="7" class="text-center">Nenhuma escola encontrada para este filtro.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function renderTabelaDados() {
  const container = document.getElementById('tabela_serie');
  if (!container) return;

  const etapa = window.currentFilters.etapa;

  // Lista com dados históricos consolidados
  let rows = [];
  IDEB_DATA.escolas.forEach(e => {
    if (!e.dados[etapa]) return;
    Object.keys(e.dados[etapa]).forEach(ano => {
      const d = e.dados[etapa][ano];
      rows.push({
        escola: e.nome,
        rede: e.rede,
        ano: ano,
        ideb: d.ideb,
        port: d.port,
        mat: d.mat,
        fluxo: d.fluxo,
        pandemia: d.pandemia ? "Sim (Pandemia)" : "Não"
      });
    });
  });

  // Ordenar por ano desc, depois escola
  rows.sort((a, b) => b.ano - a.ano || a.escola.localeCompare(b.escola));

  let rowsHtml = rows.map(r => `
    <tr>
      <td><b>${r.ano}</b></td>
      <td>${r.escola}</td>
      <td><span class="badge badge-${r.rede}">${r.rede.toUpperCase()}</span></td>
      <td><b>${r.ideb ? r.ideb.toFixed(1) : '-'}</b></td>
      <td>${r.port ? r.port.toFixed(1) : '-'}</td>
      <td>${r.mat ? r.mat.toFixed(1) : '-'}</td>
      <td>${r.fluxo ? (r.fluxo * 100).toFixed(0) + '%' : '-'}</td>
      <td>${r.pandemia}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="table-responsive" style="max-height: 450px; overflow-y: auto;">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Ano</th>
            <th>Escola</th>
            <th>Rede</th>
            <th>IDEB</th>
            <th>Português</th>
            <th>Matemática</th>
            <th>Aprovação</th>
            <th>Contexto</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

function exportListaCSV() {
  const etapa = window.currentFilters.etapa;
  let csv = "Posicao,Escola,Rede,Localidade,IDEB_2025,Saeb_Portugues,Saeb_Matematica,Taxa_Aprovacao\n";

  const lista = IDEB_DATA.escolas
    .filter(e => e.etapas.includes(etapa))
    .map(e => {
      const d = e.dados[etapa] ? e.dados[etapa][2025] : null;
      return {
        nome: `"${e.nome.replace(/"/g, '""')}"`,
        rede: e.rede,
        localidade: `"${e.localidade}"`,
        ideb: d ? d.ideb : "",
        port: d ? d.port : "",
        mat: d ? d.mat : "",
        fluxo: d ? (d.fluxo * 100).toFixed(1) : ""
      };
    })
    .sort((a, b) => (b.ideb || 0) - (a.ideb || 0));

  lista.forEach((item, idx) => {
    csv += `${idx + 1},${item.nome},${item.rede},${item.localidade},${item.ideb},${item.port},${item.mat},${item.fluxo}%\n`;
  });

  downloadBlob(csv, `IDEB_2025_Salinas_da_Margarida_${etapa}.csv`, "text/csv;charset=utf-8;");
}

function exportSerieCSV() {
  let csv = "Ano,Escola,Rede,Etapa,IDEB,Saeb_Portugues,Saeb_Matematica,Taxa_Aprovacao\n";

  IDEB_DATA.escolas.forEach(e => {
    Object.keys(e.dados).forEach(etapa => {
      Object.keys(e.dados[etapa]).forEach(ano => {
        const d = e.dados[etapa][ano];
        csv += `${ano},"${e.nome.replace(/"/g, '""')}",${e.rede},${etapa},${d.ideb},${d.port},${d.mat},${(d.fluxo * 100).toFixed(1)}%\n`;
      });
    });
  });

  downloadBlob(csv, `IDEB_Serie_Historica_Salinas_da_Margarida.csv`, "text/csv;charset=utf-8;");
}

function downloadBlob(content, filename, contentType) {
  const blob = new Blob(["\ufeff" + content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
