# User Scheduler

Projeto de TCC do curso de Pós-Graduação em Desenvolvimento Full Stack da PUCRS.

Este projeto tem como objetivo criar um sistema de agendamento para usuários em um ambiente de computação em servidores.

## Instalação

Este projeto é um sistema MERN (MongoDB, Express, React, Node.js). Para executar o projeto, é necessário ter o Node.js e o MongoDB instalados.

O MongoDB foi utilizado com a imagem oficial de Docker para mongodb.

Recomendo a utilização de uma rede interna para os containers, para que os serviços consigam se comunicar. Para tanto, basta que seja executado o seguinte comando:

```bash
podman network create user-scheduler
```

E, ao criar os containers, utilizar a flag `--network user-scheduler` para que os containers sejam criados na rede interna.

```bash
podman run --network user-scheduler --name mongodb -p 27017:27017 -v mongodb:/data/db mongo:latest
```

Para construir as imagens do projeto, basta executar o comando:

```bash
cd client
podman build -t user-scheduler-client .
cd ../server
podman build -t user-scheduler-server .
```

E, para executar os containers, basta executar o comando:

```bash
# cliente
podman run -d --network user-scheduler --name user-scheduler-client -p 3000:3000 --env REACT_APP_SERVER=localhost --env REACT_APP_SERVER_PORT=5000 user-scheduler-client

# servidor
podman run -d --network user-scheduler --name user-scheduler-server -p 5000:5000 -v config:/app/config user-scheduler-server
```
Atenção para o container do cliente. O endereço do servidor deve ser um endereço acessível do local onde o cliente abre o navegador.