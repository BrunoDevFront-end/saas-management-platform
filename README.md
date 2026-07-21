# Anonymous Feedback SaaS

> Plataforma Full Stack para criação e gerenciamento de formulários de feedback anônimo.

<div align="center">

<img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow?style=flat-square" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" />
<img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
<img src="https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=node.js" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql" />

</div>

---

## Sobre o projeto

O **Anonymous Feedback SaaS** é uma plataforma desenvolvida para permitir que empresas criem formulários e coletem feedbacks de forma anônima.

A aplicação possui um ambiente autenticado para gerenciamento dos formulários e um fluxo público para que usuários possam enviar seus feedbacks sem a necessidade de criar uma conta.

O projeto foi desenvolvido como uma aplicação Full Stack, com frontend, backend e banco de dados integrados, aplicando conceitos de autenticação, segurança, validação de dados e arquitetura de APIs.

---

## Funcionalidades

* Cadastro e autenticação de empresas
* Autenticação baseada em JWT
* Gerenciamento de formulários
* Ativação e desativação de formulários
* Página pública para envio de feedback
* Envio de feedbacks de forma anônima
* Avaliação por estrelas
* Dashboard para visualização dos dados
* Estatísticas de feedbacks
* Validação de dados no backend
* Proteção de rotas autenticadas
* Interface responsiva

---

## Tecnologias

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Styled Components
* Recharts
* Sonner
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* Zod
* JWT
* bcryptjs
* CORS

### Banco de dados

* PostgreSQL
* Prisma ORM

### Ferramentas

* Git
* GitHub
* REST API

---

## Arquitetura

A aplicação é dividida em três camadas principais:

```text
┌─────────────────────┐
│      Frontend       │
│  Next.js + React    │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│       Backend       │
│ Node.js + Express   │
└──────────┬──────────┘
           │
           │ Prisma ORM
           ▼
┌─────────────────────┐
│      Database       │
│     PostgreSQL      │
└─────────────────────┘
```

### Fluxo principal

```text
Empresa
   │
   ▼
Cadastro / Login
   │
   ▼
Dashboard
   │
   ▼
Criação do formulário
   │
   ▼
Link público
   │
   ▼
Usuário envia feedback anônimo
   │
   ▼
Feedback armazenado
   │
   ▼
Dashboard da empresa
```

---

## Segurança

O projeto possui algumas medidas de segurança implementadas no backend:

* Autenticação utilizando JWT
* Senhas protegidas com `bcryptjs`
* Middleware para proteção de rotas
* Validação de dados com Zod
* Verificação de autorização e propriedade dos recursos
* Configuração de CORS
* Separação entre rotas públicas e autenticadas

A autenticação e as regras de autorização são processadas no backend, garantindo que o acesso aos recursos protegidos não dependa apenas do frontend.

---

## Estrutura de dados

O modelo principal da aplicação é baseado em três entidades:

```text
Company
   │
   │ 1:N
   ▼
Form
   │
   │ 1:N
   ▼
Feedback
```

Uma empresa pode possuir vários formulários, enquanto cada formulário pode receber diversos feedbacks.

Essa estrutura permite organizar os dados de acordo com a empresa responsável pelo formulário e manter o fluxo de feedback anônimo para o usuário final.

---

## Como executar o projeto

### Pré-requisitos

* Node.js
* npm
* PostgreSQL

### Clone o repositório

```bash
git clone https://github.com/BrunoDevFront-end/saas-management-platform.git
```

```bash
cd saas-management-platform
```

### Instale as dependências

Execute a instalação nas aplicações frontend e backend.

```bash
npm install
```

### Configure as variáveis de ambiente

Crie os arquivos `.env` necessários para cada aplicação.

Exemplo:

```env
DATABASE_URL="sua_connection_string"
JWT_SECRET="sua_chave_secreta"
```

No frontend:

```env
NEXT_PUBLIC_API_URL="url_da_sua_api"
```

### Configure o Prisma

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

### Execute a aplicação

Inicie o frontend e o backend conforme os scripts configurados em cada projeto.

```bash
npm run dev
```

---

## Próximos passos

* [ ] Implementar rate limiting
* [ ] Adicionar testes automatizados
* [ ] Expandir as métricas do dashboard
* [ ] Melhorar os recursos de análise de feedback
* [ ] Aprimorar a personalização dos formulários
* [ ] Evoluir o sistema de autenticação
* [ ] Realizar novos ajustes de segurança
* [ ] Melhorar o tratamento de erros da API

---

## Status

O projeto está em **desenvolvimento ativo** e sendo utilizado como uma aplicação prática para evolução em desenvolvimento Full Stack.

Novos recursos e melhorias estão sendo implementados continuamente.

---

<div align="center">

**Desenvolvido por Bruno**

</div>
