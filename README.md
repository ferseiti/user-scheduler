# User Scheduler

Projeto de TCC do curso de Pós-Graduação em Desenvolvimento Full Stack da PUCRS.

Este projeto tem como objetivo criar um sistema de agendamento para usuários em um ambiente de computação em servidores.

## Instalação

Este projeto é um sistema MERN (MongoDB, Express, React, Node.js). Para executar o projeto, é necessário ter o Node.js e o MongoDB instalados.

O MongoDB foi utilizado com a imagem oficial de Docker para mongodb. Para executar o MongoDB com Podman:

```bash
podman run --name mongodb -p 27017:27017 -v mongodb:/data/db mongo:latest
```