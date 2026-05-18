# 💧 AquaMind

Sistema web desenvolvido para incentivar a economia de água através de desafios sustentáveis, pontuação e ranking entre usuários.

---

# 📸 Visão Geral

O AquaMind permite que usuários:

- Criem contas
- Realizem login seguro
- Completem desafios ecológicos
- Acumulem pontos
- Participem de um ranking global
- Acompanhem seu progresso

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- Vite
- React Router DOM
- CSS3

## Backend

- Node.js
- Express
- JWT (JSON Web Token)
- bcryptjs
- Firebase Firestore
- Firebase Admin SDK

---

# 📂 Estrutura do Projeto

```bash
Aquamind/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── firebase.js
│   ├── server.js
│   ├── .env
│   └── serviceAccountKey.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
🔐 Funcionalidades
👤 Autenticação
Cadastro de usuários
Login seguro
Senhas criptografadas com bcrypt
Autenticação via JWT
🏆 Ranking

O sistema calcula automaticamente a pontuação dos usuários com base nos desafios concluídos.

Medalhas:
🥇 1º Lugar
🥈 2º Lugar
🥉 3º Lugar
🌱 Desafios

O sistema possui desafios sustentáveis com diferentes pontuações.

Desafio	Pontos
Tomar banho em menos de 5 minutos	50
Fechar a torneira ao escovar os dentes	30
Reutilizar água da chuva	80
Não usar mangueira para limpar calçadas	90
Lavar roupa com máquina cheia	60
Consertar vazamentos	70
Usar balde para lavar o carro	40
Economizar água ao lavar louça	50
🔥 Firebase

O banco de dados utilizado é o Firebase Firestore.

Configuração
1. Criar projeto Firebase

Acesse:

https://console.firebase.google.com/

2. Ativar Firestore Database
Criar banco de dados
Escolher modo de teste
Selecionar região
3. Gerar chave privada
Configurações do projeto
Contas de serviço
Gerar nova chave privada

Coloque o arquivo baixado em:

backend/serviceAccountKey.json
⚙️ Variáveis de Ambiente

Crie um arquivo .env dentro de backend/.

PORT=3333
JWT_SECRET=aquamind_secret
▶️ Executando o Projeto

Backend
cd backend
npm install
npm run dev

Servidor:

http://localhost:3333

Frontend
cd frontend
npm install
npm run dev

Aplicação:

http://localhost:5173

🔑 Rotas da API
Auth
Método	Rota	Descrição
POST	/api/auth/register	Cadastro
POST	/api/auth/login	Login
Challenges
Método	Rota	Descrição
GET	/api/challenges	Listar desafios
POST	/api/challenges/:id/complete	Concluir desafio
Ranking
Método	Rota	Descrição
GET	/api/ranking	Ranking global

🛡️ Segurança
JWT Authentication
Senhas criptografadas
Middleware de autenticação
Rotas privadas

🎯 Objetivo do Projeto

Promover conscientização ambiental e incentivar hábitos sustentáveis através da gamificação.