FROM node:18-alpine as builder
WORKDIR /app

# Variables de build
ARG AUTH_BASE_URL
ARG API_BASE_URL

COPY package*.json ./
RUN npm install
COPY . .

# Reemplazar environment.prod.ts dinámicamente
RUN sed -i "s|AUTH_BASE_URL_PLACEHOLDER|$AUTH_BASE_URL|g" src/environments/environment.prod.ts && \
    sed -i "s|API_BASE_URL_PLACEHOLDER|$API_BASE_URL|g" src/environments/environment.prod.ts

RUN npm run build --prod

# Etapa 2: nginx
FROM nginx:alpine
COPY --from=builder /app/dist/isc-inventory-front/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]