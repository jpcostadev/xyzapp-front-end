import React, { useState } from "react";
import styles from "./Radio.module.css";

const Radio = ({ opcao1, opcao2 }) => {
  const [selectedOption, setSelectedOption] = useState(opcao1); // Defina a opção padrão como opcao1

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.container}>
        <label className={styles.input}>
          <input
            type="radio"
            name="option"
            value={opcao1}
            checked={selectedOption === opcao1}
            onChange={handleOptionChange}
          />
          {opcao1}
        </label>
        <label className={styles.input}>
          <input
            type="radio"
            name="option"
            value={opcao2}
            checked={selectedOption === opcao2}
            onChange={handleOptionChange}
          />
          {opcao2}
        </label>
      </div>
      <p>
        Opção selecionada: <span>{selectedOption}</span>
      </p>
    </div>
  );
};

export default Radio;
