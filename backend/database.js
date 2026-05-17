const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Tiago",
    email: "tiago@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    completedChallenges: [1, 2, 3],
  },
  {
    id: 2,
    name: "Ana",
    email: "ana@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    completedChallenges: [1, 4, 5, 6],
  },
  {
    id: 3,
    name: "Carlos",
    email: "carlos@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    completedChallenges: [1, 2],
  },
];

const challenges = [
  { id: 1, title: "Tomar banho em menos de 5 minutos", points: 50 },
  { id: 2, title: "Fechar a torneira ao escovar os dentes", points: 30 },
  { id: 3, title: "Reutilizar água da chuva", points: 80 },
  { id: 4, title: "Não usar mangueira para limpar calçadas", points: 90 },
  { id: 5, title: "Lavar roupa com máquina cheia", points: 60 },
  { id: 6, title: "Consertar vazamentos", points: 70 },
  { id: 7, title: "Usar balde para lavar o carro", points: 40 },
  { id: 8, title: "Economizar água ao lavar louça", points: 50 },
];

module.exports = {
  users,
  challenges,
};