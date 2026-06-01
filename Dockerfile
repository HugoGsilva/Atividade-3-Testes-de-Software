# Imagem leve Alpine
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

RUN apk add --no-cache python3 make g++

# Copia apenas os manifests primeiro (cache eficiente)
COPY package*.json ./

# Instala dependências sem gerar lock novamente
RUN npm ci

# Copia o restante do código
COPY . .

# Porta exposta
EXPOSE 3000

# Healthcheck leve usando o próprio Node (sem curl/wget extra)
HEALTHCHECK --interval=60s \
  --timeout=30s \
  --start-period=120s \
  --retries=5 \
  CMD node -e "require('http').get('http://localhost:3000/livros', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Comando padrão: sobe a API
CMD ["node", "src/server.js"]
