import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Olá, {user?.name}</h1>
          <p>Bem-vindo ao AquaMind</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Sair
        </button>
      </header>

      <div className="cards">
        <Link to="/desafios" className="card">
          <h2>Desafios</h2>
          <p>Conclua ações sustentáveis e ganhe pontos.</p>
        </Link>

        <Link to="/ranking" className="card">
          <h2>Ranking</h2>
          <p>Veja sua posição entre os usuários.</p>
        </Link>
      </div>
    </div>
  );
}