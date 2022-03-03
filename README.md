# Convertendo uma api criada em Programação Funcional (PF) para Programação Orientada a Objetos (POO)

Esse projeto foi criado para poder demonstrar como é a modificação de uma api construída em programação funcional para a programação orientada a objetos. O projeto foi estruturado de forma que somente a solução (pasta `app`) sofra evolução visto que o express é uma biblioteca externa e a mesma já trabalha com programação funcional. Também serão aplicados ao logo das mudanças (definidas pelas branches) conceitos como injeção de dependência e solid.

# Dependências

- [Visual Studio Code](https://code.visualstudio.com/download)
- [NodeJS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)

# Início rápido

O projeto foi criado em typescript sobre o NodeJS utilizando como banco de dados o MySQL. Para fazer a inicialização do ambiente será necessário ter uma instância do MySQL rodando e, para isso aconselhamos a criação da mesma usando o Docker através do comando abaixo:

```bash
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root --restart=always -d mysql:5
```

Caso já tenha uma instância do mysql rodando como um serviço ou como uma imagem do docker e queira usá-la, você deve criar um arquivo `.env` na pasta root conforme o arquivo abaixo:

```
DB_HOST="127.0.0.1"
DB_PORT="3306"
DB_NAME="api-fp2oop"
DB_USER="root"
DB_PASS="root"
```

Para facilitar o processo de criação do banco de dados e inserir alguma informação, foi criado um script de migração. para utilizá-lo execute o comando `npm db:create`. 

# Sobre o projeto

Será construída uma API RESTFul em Typescript para fazer o CRUD de `users`, utilizando o [express.js](https://expressjs.com/pt-br/) para prover as rotas, o [joi](https://joi.dev) para validações e o MySQL para persistência dos dados. 

As evoluções do projeto serão marcadas através das mudanças entre as branches. Cada mudança entende-se como uma evolução gradual. 

O projeto inicialmente será criado com a arquitetura MSC (Model-Service-Controller) para que possamos apresentar a evolução do mesmo. A seguir estão as branches que serão criadas no projeto junto com o link de cada uma:

- [01-configuracao-do-ambiente](https://github.com/leandroluk/api-fp2oop/tree/01-configuracao-do-ambiente)
- [02-projeto-minimo-msc-express](https://github.com/leandroluk/api-fp2oop/tree/02-projeto-minimo-msc-express)
- [03-aplicando-boas-praticas](https://github.com/leandroluk/api-fp2oop/tree/03-aplicando-boas-praticas)
- [04-extraindo-dependencia-express](https://github.com/leandroluk/api-fp2oop/tree/04-extraindo-dependencia-express)
- [05-tranformando-aplicacao-oop](https://github.com/leandroluk/api-fp2oop/tree/05-tranformando-aplicacao-oop)
- [06-aplicando-injecao-de-dependencia](https://github.com/leandroluk/api-fp2oop/tree/06-aplicando-injecao-de-dependencia)
- [07-otimizando-injecao-de-dependencia](https://github.com/leandroluk/api-fp2oop/tree/07-otimizando-injecao-de-dependencia)
