# 📝 Blog Platform

Uma plataforma de blog desenvolvida com React.js, JavaScript e Firebase, permitindo a criação, publicação e gerenciamento de artigos em uma interface moderna, dinâmica e responsiva.

## 🚀 Tecnologias utilizadas

- **React.js** — Biblioteca utilizada para construção da interface e gerenciamento dos componentes.
- **JavaScript (ES6+)** — Linguagem principal utilizada no desenvolvimento da aplicação.
- **Firebase** — Backend como serviço (BaaS), utilizado para autenticação, armazenamento e gerenciamento de dados.
- **CSS3** — Estilização e desenvolvimento de uma interface responsiva.

## ✨ Funcionalidades

- [x] Interface dinâmica e responsiva.
- [x] Cadastro e autenticação de usuários.
- [x] Login e logout.
- [x] Criação e publicação de artigos.
- [x] Listagem de artigos publicados.
- [x] Visualização individual de artigos.
- [x] Edição de artigos.
- [x] Exclusão de artigos.
- [x] Gerenciamento de conteúdo.
- [x] Integração com Firebase.

## 📂 Estrutura do projeto

```text
miniblog/
├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Pré-requisitos

Antes de começar, você precisará ter instalado:

- [Node.js](https://nodejs.org/)
- npm ou outro gerenciador de pacotes.
- Uma conta no [Firebase](https://firebase.google.com/).

### 2. Clone o repositório

```bash
git clone https://github.com/XsJota/miniblog.git
```

### 3. Acesse a pasta do projeto

```bash
cd miniblog
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Configure o Firebase

Crie um projeto no Firebase Console e configure os serviços utilizados pela aplicação.

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

Configure também as regras de segurança dos serviços Firebase utilizados.

**Importante:** as variáveis de ambiente disponibilizadas no frontend não são segredos. A segurança dos dados deve ser garantida por regras adequadas do Firebase e pelas configurações de acesso.

### 6. Execute a aplicação

```bash
npm run dev
```

A aplicação estará disponível no endereço indicado pelo terminal, geralmente:

```text
http://localhost:5173
```

## 🔐 Segurança

A aplicação utiliza os recursos de segurança disponibilizados pelo Firebase, incluindo:

- Autenticação de usuários.
- Regras de segurança para controle de acesso aos dados.
- Proteção das operações de leitura e escrita.
- Gerenciamento de permissões conforme as regras definidas no projeto.

## 🎯 Objetivo do projeto

O objetivo deste projeto foi desenvolver uma aplicação completa de blog, colocando em prática conceitos de desenvolvimento frontend, integração com serviços backend, autenticação de usuários, gerenciamento de dados e construção de interfaces dinâmicas.

## 👨‍💻 Autor

Desenvolvido por **Jhonnatan**.

- GitHub: [@XsJota](https://github.com/XsJota)
- LinkedIn: [Meu perfil](https://www.linkedin.com/in/jhonnatan-costa-15b174286/)

---

⭐ Se você gostou do projeto, considere deixar uma estrela no repositório!
