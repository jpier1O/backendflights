# Proyecto de Gestión de Vuelos

Este proyecto es un sistema de gestión de vuelos desarrollado con NestJS. Permite la gestión de vuelos, pasajeros y usuarios, incluyendo autenticación y autorización.

## Requisitos Previos

- Docker y Docker Compose
- Node.js y npm

## Instrucciones de Instalación

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
cd fligth-management
docker-compose up --build

-- Registrar un Usuario 
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "password": "testpassword"
}'


curl -X GET http://localhost:3000/flights \
-H "Authorization: Bearer YOUR_JWT_TOKEN"