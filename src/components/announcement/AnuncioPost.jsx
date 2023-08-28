import React from "react";
import styles from "./AnuncioPost.module.css";
import Input from "../forms/Input";
import Select from "../forms/Select";
import TextArea from "../forms/TextArea";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { SERVICO_POST } from "../../Api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Error from "../forms/Error";
import { useNavigate } from "react-router-dom";

const AnuncioPost = () => {
  const [selectedOption, setSelectedOption] = React.useState("");
  const [outrosValue, setOutrosValue] = React.useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState("");
  const MAX_PHOTOS = 6; // Defina o número máximo de fotos
  const titulo = useForm();
  const descricao = useForm();
  const categoria = useForm();
  const [files, setFiles] = React.useState([]);
  const { data, error, loading, request } = useFetch();
  console.log(data);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate("/conta");
    }
  }, [data, navigate]);

  const options = [
    { value: "", label: "Selecione a categoria" },
    { value: "advogado", label: "Advogado" },
    { value: "aricultor", label: "Agricultor" },
    { value: "almoxarife", label: "Almoxarife" },
    { value: "acupunturista", label: "Acupunturista" },
    { value: "alfaiate", label: "Alfaiate" },
    { value: "arquiteto", label: "Arquiteto" },
    { value: "babá", label: "Babá" },
    { value: "barbeiro", label: "Barbeiro" },
    { value: "bartender", label: "Bartender" },
    { value: "carpinteiro", label: "Carpinteiro" },
    { value: "cabeleireiro", label: "Cabeleireiro" },
    { value: "chaveiro", label: "Chaveiro" },
    { value: "costureira", label: "Costureira" },
    { value: "cozinheiro", label: "Cozinheiro(a)" },
    { value: "diarista", label: "Diarísta" },
    { value: "designergráfico", label: "Designer Gráfico" },
    { value: "eletricista", label: "Eletricista" },
    { value: "encanador", label: "Encanador" },
    { value: "esteticista", label: "Esteticista" },
    { value: "fisioterapeuta", label: "Fisioterapeuta" },
    { value: "fotógrafo", label: "Fotógrafo" },
    { value: "jardineiro", label: "Jardineiro" },
    { value: "manicure", label: "Manicure" },
    { value: "massagista", label: "Massagista" },
    { value: "nutricionista", label: "Nutricionista" },
    { value: "pedreiro", label: "Pedreiro" },
    { value: "personal-trainer", label: "Personal Trainer" },
    { value: "pintor", label: "Pintor" },
    { value: "psicólogo", label: "Psicólogo" },
    { value: "tatuador", label: "Tatuador" },
    { value: "outros", label: "outros" },
  ];

  function handleSubmit(event) {
    if (files.length === 0) {
      // Nenhuma foto foi enviada, exiba uma mensagem de erro para o usuário.
      alert("Pelo menos uma foto é necessária para enviar o anúncio.");
    } else {
      // Pelo menos uma foto foi enviada, continue com o envio dos dados do anúncio.
      // Aqui você pode chamar a função que envia os dados para o servidor.
      event.preventDefault();
      const formData = new FormData();
      formData.append("titulo", titulo.value);
      formData.append("descricao", descricao.value);
      formData.append("categoria", categoria.value);
      formData.append("outros", outrosValue);
      for (let i = 0; i < files.raw.length; i++) {
        formData.append(`foto${i}`, files.raw[i]);
      }

      formData.append(
        "categoria",
        categoriaSelecionada !== "outros" ? categoriaSelecionada : outrosValue,
      );
      const token = window.localStorage.getItem("token");
      const { url, options } = SERVICO_POST(formData, token);
      request(url, options);
    }
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(event.target.value);
    setCategoriaSelecionada(selectedValue);
  };

  return (
    <section className={`${styles.anuncioPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Titulo" type="text" name="titulo" required {...titulo} />

        <TextArea
          label="Descrição"
          name="descricao"
          rows={6}
          cols={60}
          placeholder="Digite sua descrição aqui..."
          {...descricao}
        />

        <div>
          <p className={styles.label}>Categoria</p>
          <Select
            name="categoria"
            required
            className={styles.select}
            options={options}
            onChange={handleSelectChange}
          />

          {selectedOption.toLowerCase() === "outros" ? null : (
            <p className={styles.label}>Opção selecionada: {selectedOption}</p>
          )}

          {selectedOption.toLowerCase() === "outros" ? (
            <div>
              <Input
                className={styles.outros}
                type="text"
                label="Escolha a categoria"
                name="outrosValue"
                value={outrosValue}
                onChange={(e) => setOutrosValue(e.target.value)}
                required
              />
            </div>
          ) : null}
        </div>

        <label className={styles.labelforfile}>
          Add Fotos
          <input
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              // Verificar se algum arquivo foi selecionado
              if (!e.target.files.length) {
                return;
              }

              // Verificar o número de fotos selecionadas ao adicionar fotos
              if (
                e.target.files.length + (files.raw ? files.raw.length : 0) >
                MAX_PHOTOS
              ) {
                alert("Você só pode selecionar até 6 fotos.");
                return;
              }

              // Adicionar as fotos selecionadas
              setFiles((prevFiles) => ({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: [
                  ...(prevFiles.raw ? prevFiles.raw : []),
                  ...e.target.files,
                ],
              }));
            }}
            multiple
          />
        </label>
        <p className={styles.fotosLimite}>
          Máximo 6 fotos, Dimensão (Recomendado 1080 x 1080)
        </p>

        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Anunciar</Button>
        )}
        <Error>{error}</Error>
      </form>
      <div>
        {files.raw && files.raw.length > 0 && (
          <Carousel className={styles.containerPreview}>
            {Array.from(files.raw)
              .slice(0, MAX_PHOTOS) // Use slice para limitar a quantidade de fotos
              .map((file, index) => (
                <div key={index}>
                  <img
                    className={styles.preview}
                    src={URL.createObjectURL(file)}
                    alt={`Slide ${index}`}
                  />
                </div>
              ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default AnuncioPost;
