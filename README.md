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

## [01 - Configuração do ambiente](https://github.com/leandroluk/api-fp2oop/tree/01)

Nesse passo é feita a configuração mínima para a criação de uma aplicação em typescript que utiliza como padrão um modelo de regras básico, personalizável e de acordo com as melhores práticas para typescript: [eslint-config-standard-with-typescript](https://www.npmjs.com/package/eslint-config-standard-with-typescript). 

Além disso, para que possamos utilizar a importação de arquivos através dos path's do typescript, também é feito uso da biblioteca [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths). Essa lib faz a leitura dos paths declarados no arquivo do typescript e então já faz a resolução sem erros inclusive ao fazer o build da solução.

## [02 - Exemplo de projeto mínimo utilizando Typescript + Express + Joi + MySQL](https://github.com/leandroluk/api-fp2oop/tree/02-projeto-minimo-msc-express)

Nesse passo, o projeto desenvolvido aplica o padrão MSC (Model-Service-Controller) onde o Model cuida de gerenciar o banco de dados, o Service mantém todas as regras de negócio da solução e o Controller faz a interface da API. Além disso também foram adicionados outras pastas como:

- `errors`: para manter todos os erros personalizados na aplicação. Como boa prática é interessante mapear os possíveis erros.
- `validations`: para manter todas as validações necessárias ao receber as informações do frontend.

Também existe um arquivo centralizador que serve para declaração dos tipos da aplicação, o `domain.ts`

## [03 - Aplicando boas práticas à utilização de bibliotecas externas](https://github.com/leandroluk/api-fp2oop/tree/03-aplicando-boas-praticas)

Para que possamos aplicar as boas práticas à nossa aplicação sem que haja a dependência do express, a mesma é desacoplada em 2 camadas sendo as rotas e os controllers. Isso se mostra necessário pois existem outras formas de se formar uma API (ex: graphql) e outras formas de se chamar a aplicação como a utilização de filas (ex: rabbitmq), outros protocolos como o gRPC e afins. Toda solução deve ser construída de forma que possa extraír uma biblioteca sem impactar no todo.

## [04 - Extraindo camada de api da aplicação](https://github.com/leandroluk/api-fp2oop/tree/04-extraindo-camada-api-da-aplicacao)

Pensando ainda em otimização da solução, aqui nós extraímos todo o código da nossa solução que é acessado através da API RESTful. Isso é importante pois caso eu queira seguir com o raciocínio do item 3, utilizando minha solução também com um RabbitMQ como por exemplo, ele não deve se misturar ao código comum da API visto que são 2 contextos diferentes mas ele deve acessar minha solução.

## [05 - Transformando aplicação em Orientação a Objetos (OOP)](https://github.com/leandroluk/api-fp2oop/tree/05-tranformando-aplicacao-oop)

A solução foi construída com constantes onde os recursos são métodos dentro destes objetos para demonstrar como uma classe pode ser tratada em um ambiente modular. Para a conversão da mesma basta fazer a transformação em classes e adicionar instâncias das mesmas onde for necessário

## [06 - Aplicando injeção de dependência](https://github.com/leandroluk/api-fp2oop/tree/06-aplicando-injecao-de-dependencia)

Pensando em SOLID, um dos principais conceitos para um "código limpo" seria a inversão (ou injeção) de dependência. A idéia é que para a classe funcionar você passe a mesma o que ela precisa fazer. Assim é possível criar múltiplas formas de utilização da mesma sem a necessidade de alterá-la.

## [07 - Melhorando a injeção de dependência](https://github.com/leandroluk/api-fp2oop/tree/07-otimizando-injecao-de-dependencia)

Em Typescript podemos fazer a injeção utilizando a bibliteca [TypeDI](https://github.com/typestack/typedi) assim como é feito em outras linguagens.
