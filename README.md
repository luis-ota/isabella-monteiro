# Isabella Monteiro | Portfólio de atriz

Portfólio de Isabella Monteiro para teatro e audiovisual. O site reúne trajetória, dados físicos, trabalhos selecionados, experiência de bastidores e contato profissional.

## Stack

- React 19 + Vite
- Motion para a composição fotográfica e transições de estado
- Phosphor Icons
- Archivo Variable + Caveat Brush, ambas servidas localmente
- Nginx em container sem privilégios para produção

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

Cada push na branch `main` executa lint e build e publica a imagem em:

```text
ghcr.io/luis-ota/isabella-monteiro:latest
```

No Acer, `docker-compose.server.yml` publica o Nginx apenas em `127.0.0.1:3101`. O túnel Cloudflare existente encaminha `isabella.wired.rs` para essa porta. O Watchtower já instalado no servidor acompanha o label do container e aplica novas imagens automaticamente.

Deploy ou atualização manual no servidor:

```bash
docker compose pull
docker compose up -d
```

Rollback por commit:

1. Troque `latest` no compose por uma tag SHA publicada pelo workflow.
2. Rode `docker compose up -d app`.

