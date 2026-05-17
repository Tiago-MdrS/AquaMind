import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isRegister && !name.trim()) {
      alert("Informe seu nome.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert("Informe e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      if (isRegister) {
        await register(name, email, password);
        alert("Conta criada com sucesso! Agora faça login.");
        setIsRegister(false);
        setName("");
        setPassword("");
        return;
      }

      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>AquaMind</h1>
        <p>Economize água, complete desafios e suba no ranking.</p>

        <div className="auth-tabs">
          <button
            type="button"
            className={!isRegister ? "active" : ""}
            onClick={() => setIsRegister(false)}
          >
            Entrar
          </button>

          <button
            type="button"
            className={isRegister ? "active" : ""}
            onClick={() => setIsRegister(true)}
          >
            Cadastrar
          </button>
        </div>

        {isRegister && (
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Carregando..."
            : isRegister
            ? "Criar conta"
            : "Entrar"}
        </button>
      </form>
    </div>
  );
}