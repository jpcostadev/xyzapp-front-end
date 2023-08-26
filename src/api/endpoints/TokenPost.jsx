import { func } from "prop-types";
import React from "react";
import { json } from "react-router-dom";

const TokenPost = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://igrcode.com.br/apixyz/json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      const data = await response.json();
      setToken(data.token);

      if (!response.ok) {
        throw new Error(`Erro na chamada à API: ${response.status}`);
      }

      console.log("Dados Recebidos", data.token);
    } catch (error) {
      console.error("Erro na chamada à API:", error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />

      <button onSubmit={handleSubmit}>Enviar</button>
      <p style={{ wordBreak: "break-all" }}>{token}</p>
    </form>
  );
};

export default TokenPost;
