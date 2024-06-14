# Projeto: Curso Udemy - Comunicação entre Microsserviços

Repositório contendo o projeto desenvolvido do curso Comunicação entre Microsserviços, ministrado por Victor Hugo Negrisoli para a plataforma Udemy.

Para acessar o curso na plataforma, basta acessar esta URL: https://www.udemy.com/course/comunicacao-entre-microsservicos/

## Tecnologias

* **Java 17**
* **Spring Boot 3.0.2**
* **Gradle 7.6**
* **Javascript ES6**
* **TypeScript** 
* **Node.js 18**
* **ES6 Modules**
* **Express.js**
* **MongoDB (Container e Cloud MongoDB)**
* **API REST**
* **PostgreSQL (Container)**
* **RabbitMQ (Container e CloudAMQP)**
* **Docker**
* **docker-compose**
* **JWT**
* **Spring Cloud OpenFeign**
* **Axios**

## Arquitetura Proposta

No curso, desenvolveremos a seguinte aquitetura:

![Arquitetura Proposta](https://github.com/vhnegrisoli/curso-udemy-comunicacao-microsservicos/blob/master/Conte%C3%BAdos/Arquitetura%20Proposta.png)

Teremos 3 APIs:

* **Auth-API**: API de Autenticação com Node.js 18, Express.js, Sequelize, PostgreSQL, JWT e Bcrypt.
* **Product-API**: API de Produtos com Java 17, Spring Boot, Spring Data JPA, PostgreSQL, validação de JWT, RabbitMQ e Spring Cloud OpenFeign para clients HTTP.
* **Sales-API**: API de Vendas com Node.js 18, Express.js, MongoDB, Mongoose, validação de JWT, RabbitMQ e Axios para clients HTTP.

Também teremos toda a arquitetura rodando em containers docker via docker-compose. O ideal não é manter as apis juntas no mesmo repositório mas isso facilita a verificação da coesão deste projeto  de estudos. 

### Fluxo de execução de um pedido

O fluxo para realização de um pedido irá depender de comunicações **síncronas** (chamadas HTTP via REST) e **assíncronas** (mensageria com RabbitMQ).

O fluxo está descrito abaixo:

* 01 - O início do fluxo será fazendo uma requisição ao endpoint de criação de pedido.
* 02 - O payload (JSON) de entrada será uma lista de produtos informando o ID e a quantidade desejada.
* 03 - Antes de criar o pedido, será feita uma chamada REST à API de produtos para validar se há estoque para a compra de todos os produtos.
* 04 - Caso algum produto não tenha estoque, a API de produtos retornará um erro, e a API de vendas irá lançar uma mensagem de erro informando que não há estoque.
* 05 - Caso exista estoque, então será criado um pedido e salvo no MongoDB com status pendente (PENDING).
* 06 - Ao salvar o pedido, será publicada uma mensagem no RabbitMQ informando o ID do pedido criado, e os produtos com seus respectivos IDs e quantidades.
* 07 - A API de produtos estará ouvindo a fila, então receberá a mensagem.
* 08 - Ao receber a mensagem, a API irá revalidar o estoque dos produtos, e caso todos estejam ok, irá atualizar o estoque de cada produto.
* 09 - Caso o estoque seja atualizado com sucesso, a API de produtos publicará uma mensagem na fila de confirmação de vendas com status APPROVED.
* 10 - Caso dê algum problema na atualização, a API de produtos publicará uma mensagem na fila de confirmação de vendas com status REJECTED.
* 11 - Por fim, a API de pedidos irá receber a mensagem de confirmação e atualizará o pedido com o status retornado na mensagem.

## Documentação dos endpoints

A documentação das APIs node podem ser encontradas em seus respectivos swaggers, que podem ser acessados pelo caminho /api/docs. A documentação da api em Java ainda será desenvolvida.


## Comandos Docker

Abaixo serão listados alguns dos comandos executados durante o curso para criação dos containers 
dos bancos de dados PostgreSQL, MongoDB e do message broker RabbitMQ:

#### Container Auth-DB

`docker run --name auth-db -p 5432:5432 -e POSTGRES_DB=auth-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:16.3`

#### Container Product-DB

`docker run --name product-db -p 5433:5432 -e POSTGRES_DB=product-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:16.3`

#### Container Sales-DB

`docker run --name sales-db -p 27017:27017 -p 28017:28017 -e MONGO_INITDB_ROOT_USERNAME="admin" -e MONGO_INITDB_ROOT_PASSWORD=123456 mongo:latest`

#### Conexão no Mongoshell

`mongo "mongodb://admin:123456@localhost:27017"`

#### Container RabbitMQ

`docker run --name sales-rabbit -p 5672:5672 -p 25676:25676 -p 15672:15672 rabbitmq:3-management`

### Execução docker-compose

`docker-compose up --build`

Para ignorar os logs, adicione a flag `-d`.

## Autor

### Victor Hugo Negrisoli
### Desenvolvedor de Software Back-End

## Aluno 
### Kelton Fonseca
### Engenheiro de Software
