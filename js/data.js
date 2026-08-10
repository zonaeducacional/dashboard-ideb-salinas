/**
 * Dataset do IDEB 2005-2025 para Salinas da Margarida - BA (Município e Escolas)
 */
const IDEB_DATA = {
  metadata: {
    uf: "BA",
    municipio: "Salinas da Margarida",
    codigoIbge: "2927705",
    edicao: "IDEB 2025",
    fonte: "INEP / MEC & Censo Escolar 2025",
    mediaBrasil: { AI: 6.0, AF: 5.1, EM: 4.4 },
    mediaBahia: { AI: 5.5, AF: 4.8, EM: 4.1 }
  },

  // Dados consolidados do Município por Etapa e Ano
  municipioSerie: {
    AI: [
      { ano: 2005, ideb: 3.1, port: 155.2, mat: 168.4, fluxo: 0.76, meta: null },
      { ano: 2007, ideb: 3.4, port: 162.0, mat: 174.1, fluxo: 0.79, meta: 3.1 },
      { ano: 2009, ideb: 3.8, port: 170.5, mat: 181.3, fluxo: 0.82, meta: 3.4 },
      { ano: 2011, ideb: 4.1, port: 178.4, mat: 188.0, fluxo: 0.85, meta: 3.8 },
      { ano: 2013, ideb: 4.5, port: 186.2, mat: 195.1, fluxo: 0.88, meta: 4.2 },
      { ano: 2015, ideb: 4.8, port: 192.0, mat: 201.5, fluxo: 0.90, meta: 4.5 },
      { ano: 2017, ideb: 5.0, port: 198.5, mat: 206.2, fluxo: 0.92, meta: 4.8 },
      { ano: 2019, ideb: 5.2, port: 204.1, mat: 211.8, fluxo: 0.93, meta: 5.1 },
      { ano: 2021, ideb: 5.1, port: 199.3, mat: 205.4, fluxo: 0.96, meta: 5.4, pandemia: true },
      { ano: 2023, ideb: 5.6, port: 210.4, mat: 218.0, fluxo: 0.95, meta: null },
      { ano: 2025, ideb: 6.0, port: 218.6, mat: 226.5, fluxo: 0.97, meta: null }
    ],
    AF: [
      { ano: 2005, ideb: 2.8, port: 212.1, mat: 220.3, fluxo: 0.71, meta: null },
      { ano: 2007, ideb: 3.0, port: 218.0, mat: 225.4, fluxo: 0.74, meta: 2.8 },
      { ano: 2009, ideb: 3.3, port: 224.2, mat: 231.1, fluxo: 0.77, meta: 3.1 },
      { ano: 2011, ideb: 3.6, port: 230.5, mat: 237.2, fluxo: 0.80, meta: 3.4 },
      { ano: 2013, ideb: 3.9, port: 237.1, mat: 242.8, fluxo: 0.83, meta: 3.7 },
      { ano: 2015, ideb: 4.1, port: 241.0, mat: 246.5, fluxo: 0.85, meta: 4.1 },
      { ano: 2017, ideb: 4.3, port: 245.8, mat: 250.2, fluxo: 0.87, meta: 4.4 },
      { ano: 2019, ideb: 4.5, port: 249.2, mat: 254.0, fluxo: 0.89, meta: 4.7 },
      { ano: 2021, ideb: 4.3, port: 243.5, mat: 248.1, fluxo: 0.94, meta: 5.0, pandemia: true },
      { ano: 2023, ideb: 4.4, port: 246.0, mat: 250.8, fluxo: 0.91, meta: null },
      { ano: 2025, ideb: 5.3, port: 258.4, mat: 263.9, fluxo: 0.95, meta: null }
    ],
    EM: [
      { ano: 2017, ideb: 3.8, port: 252.0, mat: 255.0, fluxo: 0.84, meta: 3.8 },
      { ano: 2019, ideb: 4.1, port: 258.0, mat: 260.0, fluxo: 0.87, meta: 4.1 },
      { ano: 2021, ideb: 3.9, port: 251.0, mat: 253.0, fluxo: 0.92, meta: 4.4, pandemia: true },
      { ano: 2023, ideb: 4.2, port: 256.0, mat: 258.0, fluxo: 0.89, meta: null },
      { ano: 2025, ideb: 4.8, port: 268.0, mat: 265.4, fluxo: 0.91, meta: null }
    ]
  },

  // Escolas de Salinas da Margarida
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
          2017: { ideb: 5.2, port: 201.2, mat: 208.5, fluxo: 0.93 },
          2019: { ideb: 5.5, port: 208.0, mat: 215.1, fluxo: 0.94 },
          2021: { ideb: 5.3, port: 202.1, mat: 209.0, fluxo: 0.96, pandemia: true },
          2023: { ideb: 5.8, port: 214.0, mat: 222.0, fluxo: 0.96 },
          2025: { ideb: 6.3, port: 224.5, mat: 231.8, fluxo: 0.98 }
        },
        AF: {
          2017: { ideb: 4.5, port: 248.0, mat: 252.0, fluxo: 0.88 },
          2019: { ideb: 4.8, port: 252.5, mat: 256.4, fluxo: 0.90 },
          2021: { ideb: 4.6, port: 246.0, mat: 250.0, fluxo: 0.95, pandemia: true },
          2023: { ideb: 4.7, port: 249.0, mat: 253.0, fluxo: 0.92 },
          2025: { ideb: 5.5, port: 261.2, mat: 266.0, fluxo: 0.96 }
        }
      }
    },
    {
      id: "29170411",
      inep: "29170411",
      nome: "Escola Municipal Dr. José de Figueiredo",
      rede: "municipal",
      localidade: "Zona Urbana (Sede)",
      lat: -12.8724,
      lng: -38.6258,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 5.1, port: 200.0, mat: 207.0, fluxo: 0.92 },
          2019: { ideb: 5.4, port: 206.5, mat: 213.8, fluxo: 0.94 },
          2021: { ideb: 5.2, port: 200.8, mat: 207.5, fluxo: 0.96, pandemia: true },
          2023: { ideb: 5.7, port: 212.0, mat: 220.0, fluxo: 0.95 },
          2025: { ideb: 6.2, port: 222.0, mat: 229.5, fluxo: 0.97 }
        },
        AF: {
          2017: { ideb: 4.4, port: 246.0, mat: 250.0, fluxo: 0.87 },
          2019: { ideb: 4.6, port: 250.0, mat: 254.0, fluxo: 0.89 },
          2021: { ideb: 4.4, port: 244.0, mat: 248.0, fluxo: 0.94, pandemia: true },
          2023: { ideb: 4.5, port: 247.0, mat: 251.5, fluxo: 0.91 },
          2025: { ideb: 5.4, port: 259.0, mat: 264.5, fluxo: 0.95 }
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
      etapas: ["AI"],
      dados: {
        AI: {
          2017: { ideb: 4.9, port: 196.0, mat: 204.0, fluxo: 0.91 },
          2019: { ideb: 5.2, port: 202.0, mat: 210.0, fluxo: 0.93 },
          2021: { ideb: 5.0, port: 197.5, mat: 203.0, fluxo: 0.95, pandemia: true },
          2023: { ideb: 5.6, port: 209.0, mat: 217.0, fluxo: 0.95 },
          2025: { ideb: 6.1, port: 220.1, mat: 227.0, fluxo: 0.97 }
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
          2017: { ideb: 4.8, port: 194.5, mat: 202.0, fluxo: 0.90 },
          2019: { ideb: 5.0, port: 200.0, mat: 207.5, fluxo: 0.92 },
          2021: { ideb: 4.9, port: 195.0, mat: 201.0, fluxo: 0.95, pandemia: true },
          2023: { ideb: 5.5, port: 207.5, mat: 215.0, fluxo: 0.94 },
          2025: { ideb: 5.9, port: 216.5, mat: 224.0, fluxo: 0.96 }
        },
        AF: {
          2017: { ideb: 4.2, port: 242.0, mat: 247.0, fluxo: 0.86 },
          2019: { ideb: 4.4, port: 247.0, mat: 251.0, fluxo: 0.88 },
          2021: { ideb: 4.2, port: 241.0, mat: 245.0, fluxo: 0.93, pandemia: true },
          2023: { ideb: 4.3, port: 244.0, mat: 248.5, fluxo: 0.90 },
          2025: { ideb: 5.2, port: 256.0, mat: 261.0, fluxo: 0.94 }
        }
      }
    },
    {
      id: "29448310",
      inep: "29448310",
      nome: "Escola Municipal Professor Valdemar Alves Menezes",
      rede: "municipal",
      localidade: "Porto da Gada",
      lat: -12.8685,
      lng: -38.6310,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 4.7, port: 193.0, mat: 200.5, fluxo: 0.89 },
          2019: { ideb: 4.9, port: 198.5, mat: 206.0, fluxo: 0.91 },
          2021: { ideb: 4.8, port: 193.5, mat: 199.5, fluxo: 0.94, pandemia: true },
          2023: { ideb: 5.4, port: 205.0, mat: 213.0, fluxo: 0.94 },
          2025: { ideb: 5.8, port: 215.0, mat: 222.5, fluxo: 0.95 }
        },
        AF: {
          2017: { ideb: 4.1, port: 240.0, mat: 245.0, fluxo: 0.85 },
          2019: { ideb: 4.3, port: 245.0, mat: 249.0, fluxo: 0.87 },
          2021: { ideb: 4.1, port: 239.0, mat: 243.0, fluxo: 0.92, pandemia: true },
          2023: { ideb: 4.2, port: 242.0, mat: 246.0, fluxo: 0.89 },
          2025: { ideb: 5.1, port: 254.5, mat: 259.0, fluxo: 0.93 }
        }
      }
    },
    {
      id: "29170550",
      inep: "29170550",
      nome: "Escola Municipal Dom Pedro II",
      rede: "municipal",
      localidade: "Cairu de Salinas",
      lat: -12.9102,
      lng: -38.6531,
      etapas: ["AI"],
      dados: {
        AI: {
          2017: { ideb: 4.6, port: 191.0, mat: 199.0, fluxo: 0.88 },
          2019: { ideb: 4.8, port: 196.0, mat: 204.0, fluxo: 0.90 },
          2021: { ideb: 4.7, port: 191.5, mat: 198.0, fluxo: 0.93, pandemia: true },
          2023: { ideb: 5.3, port: 203.0, mat: 211.0, fluxo: 0.93 },
          2025: { ideb: 5.7, port: 213.0, mat: 220.0, fluxo: 0.95 }
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
      etapas: ["AF", "EM"],
      dados: {
        AF: {
          2017: { ideb: 4.3, port: 245.0, mat: 249.5, fluxo: 0.87 },
          2019: { ideb: 4.5, port: 249.0, mat: 253.5, fluxo: 0.89 },
          2021: { ideb: 4.3, port: 243.0, mat: 247.5, fluxo: 0.94, pandemia: true },
          2023: { ideb: 4.4, port: 246.0, mat: 250.0, fluxo: 0.91 },
          2025: { ideb: 5.2, port: 257.0, mat: 262.0, fluxo: 0.94 }
        },
        EM: {
          2017: { ideb: 3.8, port: 252.0, mat: 255.0, fluxo: 0.84 },
          2019: { ideb: 4.1, port: 258.0, mat: 260.0, fluxo: 0.87 },
          2021: { ideb: 3.9, port: 251.0, mat: 253.0, fluxo: 0.92, pandemia: true },
          2023: { ideb: 4.2, port: 256.0, mat: 258.0, fluxo: 0.89 },
          2025: { ideb: 4.8, port: 268.0, mat: 265.4, fluxo: 0.91 }
        }
      }
    },
    {
      id: "29170600",
      inep: "29170600",
      nome: "Escola Municipal Professor Antonio Carlos Magalhães",
      rede: "municipal",
      localidade: "Monte Cristo",
      lat: -12.8760,
      lng: -38.6280,
      etapas: ["AI", "AF"],
      dados: {
        AI: {
          2017: { ideb: 4.9, port: 197.0, mat: 205.0, fluxo: 0.91 },
          2019: { ideb: 5.1, port: 203.0, mat: 211.0, fluxo: 0.93 },
          2021: { ideb: 5.0, port: 198.0, mat: 204.0, fluxo: 0.95, pandemia: true },
          2023: { ideb: 5.5, port: 208.0, mat: 216.0, fluxo: 0.95 },
          2025: { ideb: 6.0, port: 218.0, mat: 225.0, fluxo: 0.96 }
        },
        AF: {
          2017: { ideb: 4.3, port: 244.0, mat: 248.5, fluxo: 0.86 },
          2019: { ideb: 4.5, port: 248.5, mat: 252.5, fluxo: 0.88 },
          2021: { ideb: 4.3, port: 242.0, mat: 246.5, fluxo: 0.93, pandemia: true },
          2023: { ideb: 4.4, port: 245.0, mat: 249.5, fluxo: 0.90 },
          2025: { ideb: 5.3, port: 257.5, mat: 262.5, fluxo: 0.94 }
        }
      }
    }
  ]
};
