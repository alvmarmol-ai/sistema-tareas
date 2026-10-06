# Mi Proyecto Next.js en Docker 🐳

Aplicación web creada con Next.js y contenerizada con Docker para garantizar un entorno de desarrollo consistente, aislado y portable.

## 📋 Requisitos previos

- Tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y ejecutándose.

## 🚀 Construir la imagen del contenedor

Ejecuta el siguiente comando en la raíz del proyecto:

bash
docker build -t mi-pagina-nextjs .


## 🟢 Ejecutar el contenedor

Inicia la aplicación con:

bash
docker run -p 3000:3000 mi-pagina-nextjs


Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación funcionando.