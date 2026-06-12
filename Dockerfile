# Etapa 1: Construcción y dependencias
FROM node:20-alpine AS builder

# Instalar pnpm globalmente en el contenedor
RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml* ./

# Instalar TODAS las dependencias (incluyendo devDependencies para compilar si es necesario)
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Etapa 2: Producción (Imagen ultra ligera)
FROM node:20-alpine AS runner

RUN npm install -g pnpm
WORKDIR /app

# Definir entorno de producción
ENV NODE_ENV=production

# Copiar desde la etapa de construcción solo lo necesario
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

# Exponer el puerto que usa tu Node (ejemplo: 3000)
EXPOSE 3000

# Comando para arrancar la aplicación
CMD ["pnpm", "start"]