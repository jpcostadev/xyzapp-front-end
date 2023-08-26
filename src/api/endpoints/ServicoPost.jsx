import { func } from "prop-types";
import React from "react";

const ServicoPost = () => {
  const [token, setToken] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [tipo, setTipo] = React.useState("");
  const [cep, setCep] = React.useState("");
  const [files, setFiles] = React.useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("tipo", tipo);
    formData.append("cep", cep);

    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i]);
    }

    try {
      const response = await fetch(
        "https://igrcode.com.br/apixyz/json/api/servico",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        placeholder="Token"
        value={token}
        onChange={({ target }) => setToken(target.value)}
      />

      <input
        type="text"
        placeholder="Titulo"
        value={titulo}
        onChange={({ target }) => setTitulo(target.value)}
      />

      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={({ target }) => setTipo(target.value)}
      />

      <input
        type="text"
        placeholder="Desc"
        value={descricao}
        onChange={({ target }) => setDescricao(target.value)}
      />

      <input
        type="text"
        placeholder="cep"
        value={cep}
        onChange={({ target }) => setCep(target.value)}
      />

      <input
        type="file"
        multiple
        onChange={({ target }) => {
          console.log(target.files); // Verifique os arquivos selecionados no console
          setFiles(target.files);
        }}
      />

      <button onSubmit={handleSubmit}>Enviar</button>
    </form>
  );
};

export default ServicoPost;
