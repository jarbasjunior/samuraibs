# Cypress Samurai Barber Shop

  <!-- Projeto com a finalidade de mostrar os comando básicos do Cypress para interagir com elementos Web. Neste projeto foi utilizado uma aplicação chamada Samurai Barber Shop [Training Wheels](https://training-wheels-qaninja.herokuapp.com/), ministrado pelo instrutor [Fernando Papito](https://www.linkedin.com/in/papitoio). Curso disponível na plataforma da [QANinja](https://www.universocypress.com.br). -->

---

## Índice: 📋

- [Requisitos](#requisitos)

  - [Node.js e NPM](#nodejs-e-npm)
  - [Yarn](#yarn)

- [Configuração do ambiente](#ambiente)

  - [PostgreSQL na nuvem](#pg-cloud)
  - [Configuração de lints e commits](#libs-lint)
  - [Instalação dos pacotes da API](#libs-api)
  - [Instalação dos pacotes da Web](#libs-web)
  - [Instalação dos pacotes dos testes](#libs-tests)

- [Execução dos testes](#testes)

- [Inicialização do projeto de testes](#inicializacao)

  - [Yarn init](#yarn-init)
  - [Cypress](#cypress)
  - [eslint](#eslint)
  - [Eslint plugin](#eslint-plugin)
  - [Husky](#husky)

- [Pacotes utilizados no projeto de testes](#pacotes-utilizados)

  - [Faker](#faker)
  - [Pg](#pg)
  - [Moment](#moment)
  - [Moment Business Day](#moment-business-day)

---

## <a id="requisitos"/> Requisitos: ❗

* <a id="nodejs-e-npm"/> [Node.js e NPM](https://nodejs.org/en/download) - Node.js como ambiente de execução para criar e executar aplicações em Javascript. E o NPM para: instalação de pacotes, gerenciamento de versões e dependências.

* <a id="yarn"/> [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) - para instalação de pacotes, gerenciamento de versões e dependências.

## <a id="ambiente"/> Configuração do ambiente: 🛠️ </a>

* <a id="pg-cloud"/> **PostgreSQL na nuvem** - utilizamos o [Elephantsql](https://www.elephantsql.com) como serviço de banco de dados PostgreSQL na nuvem para armazenar os dados da aplicação que vamos testar.

  - Clique [aqui](https://www.elephantsql.com/plans.html) para acessar a página de planos do ElephanSQL e clique no botão **Try now for FREE**.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161061530-0801b384-66ce-4cab-8217-7a709723e7a9.png" width="250" height="400">
  </p>

  - Recomendamos fazer o login com a conta do Github, desta forma, clique no texto **Sign in with GitHub**.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161063361-3b717bcc-bd3a-4485-8d98-54205675b5a9.png" width="380" height="300">
  </p>

  - No step 1, preencha o campo `Name` com **SamuraiBS-Dev**, selecione **Tiny Turtle (Free)** na caixa de seleção `Plan` e clique no botão **Select Region**.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161068732-611c334d-7301-4fda-a874-a736820f40f7.png" width="600" height="300">
  </p>
  
  - No step 2, selecione **US-East-1 (Northern Virginia)** na caixa de seleção `Data center` e clique no botão **Review**.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161069265-8b1a6fe4-f4c4-43be-8420-07be2133f6ec.png" width="600" height="300">
  </p>

  - No último passo, revise os dados e clique no botão **Create Instance**.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161070739-4718da1b-8d55-4d5f-8031-5ef6abbb1dcc.png" width="600" height="300">
  </p>
  
  - Clique no link da instância criada (**SamuraiBS-Dev**), para visualizar seus detalhes.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161071197-7f93535a-641b-448d-b767-14da37f286da.png" width="900" height="150">
  </p>
  
  - A seguir iremos copiar as informações do banco de dados, tanto para o projeto da API como para o projeto de testes.

  <p align="center">
    <img src="https://user-images.githubusercontent.com/6724302/161085112-f3efb287-b18b-4c59-b5cf-c8cf97195e81.png" width="600" height="300">
  </p>
  
    - Renomeie o arquivo `samuraibs/tests/.env.sample` para `.env`;
    - Na instância do **SamuraiBS-Dev** copie o valor do campo `Server` e cole na variável `POSTGRES_HOST` dos arquivos: `samuraibs/apps/api/.env` e `samuraibs/tests/.env`;
    - Na instância do **SamuraiBS-Dev** copie o valor do campo `User & Default database` e cole nas variáveis `POSTGRES_USER` e `POSTGRES_NAME` dos arquivos: `samuraibs/apps/api/.env` e `samuraibs/tests/.env`;
    - Na instância do **SamuraiBS-Dev** copie o valor do campo `Password` e cole na variável `POSTGRES_PASS` dos arquivos: `samuraibs/apps/api/.env` e `samuraibs/tests/.env`;

* <a id="libs-lint"/> **Configuração de lints e commits** - pelo terminal, navegue até a pasta `samuraibs` e execute o comando `yarn install`, para instalar todas as dependências na raiz do projeto, as quais farão a checagem pre-commit via eslint.

* <a id="libs-api"/> **Instalação dos pacotes da API** - pelo terminal, navegue até a pasta `samuraibs/apps/api` e execute o comando `yarn install`, para instalar todas as dependências do projeto da API.

* <a id="libs-web"/> **Instalação dos pacotes da Web** - pelo terminal, navegue até a pasta `samuraibs/apps/web` e execute o comando `yarn install`, para instalar todas as dependências do projeto de Web.

* <a id="libs-tests"/> **Instalação dos pacotes dos testes** - pelo terminal, navegue até a pasta `samuraibs/tests` e execute o comando `yarn install`, para instalar todas as dependências do projeto de testes.

---
## <a id="testes"/> Execução dos testes: 🚀 </a>

* Pelo terminal, navegue até a pasta `tests` e execute o comando `yarn test`, para abrir a guia do Cypress e por ela executar os testes.

---
## <a id="inicializacao"/> Inicialização do projeto de testes: 🛣️ 🔫 </a>

* <a id="yarn-init"/> Yarn init - dentro da pasta `tests` execute o comando `yarn init` e responda as perguntas de acordo com o quadro abaixo:

    | <center>PERGUNTA</center> | RESPOSTA |
    |-----------|:-----------:|
    | <span style="color:magenta">question name (tests):</span> | <span style="color:cyan">samuraibs-tests</span>  |
    | <span style="color:magenta">question version (1.0.0):</span> | <span style="color:cyan">Tecle Enter para manter 1.0.0</span>  |
    | <span style="color:magenta">question description:</span> | <span style="color:cyan">Projeto de testes de aceitação E2E em Cypress</span>  |
    | <span style="color:magenta">question entry point (index.js):</span> | <span style="color:cyan">Tecle Enter para manter index.js</span>  |
    | <span style="color:magenta">question repository url:</span> | <span style="color:cyan">Tecle Enter</span>  |
    | <span style="color:magenta">question author:</span> | <span style="color:cyan">Seu nome e sobrenome</span>  |
    | <span style="color:magenta">question license (MIT):</span> | <span style="color:cyan">Tecle Enter</span>  |
    | <span style="color:magenta">question private:</span> | <span style="color:cyan">Tecle Enter</span>  |

* <a id="cypress"/> [Cypress](https://www.cypress.io) - como ferramenta de teste.

  * ### Instalação do Cypress ⚙️

    - Pelo terminal, navegue até a pasta `samuraibs/tests` e execute o comando `yarn add cypress -D` para instalar as dependências do **Cypress** na versão mais recente.
    - Em seguida, na pasta `samuraibs/tests` execute o comando `npx cypress open`.
    - Por fim, na pasta `samuraibs/tests` execute o comando `rm -r cypress/integration/**`, para remover pastas e arquivos criados por padrão pelo Cypress dentro da pasta `cypress/integration`

* ### Instalação eslint ⚙️

  - Na pasta raiz do projeto **samuraibs**, execute o comando `yarn add eslint -D` para instalar o eslint como uma dependência de desenvolvimento do projeto.
  
  - Na pasta raiz do projeto **samuraibs**, execute o comando `node_modules/.bin/eslint --init` abaixo para configurar o eslint, em seguida responda as seguintes perguntas abaixo, conforme respostas exibidas:

    | <center>PERGUNTA</center> | RESPOSTA |
    |-----------|:-----------:|
    | <span style="color:magenta">How would you like to use ESLint?</span> | <span style="color:cyan">To check syntax, find problems, and enforce code style</span>  |
    | <span style="color:magenta">What type of modules does your project use?</span> | <span style="color:cyan">CommonJS (require/exports)</span>  |
    | <span style="color:magenta">Which framework does your project use?</span> | <span style="color:cyan">None of these</span>  |
    | <span style="color:magenta">Does your project use TypeScript?</span> | <span style="color:cyan">No</span>  |
    | <span style="color:magenta">Where does your code run?</span> | <span style="color:cyan">Node (press `<a>` to toggle all)</span>  |
    | <span style="color:magenta">How would you like to define a style for your project?</span> | <span style="color:cyan">Use a popular style guide</span>  |
    | <span style="color:magenta">Which style guide do you want to follow?</span> | <span style="color:cyan">Airbnb: http://github.com/airbnb/javascript</span>  |
    | <span style="color:magenta">What format do you want your config file to be in?</span> | <span style="color:cyan">JSON</span>  |
    | <span style="color:magenta">Would you like to install them now with npm?</span> | <span style="color:cyan">Yes</span>  |

  - Execute o comando `yarn add eslint-plugin-cypress -D` para instalar o eslint específico para o Cypress no projeto.

  - No arquivo `.eslintrc.json` adicione as seguintes chaves:
    - Dentro da chave `env`, adicione mais uma para definir o plugin do Cypress como global:
      ```
      "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true,
        "cypress/globals": true
      }
      ```
    - Adicione à chave de plugins o valor do Cypress:
      ```
      "plugins": [
          "cypress"
      ]
      ```

  - Por fim, no arquivo `package.json`, adicione na chave `scripts`, os novo scripts: 
  
    - `"check-lint": "eslint tests/cypress/integration/**"`. Assim, quando for executado na raiz do projeto o comando `yarn check-lint`, serão verificados todos os arquivos dentro da pasta **cypress/integration** pelo eslint.

    - `"fix-lint": "eslint tests/cypress/integration/** --fix"`. Desta forma, quando for executado na raiz do projeto o comando `yarn fix-lint`, serão corrigidas as infrações que o eslint considera como autocorrigível de acordo com o *guide* Airbnb que foi configurado anteriomente.

* <a id="eslint-plugin"/> [Eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Plugin do eslint para o VSCode.


* <a id="husky"/> [Husky](https://www.npmjs.com/package/husky) - Para realização de tarefas antes do commit, por exemplo: varredura do lint e execução dos testes.

  * ### Instalação do Husky ⚙️ (apenas se seu projeto for um projeto já tiver inicializado com o git)

    - Execute o comando `yarn add husky@7.0.4 -D` para instalar as dependências do **Husky** no ambiente de desenvolvimento, na versão 7.0.4 sem atualização automática no futuro.

    - No arquivo `package.json` dentro da chave `script` adicione a chave `"prepare": "husky install"`

    - Agora, execute os comandos abaixo os quais irão realizar as seguintes tarefas:
      - Exeutar o script `prepare` para ativar o *hook* no *git*
      - Criar o arquivo `pre-commit`, no qual serão gravadas pelo **Husky** as tarefas a serem realizadas antes do *commit*.
        ```
        yarn prepare &&
        yarn husky add .husky/pre-commit "yarn check-lint" &&
        git add .husky/pre-commit
        ```

---
## <a id="pacotes-utilizados"/> Pacotes utilizados no projeto de testes: 📦 📚 </a>

* <a id="faker"/> [Faker](https://fakerjs.dev) - para geração de dados fictícios para teste.

  * ### Instalação do Faker ⚙️

    - Execute o comando `yarn add @faker-js/faker -D` para instalar as dependências do **Faker** na versão mais recente.

* <a id="pg"/> [Pg](https://www.npmjs.com/package/pg) - cliente para acessar o banco postgres da API via node.

  * ### Instalação do Postgresql ⚙️

    - Execute o comando `yarn add pg -D` para instalar as dependências do **Postgresql** na versão mais recente.

* <a id="moment"/> [Moment](https://github.com/moment/moment) - biblioteca utilizada para formatar datas em JavaScript.
  * ### Instalação do Moment ⚙️

    - Execute o comando `yarn add moment -D` para instalar as dependências do **Moment** na versão mais recente.

* <a id="moment-business-day"/> [Moment Business Day](https://github.com/kalmecak/moment-business-days) - biblioteca utilizada para verificar os dias úteis da semana.
  * ### Instalação do Moment Business Day ⚙️

    - Execute o comando `yarn add moment-business-days -D` para instalar as dependências do **Moment Business Day** na versão mais recente.
 