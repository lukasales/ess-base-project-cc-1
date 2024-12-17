# Bem-vindo ao ESS Base Project! 🗂  🛠

Este projeto serve como ponto de partida para o desenvolvimento de aplicações utilizando os *frameworks* de *backend* e *frontend* escolhidos pela equipe.

---

## Sobre o Projeto

O Projeto Base de ESS utiliza o conceito de ***[Subtrees]('https://www.atlassian.com/br/git/tutorials/git-subtree')*** do Git para integrar dois repositórios separados, um para o *backend* e outro para o *frontend*. Esses repositórios são clonados dentro deste projeto, em pastas separadas, permitindo o desenvolvimento simultâneo das camadas de *frontend* e *backend*.


## Passo a Passo 🚶

### Crie um *Fork* 

Se você ainda não tem, faça um *fork* **[deste repositório](https://github.com/Software-Engineering-Assistantship/ess-base-project)** para a sua conta do GitHub.

### Clone o seu *Fork* 

Clone o repositório forkado para o seu ambiente de desenvolvimento local.
### Instale o *Python 3* 🐍

Certifique-se de ter o *Python* instalado em seu sistema. Se necessário, faça o download e a instalação do *Python* em https://www.python.org/.

### Abra o seu projeto localmente 💻

Abra o terminal e navegue até o diretório do seu projeto base.

### Escolha os *Frameworks* 📝

Para prosseguir com a criação do projeto base, é importante que você e sua equipe tenham decidido previamente quais *frameworks* de *backend* e *frontend* serão utilizados. 

#### *Frameworks* Suportados:

- ***Frontend*:** React ⚛️, Angular 🅰️, Vue.js 🔥 e Next.js 🇳
- ***Backend*:** NodeJS 🚀 e FastAPI ⚡️

Certifique-se de que todos estejam alinhados na escolha dos *frameworks* antes de prosseguir com o processo de criação do projeto. Isso garantirá que você esteja utilizando as tecnologias desejadas e poderá aproveitar ao máximo o potencial oferecido por cada *framework* selecionado.

### Crie o Projeto Base 📁

Para criar o projeto, execute o comando abaixo:
```sh
pip install inquirer && python3 ./config/cli.py

```
ou, caso o comando ```python3``` não exista em sua máquina, execute:

```sh
pip install inquirer && python ./config/cli.py
```

Esse comando instalará a biblioteca [inquirer](https://python-inquirer.readthedocs.io/en/latest/) e executará o arquivo cli.py localizado na pasta config. A partir desse momento, você terá acesso a um processo interativo que irá guiá-lo durante a configuração do projeto.

### Comece a desenvolver! 🚀

Comece a desenvolver sua aplicação utilizando esse projeto base como ponto de partida!
Após a conclusão do processo de criação, o projeto já estará estruturado com os diretórios de *backend* e *frontend* separados. Cada um desses projetos é baseado nos *frameworks* que você escolheu, e eles contêm um arquivo README com instruções detalhadas sobre como configurar e executar cada um deles. Portanto, é altamente recomendado que você leia os respectivos READMEs para obter as informações necessárias. Não deixe essa etapa de lado, pois os READMEs fornecerão orientações valiosas para começar a trabalhar nos projetos de *backend* e *frontend* com facilidade.

*Que a força esteja com vocês! 🪐💪✨*

---
## Contribuindo 🤝

Se você tiver sugestões de melhorias ou encontrar problemas no projeto base, sinta-se à vontade para abrir uma issue neste repositório. Sua contribuição é valiosa para aprimorarmos continuamente o projeto.
# ESS Front-end React

This is the Front-end base project in React for the Software and Systems Engineering discipline, offered by the Informatics Center (CIn) of the Federal University of Pernambuco (UFPE).

## Table of Contents

1. [Getting Started](##getting-started)
2. [Running the tests](#running-the-tests)
3. [Scripts](#scripts)
4. [Dependencies](#dependencies)
5. [Architecture](#architecture)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you'll need to have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

### Installing

Clone the repository and install the dependencies by running the following command in the project directory:

```
npm install
```

### First time running ?

Run the follow scripts

```
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

```
npm run
```

### Environment

This project uses `.env` files to manage environment variables. You can create a `.env.development` file in the project directory and set the environment variables in the file (iou can create it from .`env.example`). The `env` script in the `package.json` file uses the `env-cmd` package to load the environment variables from the `.env.development` file.

### Running the App

To start the app, run the following command:

```
npm run dev
```

This command will run the React app in development with Vite.js script

## Running the tests

There are two types of tests configured in the base project: unit tests using Vitest with React Testing Library and E2E acceptance tests using Cypress with Cucumber. It's interesting to create the **.env.testing** at the root of the project the same way it was created to run in development, changing the necessary values.

To run unit tests

```
npm run test
```

To run E2E tests in **interactive mode**

```
npm run cy:e2e-interactive
```

To run E2E tests in **headless mode**

```
npm run cy:e2e-headless
```

**Note:** To run E2E tests that test flows that involve connecting to the back-end, such as login, the back-end must be running. Remember to provide a valid URL for the backend in the **.env.testing** file.

## Scripts

The following scripts are available in the `package.json` file:

- `dev`: Runs the app in development mode.
- `build`: Compiles the TypeScript code.
- `test`: Runs the Vitest tests for the project.
- `prettier`: Formats the code using Prettier.
- `lint`: Lints the code using ESLint.

## Dependencies

The following dependencies are used in the project:

- [vite](https://github.com/microsoft/TypeScript): Vite is a new breed of frontend build tooling that significantly improves the frontend development experience.
- [react](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.
- [react-router-dom](https://github.com/remix-run/react-router): React Router is a lightweight, fully-featured routing library for the React JavaScript library.
- [react-hook-form](https://github.com/react-hook-form/react-hook-form): React Hook Form is a library for React that simplifies form validation and input data handling.
- [zod](https://github.com/colinhacks/zod): Zod is a TypeScript-first schema declaration and validation library. I'm using the term "schema" to broadly refer to any data type, from a simple string to a complex nested object.

## Architecture

To understand and learn more details about the structure of the project, click [here](./docs/architecture-pattern.md) to be redirected to the README that contains this information.
