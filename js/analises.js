const ANALISES_ESCOLAS = {
    "29170320": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-chart-line"></i> Evolução Real e Sustentável</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola demonstra uma trajetória excelente em 2025. Houve um salto expressivo tanto em Português quanto em Matemática, alcançando um sólido <strong>Nível 4</strong> em ambas as frentes e saindo da estagnação histórica na faixa do Nível 3. O aumento robusto do IDEB (5.5) reflete não apenas uma boa retenção do fluxo escolar (92% de aprovação), mas um ganho genuíno e mensurável de proficiência cognitiva. Um ótimo trabalho pedagógico.</p>
    `,
    "29430330": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-exclamation-triangle"></i> Tendência de Queda em Matemática</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola apresenta um cenário preocupante. Desde 2021, as notas vêm recuando perigosamente. Em Matemática, a escola estagnou profundamente no Nível 2. A escola aprova esmagadores 92% dos alunos (mantendo o IDEB artificialmente blindado em 4.2), mas a capacidade de inferência, leitura crítica e resolução de problemas matemáticos básicos está sendo perdida ciclo após ciclo. É preciso ligar o sinal de alerta e reformular as práticas de sala de aula.</p>
    `,
    "29440963": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-seedling"></i> Trajetória Brilhante e Consistente</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">Ao contrário de outras escolas, o Modelo de Encarnação vem crescendo de forma ininterrupta e consistente desde 2021 em ambas as disciplinas. A gestão não usou o "truque" do fluxo automático para inflar seu IDEB: a aprovação subiu de forma honesta (de 71% para 87%) caminhando em paralelo com um aumento contínuo de proficiência e domínio de leitura. O letramento aqui está avançando gradativamente de maneira sustentável.</p>
    `,
    "29997801": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-book-reader"></i> Avanço Consolidado por Linguagens</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">Observa-se um avanço consolidado puxado pela área de Língua Portuguesa. A proficiência avançou e a escola cruzou a barreira e atingiu com segurança o <strong>Nível 3</strong> em 2025. A aprovação continua saudável na casa dos 90%, mas agora respaldada por um aprendizado um pouco mais profundo e menos superficial. Matemática também cresceu, caminhando positivamente rumo a patamares maiores.</p>
    `,
    "29170338": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-rocket"></i> Salto Pedagógico Espetacular</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola Clodoaldo Brito protagonizou um salto espetacular e digno de nota em 2025. O crescimento expressivo em Português (do Nível 3 para o Nível 4) e em Matemática (que rasgou o teto e chegou ao <strong>Nível 5</strong>) mostra que um trabalho profundo de resgate e intervenção foi feito após as quedas passadas. O IDEB pulou de 4.6 para 6.0 fundamentado em aprendizado real (proficiência), e não apenas no fluxo.</p>
    `,
    "29170346": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-eye-slash"></i> O Perigo do IDEB Ilusório</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">Uma escola que flerta com o teto de vidro e a perigosa Ilusão do IDEB. A proficiência em Português praticamente não saiu do lugar desde 2021, e Matemática sofreu uma queda muito sentida (perdendo o alto Nível 5 que havia conquistado em 2023). Apesar desse recuo cognitivo óbvio nas provas do SAEB, a escola ostenta um IDEB altíssimo de 6.1 que se apoia unicamente em uma taxa de aprovação quase universal de 99%. A avaliação corre o risco de virar mera formalidade, deixando os alunos passarem de ano sem o letramento adequado.</p>
    `,
    "29170443": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-balance-scale"></i> Efeito Gangorra e Fragilidade no Letramento</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola Eraldo Tinoco vive um cenário crônico de instabilidade. A proficiência despencou no ciclo passado e, agora em 2025, embora a Matemática tenha se recuperado voltando ao Nível 4, o Português ainda não conseguiu superar a defasagem, empacando no Nível 3. Isso aponta para uma fragilidade estrutural no letramento que impede os alunos de fazer inferências textuais mais refinadas.</p>
    `,
    "29170486": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-mask"></i> O Pico Atípico e o Retorno à Estagnação</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">O clássico caso do ganho insustentável. Em 2023, a escola apresentou um salto extraordinário e atípico (alcançando o raríssimo Nível 6 em Mat). Contudo, 2025 provou que isso talvez não tenha se tornado uma cultura permanente: houve uma queda abrupta, regressando aos Níveis 4 históricos. A escola seguiu aprovando 96% e mascarou essa forte regressão com um vistoso IDEB 6.2. O desafio imediato da gestão é estancar a perda e solidificar a leitura crítica e a resolução de problemas para que os alunos não sejam "aprovados, porém analfabetos funcionais".</p>
    `,
    "29170508": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-history"></i> Sem Dados Recentes</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola carece de dados do SAEB para o ciclo de 2025, o que impossibilita um diagnóstico fidedigno do momento atual. Historicamente, os dados até 2017 apontavam fragilidades e oscilações profundas no letramento básico. Recomenda-se forte acompanhamento via avaliações diagnósticas próprias do município.</p>
    `,
    "29400270": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-arrow-up"></i> Recuperação Puxada pela Lógica e Cálculo</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">Observa-se uma recuperação muito animadora. A escola retomou o fôlego superando inclusive as marcas de 2019 em Matemática e entrando no Nível 4. Contudo, Português, embora com discreta melhora, segue perigosamente amarrado no Nível 3. Esse descompasso sinaliza que os alunos estão aprendendo os algoritmos matemáticos operacionais, mas ainda sofrem cronicamente de interpretação e fluência textual da linguagem.</p>
    `,
    "29406048": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-trophy"></i> A Virada de Chave Pedagógica</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">Uma evolução que merece aplausos da rede. Após atingir índices muito fragilizados na crise pandêmica em 2021, a escola emplacou dois ciclos seguidos de forte evolução sustentável. Em 2025, bateu firmemente as portas do Nível 4 em Português e estourou no Nível 5 em Matemática. Tudo isso com fluxos de aprovação realistas (sem maquiagem inflacionária). A cultura de ensino e aprendizado parece estar, de fato, se tornando real para cada aluno nesta escola.</p>
    `,
    "29448310": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-band-aid"></i> Cicatrização com Excessos na Aprovação</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">A escola passa por um processo sensível de cicatrização após o grande abismo cognitivo sofrido em 2023. O esforço foi premiado e a escola resgatou os patamares do Nível 4 em 2025. O problema pedagógico se encontra no painel de aprovação: o índice da gestão bateu quase 100% (97%), o que catapultou o IDEB para 5.7 antes mesmo de a escola conseguir retomar seu esplendor passado (onde tocava o Nível 5 em matemática em 2021). Há indícios perigosos de flexibilização extrema nas avaliações internas para beneficiar indicadores.</p>
    `,
    "29476089": `
        <h4 style="color: var(--color-burgundy); font-weight: bold; margin-bottom: 0.5rem;"><i class="fas fa-fire-extinguisher"></i> Alerta Vermelho em Linguagens</h4>
        <p style="color: #444; line-height: 1.5; font-size: 0.95em;">O cenário na escola apita um alerta vermelho crônico na área das linguagens textuais. Desde a série histórica de 2019, o rendimento em Português só cai de forma sequencial ano a ano, afundando no pântano do Nível 3, onde os alunos sequer conseguem realizar deduções ou inferências moderadas. Matemática tentou se manter, mas também recuou nesse último ciclo. É mandatório intervir imediatamente nas práticas metodológicas de letramento básico desta unidade de ensino antes que o abismo se aprofunde.</p>
    `
};
