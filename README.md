# Gerenciador de Clientes - Front-end

Este projeto é o front-end de uma aplicação React para gestão de clientes, desenvolvida com Vite, React Router e Bootstrap. A interface permite incluir, listar, visualizar e editar cadastros de clientes, com dados simulados em um mock local.

## Funcionalidades

- Cadastro de novos clientes
- Listagem com busca por nome
- Visualização detalhada de clientes
- Edição de dados cadastrais
- Feedback visual para carregamento e ausência de resultados
- Navegação entre páginas com rotas configuradas

## Tecnologias utilizadas

- React
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js 18 ou superior
- npm

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/cesaracvazs-lab/puc-rio-mvp2-frontend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd puc-rio-mvp2-frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível no navegador em:

```text
http://localhost:5173
```

## Estrutura principal

- src/components: componentes reutilizáveis como header, formulário e cards
- src/pages: páginas da aplicação
- src/routes: configuração das rotas
- src/mocks: dados simulados e camada de mock da API

## Observação

As operações de leitura e escrita são simuladas com dados locais para fins de demonstração do MVP.
