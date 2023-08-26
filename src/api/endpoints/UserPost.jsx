import { func } from "prop-types";
import React from "react";

const UserPost = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [sobrenome, setSobrenome] = React.useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://igrcode.com.br/apixyz/json/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            nome,
            sobrenome,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Erro na chamada à API: ${response.status}`);
      }

      console.log("Dados Recebidos", data);
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

      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />

      <input
        placeholder="nome"
        type="text"
        value={nome}
        onChange={({ target }) => setNome(target.value)}
      />

      <input
        placeholder="sobrenome"
        type="text"
        value={sobrenome}
        onChange={({ target }) => setSobrenome(target.value)}
      />

      <button onSubmit={handleSubmit}>Enviar</button>
    </form>
  );
};

export default UserPost;
