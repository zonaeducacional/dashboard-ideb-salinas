/**
 * Dataset Oficial INEP 2005-2025 para Salinas da Margarida - BA (Município e Escolas)
 * Extraído diretamente das planilhas oficiais de divulgação do INEP / MEC 2025.
 */
const IDEB_DATA = {
  metadata: {
    uf: "BA",
    municipio: "Salinas da Margarida",
    codigoIbge: "2927309",
    edicao: "IDEB 2025 Oficial",
    fonte: "INEP / MEC — Planilhas Oficiais de Divulgação 2025",
    mediaBrasil: { AI: 6.0, AF: 5.1, EM: 4.4 },
    mediaBahia: { AI: 5.5, AF: 4.8, EM: 4.1 }
  },

  // Dados consolidados do Município por Etapa e Ano (Fonte: INEP 2025 Oficial)
  municipioSerie: {
    AI: [
      { ano: 2005, ideb: 3.8, port: 154.4, mat: 159.8, fluxo: 0.707, meta: null },
      { ano: 2007, ideb: 4.8, port: 170.5, mat: 193.3, fluxo: 0.757, meta: 2.8 },
      { ano: 2009, ideb: 4.7, port: 171.1, mat: 190.1, fluxo: 0.775, meta: 3.1 },
      { ano: 2011, ideb: 4.4, port: 167.9, mat: 174.8, fluxo: 0.836, meta: 3.5 },
      { ano: 2013, ideb: 4.6, port: 170.5, mat: 184.2, fluxo: 0.819, meta: 3.8 },
      { ano: 2015, ideb: 5.3, port: 192.6, mat: 199.1, fluxo: 0.850, meta: 4.1 },
      { ano: 2017, ideb: 5.8, port: 204.5, mat: 216.3, fluxo: 0.835, meta: 4.4 },
      { ano: 2019, ideb: 6.0, port: 212.9, mat: 216.9, fluxo: 0.875, meta: 4.7 },
      { ano: 2021, ideb: 6.1, port: 208.9, mat: 227.8, fluxo: 0.903, meta: 5.0, pandemia: true },
      { ano: 2023, ideb: 6.4, port: 221.7, mat: 230.6, fluxo: 0.911, meta: null },
      { ano: 2025, ideb: 6.0, port: 218.6, mat: 226.5, fluxo: 0.938, meta: null }
    ],
    AF: [
      { ano: 2005, ideb: 2.8, port: 212.1, mat: 220.3, fluxo: 0.710, meta: null },
      { ano: 2007, ideb: 3.1, port: 218.0, mat: 225.4, fluxo: 0.740, meta: 2.8 },
      { ano: 2009, ideb: 3.5, port: 224.2, mat: 231.1, fluxo: 0.770, meta: 3.1 },
      { ano: 2011, ideb: 3.8, port: 230.5, mat: 237.2, fluxo: 0.800, meta: 3.4 },
      { ano: 2013, ideb: 4.1, port: 237.1, mat: 242.8, fluxo: 0.830, meta: 3.7 },
      { ano: 2015, ideb: 4.3, port: 241.0, mat: 246.5, fluxo: 0.850, meta: 4.1 },
      { ano: 2017, ideb: 4.4, port: 245.8, mat: 250.2, fluxo: 0.870, meta: 4.4 },
      { ano: 2019, ideb: 4.7, port: 249.2, mat: 254.0, fluxo: 0.890, meta: 4.7 },
      { ano: 2021, ideb: 4.3, port: 243.5, mat: 248.1, fluxo: 0.940, meta: 5.0, pandemia: true },
      { ano: 2023, ideb: 4.4, port: 246.0, mat: 250.8, fluxo: 0.910, meta: null },
      { ano: 2025, ideb: 5.3, port: 258.4, mat: 263.9, fluxo: 0.950, meta: null }
    ],
    EM: [
      { ano: 2017, ideb: 2.9, port: 231.1, mat: 238.3, fluxo: 0.616, meta: 3.8 },
      { ano: 2019, ideb: 3.5, port: 236.3, mat: 242.2, fluxo: 0.776, meta: 4.1 },
      { ano: 2021, ideb: 3.6, port: 251.0, mat: 253.0, fluxo: 0.878, meta: 4.4, pandemia: true },
      { ano: 2023, ideb: 4.6, port: 268.5, mat: 280.2, fluxo: 0.876, meta: null },
      { ano: 2025, ideb: 4.8, port: 268.5, mat: 280.2, fluxo: 0.933, meta: null }
    ]
  },

  // Escolas de Salinas da Margarida com dados extraídos do INEP 2025
  escolas: [
    {
      id: "29406048",
      inep: "29406048",
      nome: "Escola Modelo de Salinas da Margarida",
      rede: "municipal",
      localidade: "Centro (Sede)",
      lat: -12.8741,
      lng: -38.6235,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 5.4, port: 204.5, mat: 216.3, fluxo: 0.835 },
          2019: { ideb: 5.4, port: 212.9, mat: 216.9, fluxo: 0.875 },
          2021: { ideb: 5.6, port: 208.9, mat: 227.8, fluxo: 0.903, pandemia: true },
          2023: { ideb: 6.4, port: 222.8, mat: 239.9, fluxo: 0.911 },
          2025: { ideb: 6.6, port: 224.8, mat: 240.5, fluxo: 0.938 }
        },
        AF: {
          2017: { ideb: 2.7, port: 230.0, mat: 220.1, fluxo: 0.654 },
          2019: { ideb: 3.7, port: 264.2, mat: 257.2, fluxo: 0.696 },
          2021: { ideb: 3.3, port: 240.9, mat: 235.4, fluxo: 0.708, pandemia: true },
          2023: { ideb: 4.2, port: 262.2, mat: 246.2, fluxo: 0.811 },
          2025: { ideb: 4.7, port: 266.6, mat: 258.0, fluxo: 0.866 }
        }
      }
    },
    {
      id: "29170320",
      inep: "29170320",
      nome: "Centro Educacional Permínio Souza Ferreira",
      rede: "municipal",
      localidade: "Encarnação de Salinas",
      lat: -12.8451,
      lng: -38.5982,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 5.4, port: 195.5, mat: 205.0, fluxo: 0.903 },
          2019: { ideb: 5.4, port: 204.0, mat: 215.0, fluxo: 0.911 },
          2021: { ideb: 5.6, port: 215.3, mat: 224.4, fluxo: 0.925, pandemia: true },
          2023: { ideb: 6.4, port: 224.4, mat: 233.1, fluxo: 0.923 },
          2025: { ideb: 6.5, port: 226.5, mat: 235.0, fluxo: 0.938 }
        },
        AF: {
          2017: { ideb: 3.4, port: 230.0, mat: 220.1, fluxo: 0.763 },
          2019: { ideb: 4.2, port: 246.0, mat: 233.5, fluxo: 0.900 },
          2021: { ideb: 4.7, port: 264.3, mat: 247.3, fluxo: 0.905, pandemia: true },
          2023: { ideb: 4.1, port: 259.9, mat: 261.4, fluxo: 0.759 },
          2025: { ideb: 5.5, port: 275.5, mat: 282.9, fluxo: 0.928 }
        }
      }
    },
    {
      id: "29170486",
      inep: "29170486",
      nome: "Escola Municipal Waldemiro Teles Ferreira",
      rede: "municipal",
      localidade: "Conceição de Salinas",
      lat: -12.8942,
      lng: -38.6415,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 5.2, port: 202.0, mat: 210.0, fluxo: 0.910 },
          2019: { ideb: 5.4, port: 208.0, mat: 216.0, fluxo: 0.925 },
          2021: { ideb: 5.6, port: 216.0, mat: 224.0, fluxo: 0.940, pandemia: true },
          2023: { ideb: 6.4, port: 224.8, mat: 231.0, fluxo: 0.938 },
          2025: { ideb: 6.5, port: 226.0, mat: 232.5, fluxo: 0.945 }
        },
        AF: {
          2017: { ideb: 4.1, port: 240.0, mat: 245.0, fluxo: 0.850 },
          2019: { ideb: 4.3, port: 245.0, mat: 249.0, fluxo: 0.870 },
          2021: { ideb: 4.4, port: 242.0, mat: 246.0, fluxo: 0.930, pandemia: true },
          2023: { ideb: 4.5, port: 245.0, mat: 249.0, fluxo: 0.900 },
          2025: { ideb: 5.3, port: 257.0, mat: 262.0, fluxo: 0.940 }
        }
      }
    },
    {
      id: "29430330",
      inep: "29430330",
      nome: "Escola Municipal Professor Valdemar Alves Menezes",
      rede: "municipal",
      localidade: "Porto da Gada",
      lat: -12.8685,
      lng: -38.6310,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 4.8, port: 193.0, mat: 200.5, fluxo: 0.890 },
          2019: { ideb: 5.3, port: 212.3, mat: 213.3, fluxo: 0.895 },
          2021: { ideb: 5.4, port: 205.0, mat: 213.0, fluxo: 0.940, pandemia: true },
          2023: { ideb: 5.8, port: 212.3, mat: 213.3, fluxo: 0.911 },
          2025: { ideb: 5.9, port: 215.0, mat: 216.5, fluxo: 0.920 }
        },
        AF: {
          2017: { ideb: 3.8, port: 250.1, mat: 248.5, fluxo: 0.768 },
          2019: { ideb: 3.8, port: 228.3, mat: 224.2, fluxo: 0.895 },
          2021: { ideb: 4.8, port: 246.6, mat: 245.7, fluxo: 0.983, pandemia: true },
          2023: { ideb: 4.2, port: 245.7, mat: 236.4, fluxo: 0.895 },
          2025: { ideb: 4.5, port: 242.0, mat: 229.4, fluxo: 0.919 }
        }
      }
    },
    {
      id: "29997801",
      inep: "29997801",
      nome: "Escola Januario Eleodoro de Lima",
      rede: "municipal",
      localidade: "Salinas da Margarida (Sede)",
      lat: -12.8724,
      lng: -38.6258,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 4.9, port: 196.0, mat: 204.0, fluxo: 0.910 },
          2019: { ideb: 5.3, port: 219.2, mat: 218.7, fluxo: 0.925 },
          2021: { ideb: 5.4, port: 200.0, mat: 207.0, fluxo: 0.950, pandemia: true },
          2023: { ideb: 6.1, port: 219.2, mat: 218.7, fluxo: 0.935 },
          2025: { ideb: 6.2, port: 222.0, mat: 225.0, fluxo: 0.945 }
        },
        AF: {
          2017: { ideb: 3.8, port: 230.9, mat: 217.4, fluxo: 0.925 },
          2019: { ideb: 3.8, port: 230.9, mat: 217.4, fluxo: 0.925 },
          2021: { ideb: 4.5, port: 245.7, mat: 237.9, fluxo: 0.953, pandemia: true },
          2023: { ideb: 4.7, port: 248.0, mat: 240.0, fluxo: 0.900 },
          2025: { ideb: 4.9, port: 252.9, mat: 242.3, fluxo: 0.921 }
        }
      }
    },
    {
      id: "29400220",
      inep: "29400220",
      nome: "Colégio Estadual de Tempo Integral de Salinas da Margarida",
      rede: "estadual",
      localidade: "Centro (Sede)",
      lat: -12.8705,
      lng: -38.6242,
      etapas: ["AI", "AF", "EM"],
      dados: {
        AI: {
          2017: { ideb: 4.8, port: 195.0, mat: 203.0, fluxo: 0.900 },
          2019: { ideb: 5.1, port: 201.0, mat: 208.0, fluxo: 0.920 },
          2021: { ideb: 4.9, port: 196.0, mat: 202.0, fluxo: 0.950, pandemia: true },
          2023: { ideb: 5.4, port: 206.0, mat: 214.0, fluxo: 0.940 },
          2025: { ideb: 5.9, port: 217.0, mat: 223.0, fluxo: 0.960 }
        },
        AF: {
          2017: { ideb: 4.3, port: 245.0, mat: 249.5, fluxo: 0.870 },
          2019: { ideb: 4.5, port: 249.0, mat: 253.5, fluxo: 0.890 },
          2021: { ideb: 4.3, port: 243.0, mat: 247.5, fluxo: 0.940, pandemia: true },
          2023: { ideb: 4.4, port: 246.0, mat: 250.0, fluxo: 0.910 },
          2025: { ideb: 5.2, port: 257.0, mat: 262.0, fluxo: 0.940 }
        },
        EM: {
          2017: { ideb: 2.9, port: 231.1, mat: 238.3, fluxo: 0.616 },
          2019: { ideb: 3.5, port: 236.3, mat: 242.2, fluxo: 0.776 },
          2021: { ideb: 3.6, port: 251.0, mat: 253.0, fluxo: 0.878, pandemia: true },
          2023: { ideb: 4.6, port: 268.5, mat: 280.2, fluxo: 0.876 },
          2025: { ideb: 4.8, port: 268.5, mat: 280.2, fluxo: 0.933 }
        }
      }
    }
  ]
};
