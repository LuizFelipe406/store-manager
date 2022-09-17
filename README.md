# Boas-vindas ao repositório do Projeto Store Manager
A API construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. foi utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API é RESTful e segue o modelo arquitetural MSC.

# Como rodar:
### 👉 Com Docker

**:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo.

:information_source: Clone o Repositório com o comando `git clone git@github.com:luizfelipe406/store-manager.git`

:information_source: Entre na pasta do repositório que você acabou de clonar:
  - `cd store-manager`
 
:information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d`.

:information_source: Use o comando `docker exec -it store_manager bash` e sigas passos abaixo.

- Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

> :information_source: Instale as dependências com `npm install`

> :information_source: Para iniciar o projeto -> `npm install`

> :information_source: Para Verificar a cobertura de testes -> `npm run test:mocha`

<!-- Olá, Tryber!

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->
