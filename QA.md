# Relatório da reformulação

Validado localmente em 5 de setembro de 2026, sobre o build de produção do Vite.

## Resultado visual e estrutura

A direção da skill frontend-design guiou uma identidade centrada no nome, em Manrope
local, com superfícies sólidas, azul profundo e imagens reais dos projetos.
O hero permite alternar Fyzen, Riegel Films e Ventlize. A página segue apresentação,
habilidades, trabalhos, conceitos, experiência na Loomee, apresentação pessoal e contato.
O destaque principal, a dupla de projetos, a galeria e o retrato usam composições distintas.

Foram reorganizados Hero, Navbar, Skills, Projects, Mockups, Studio, About, Contact e Footer.
ProjectImage centraliza fontes responsivas, dimensões, prioridade e textos alternativos.
BrandMark unifica a marca em SVG. O módulo preferences trata armazenamento indisponível
e preferências inválidas. Tokens de cor, espaçamento, raio e movimento estão no CSS global.

## Funcionalidades preservadas e correções

- Português e inglês, temas claro e escuro, preferências persistentes e tema do sistema.
- Todas as âncoras, três projetos, três conceitos, estúdio, GitHub, redes e contatos.
- Menu com Escape, clique fora, fechamento ao sair pelo teclado, breakpoint e seção ativa.
- Scroll com compensação da navegação fixa, skip link e foco visível.
- Movimento inicial discreto, hover de imagens e links, e prefers-reduced-motion.
- Correção de idioma salvo inválido e falha de localStorage que podiam impedir a renderização.
- Correção da proporção da imagem de prévia identificada na primeira inspeção.
- Downloads com query string funcionam em desenvolvimento e preview.
- Resposta HTML de fallback deixou de ser aceita como download válido.
- Scripts Windows recuperados do commit 8720607: conteúdo byte a byte idêntico ao original.
  ZIP remontado e verificado com unzip; os scripts não foram executados.
- ESLint deixou de analisar o cache gerado .vite; todas as regras de código foram mantidas.
  Imports de Motion e propriedade não utilizada do Counter foram corrigidos.
- Favicon, Open Graph, imagem social 1200×630, canonical, robots.txt e sitemap.
- Nomes acessíveis dos links incluem os textos visíveis relevantes.

## Performance

As sete imagens de projetos/estúdio e o retrato somavam 7.287.843 bytes nos originais.
As maiores variantes WebP usadas somam 191.726 bytes: redução de 97,4% nesse conjunto.
Os originais foram preservados. A página escolhe tamanhos via srcset/sizes e carrega
imagens abaixo da dobra sob demanda. Manrope variável local ocupa 24.576 bytes.
Nenhuma biblioteca nova foi adicionada ao runtime da interface.

Build final: JavaScript 218,06 kB (68,27 kB gzip), CSS 20,32 kB (4,83 kB gzip).

Lighthouse mobile local: performance 99, acessibilidade 100, boas práticas 100, SEO 100.
FCP 1,2 s, LCP 2,0 s, TBT 0 ms, CLS 0. São medidas de laboratório, não dados de visitantes.

## Testes e inspeção

31 testes Playwright aprovados:

- 24 combinações: 1440, 1280, 1024, 768, 430 e 390px × dois temas × dois idiomas.
- Sem overflow horizontal, imagens quebradas, respostas de erro, erros ou avisos de console
  na página do portfólio. Auditoria axe WCAG A/AA sem violações nessas combinações.
- Troca e persistência de tema/idioma; seleção dos projetos; menu e teclado; âncoras;
  contatos e destinos externos; storage inválido/bloqueado; redução de movimento;
  downloads reais macOS/Windows e falha simulada; arquivos de SEO e compartilhamento.
- Inspeção visual de capturas completas em desktop, notebook, tablet e celular, incluindo
  tema escuro e inglês. Verificação adicional de overflow em 320px.
- Auditoria específica final de correspondência dos nomes acessíveis: zero violações.

Comandos aprovados: npm run lint, npm run format:check, npm run build, npm test,
npm audit, npm audit --omit=dev e git diff --check. A auditoria de dependências
terminou com zero vulnerabilidades após atualizações compatíveis no lockfile.

## Limites da validação

O projeto usa JavaScript/JSX e não possui TypeScript nem comando de typecheck.
O navegador conectado não estava disponível: os testes e as capturas usaram Chromium
automatizado. Safari, Firefox e aparelhos físicos não foram testados.

Projetos, demos, repositórios, Instagram e X responderam HTTP 200 na checagem.
LinkedIn respondeu 999, bloqueando o acesso automatizado; seu endereço foi preservado.
WhatsApp e mailto tiveram destino e parâmetros validados, sem envio de mensagens.
Não existe formulário ou API de envio no projeto. Os instaladores baixados não foram executados.

O Node 26 emite avisos de depreciação de module.register no tooling do Vite e de
variáveis de cor no runner; não são erros do site e não foram silenciados.
Não houve publicação ou mudança no ambiente remoto.

## Reproduzir

Use npm ci, npm run build e npm test. Se o Chromium não estiver instalado,
execute npx playwright install chromium. Use npm run dev para trabalhar e
npm run preview para inspecionar a versão compilada. As capturas dos testes
ficam em test-results (ignorado pelo Git). npm run social:generate recria a imagem social.
