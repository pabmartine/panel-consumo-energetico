# Etapa de construcción
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN rm -rf node_modules package-lock.json
RUN npm install

# Construcción estática de Next.js
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:1.27.0-alpine

# Copiar archivos estáticos generados en "out" en la carpeta de Nginx
COPY --from=build /app/out /usr/share/nginx/html

# Copiar la configuración personalizada de Nginx
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
