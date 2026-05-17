import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRanking } from "../services/api";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function loadRanking() {
      const data = await getRanking();
      setRanking(data.ranking || []);
      setCurrentUser(data.currentUser);
    }

    loadRanking();
  }, []);

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Voltar</Link>

      <h1>Ranking</h1>

      {currentUser && (
        <div className="current-user">
          Sua posição: <strong>{currentUser.position}º</strong> —{" "}
          <strong>{currentUser.score}</strong> pontos
        </div>
      )}

      <div className="list">
        {ranking.map((user) => (
          <div className="ranking-card" key={user.id}>
            <strong>
              {user.medal} {user.position}º - {user.name}
            </strong>
            <span>{user.score} pontos</span>
          </div>
        ))}
      </div>
    </div>
  );
}