/**
 * Gerenciamento do Mapa Interativo Leaflet
 */
let mapInstance = null;
let mapMarkers = [];

function getIdebColor(score, etapa = "AI") {
  if (score === null || score === undefined) return "#94a3b8"; // cinza sem nota

  // Define pontos de referência baseados na etapa
  let min = 3.5, mid = 5.5, max = 7.0;
  if (etapa === "AF") { min = 2.5; mid = 4.5; max = 6.5; }
  if (etapa === "EM") { min = 2.0; mid = 4.0; max = 6.0; }

  if (score >= max) return "#3b82f6"; // Azul brilhante (Acima da média/excelente)
  if (score >= mid + 0.5) return "#06b6d4"; // Ciano
  if (score >= mid) return "#10b981"; // Verde esmeralda
  if (score >= min + 1.0) return "#f59e0b"; // Amarelo
  if (score >= min) return "#f97316"; // Laranja
  return "#ef4444"; // Vermelho (Abaixo da média)
}

function initMap() {
  const container = document.getElementById("mapa");
  if (!container) return;

  // Centro de Salinas da Margarida - BA
  const salinasCoords = [-12.8718, -38.6253];

  mapInstance = L.map("mapa", {
    center: salinasCoords,
    zoom: 13,
    zoomControl: true,
    attributionControl: false
  });

  // Layer elegante de mapa
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd"
  }).addTo(mapInstance);

  renderMapMarkers();
}

function renderMapMarkers() {
  if (!mapInstance) return;

  // Limpa marcadores existentes
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  const etapa = window.currentFilters.etapa;
  const rede = window.currentFilters.rede;
  const selectedEscolaId = window.currentFilters.escolaId;

  IDEB_DATA.escolas.forEach(escola => {
    // Filtro por rede
    if (rede !== "todas") {
      if (rede === "publica" && escola.rede !== "municipal" && escola.rede !== "estadual") return;
      if (rede !== "publica" && escola.rede !== rede) return;
    }

    // Filtro por etapa
    if (!escola.etapas.includes(etapa)) return;

    const dadosEtapa = escola.dados[etapa];
    const dados2025 = dadosEtapa ? dadosEtapa[2025] : null;
    const score = dados2025 ? dados2025.ideb : null;
    const color = getIdebColor(score, etapa);

    const isSelected = selectedEscolaId === escola.id;

    // Criar ícone de marcador personalizado em HTML/CSS
    const markerHtml = `
      <div class="custom-map-marker ${isSelected ? 'selected' : ''}" style="background-color: ${color};">
        <span class="marker-score">${score ? score.toFixed(1) : '-'}</span>
      </div>
    `;

    const icon = L.divIcon({
      html: markerHtml,
      className: 'leaflet-marker-custom-wrapper',
      iconSize: [38, 38],
      iconAnchor: [19, 19]
    });

    const marker = L.marker([escola.lat, escola.lng], { icon: icon }).addTo(mapInstance);

    // Popup formatado
    const popupContent = `
      <div class="map-popup-card">
        <div class="popup-header">
          <span class="badge badge-${escola.rede}">${escola.rede.toUpperCase()}</span>
          <span class="popup-local">${escola.localidade}</span>
        </div>
        <h4 class="popup-title">${escola.nome}</h4>
        <div class="popup-metrics">
          <div class="metric">
            <span class="lbl">IDEB 2025</span>
            <span class="val" style="color: ${color}">${score ? score.toFixed(1) : '-'}</span>
          </div>
          <div class="metric">
            <span class="lbl">Português</span>
            <span class="val">${dados2025 ? dados2025.port.toFixed(1) : '-'}</span>
          </div>
          <div class="metric">
            <span class="lbl">Matemática</span>
            <span class="val">${dados2025 ? dados2025.mat.toFixed(1) : '-'}</span>
          </div>
          <div class="metric">
            <span class="lbl">Aprovação</span>
            <span class="val">${dados2025 ? (dados2025.fluxo * 100).toFixed(0) + '%' : '-'}</span>
          </div>
        </div>
        <button class="btn-popup-select" onclick="selectEscolaFromMap('${escola.id}')">
          <i class="fas fa-chart-line">
          ${isSelected ? 'Ver detalhes' : 'Selecionar Escola'}
        </button>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 280 });

    marker.on('click', () => {
      // Opcional: selecionar escola ao clicar no marcador
    });

    mapMarkers.push(marker);
  });
}

function selectEscolaFromMap(escolaId) {
  if (window.selectEscola) {
    window.selectEscola(escolaId);
  }
}
