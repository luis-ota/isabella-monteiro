# Isabella Monteiro | Portfólio de atriz

Portfólio de Isabella Monteiro para teatro e audiovisual. O site reúne trajetória, dados físicos, trabalhos selecionados, experiência de bastidores e contato profissional.

## Stack

- React 19 + Vite
- Motion para entradas e trocas fotográficas
- Phosphor Icons
- Archivo Variable + Road Rage, ambas servidas localmente

## Desenvolvimento

```bash
npm install
npm run dev
```

Validação local:

```bash
npm run lint
npm run build
```

## Conteúdo e imagens

O conteúdo factual vem do briefing da atriz. As fotografias foram extraídas do portfólio anterior fornecido pela cliente e convertidas para WebP. A procedência está documentada em `public/images/SOURCES.md`.

## Deploy

Cada push na branch `main` executa lint e build e publica automaticamente no GitHub Pages.

Domínio de produção:

```text
https://isamonteiro.com.br
```

O arquivo `public/CNAME` mantém o domínio customizado associado ao projeto. Os registros DNS do domínio raiz e de `www` são gerenciados na Cloudflare.
