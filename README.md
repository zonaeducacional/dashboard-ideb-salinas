# Dashboard IDEB 2025 — Salinas da Margarida (BA)

Painel interativo de dados do IDEB 2025 de Salinas da Margarida (BA), com mapa georreferenciado de escolas, métricas do Saeb, taxas de aprovação, séries históricas (2005-2025) e exportação em CSV.

---

## 🌐 Como Fazer o Deploy Gratuito na Web

O aplicativo é 100% estático (HTML/CSS/JS), o que permite ser hospedado gratuitamente e em segundos em qualquer uma das plataformas abaixo:

### Opção 1: Deploy com Vercel (Recomendado - 1 Clique)
1. Instale a CLI do Vercel no terminal da sua máquina:
   ```bash
   npm i -g vercel
   ```
2. No diretório do projeto, execute:
   ```bash
   vercel
   ```
3. O Vercel gerará o link público `.vercel.app` instantaneamente!

---

### Opção 2: Deploy com Netlify Drop (Sem terminal)
1. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta inteira `dashboard_ideb_salinas` para a tela do navegador.
3. O site estará no ar em segundos com SSL grátis!

---

### Opção 3: Deploy com Firebase Hosting
1. Faça login no Firebase:
   ```bash
   npx firebase-tools login
   ```
2. Associe seu projeto Firebase:
   ```bash
   npx firebase-tools init hosting
   ```
3. Execute o deploy:
   ```bash
   npx firebase-tools deploy --only hosting
   ```

---

### Opção 4: Deploy no GitHub Pages
1. Crie um repositório no GitHub e faça o push do projeto:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Dashboard IDEB Salinas 2025"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/dashboard-ideb-salinas.git
   git push -u origin main
   ```
2. No repositório no GitHub, vá em **Settings > Pages > Source** e selecione **GitHub Actions**. O deploy será automático!
