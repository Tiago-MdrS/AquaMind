import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { completeChallenge, getChallenges } from "../services/api";

export default function Desafios() {
  const [challenges, setChallenges] = useState([]);

  async function loadChallenges() {
    const data = await getChallenges();
    setChallenges(data);
  }

  async function handleComplete(id) {
    try {
      await completeChallenge(id);
      await loadChallenges();
      alert("Desafio concluído com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    loadChallenges();
  }, []);

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Voltar</Link>

      <h1>Desafios</h1>

      <div className="list">
        {challenges.map((challenge) => (
          <div className="challenge-card" key={challenge.id}>
            <div>
              <h3>{challenge.title}</h3>
              <p>{challenge.points} pontos</p>
            </div>

            <button
              disabled={challenge.completed}
              onClick={() => handleComplete(challenge.id)}
            >
              {challenge.completed ? "Concluído" : "Concluir"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}