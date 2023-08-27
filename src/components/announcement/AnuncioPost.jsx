import React from "react";
import styles from "./AnuncioPost.module.css";
import Input from "../forms/Input";
import Select from "../forms/Select";

const AnuncioPost = () => {
  const [selectedOption, setSelectedOption] = React.useState("");

  const options = [
    { value: "option1", label: "Opção 1" },
    { value: "option2", label: "Opção 2" },
    { value: "option3", label: "Opção 3" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
  }
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className={`${styles.anuncioPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Titulo" type="text" name="nome" />
        <Input label="Descrição" type="text" name="descricao" />
        <div>
          <h1>Categoria</h1>
          <Select options={options} onChange={handleSelectChange} />
          <p>Opção selecionada: {selectedOption}</p>
        </div>
      </form>
    </section>
  );
};

export default AnuncioPost;
