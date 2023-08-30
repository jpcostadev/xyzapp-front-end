import React from "react";
import styles from "./AnuncioPost.module.css";
import Input from "../forms/Input";
import Select from "../forms/Select";
import TextArea from "../forms/TextArea";
import Button from "../forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Error from "../forms/Error";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "./functions/fetchUserData";
import { fazerPostagemAnuncio } from "./functions/FazerPostagem";

const AnuncioPost = () => {
  // Estado para armazenar os arquivos de fotos selecionados
  const [files, setFiles] = React.useState([]);

  // Estado para armazenar a opção selecionada no formulário
  const [selectedOption, setSelectedOption] = React.useState("");

  // Estado para armazenar o valor inserido na categoria "outros"
  const [outrosValue, setOutrosValue] = React.useState("");

  // Estado para armazenar a categoria selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState("");

  // Estado para controlar o limite máximo de postagens
  // const [postLimitExceeded, setPostLimitExceeded] = useState(false);

  // Define o número máximo de fotos
  const MAX_PHOTOS = 3;

  // Hooks personalizados para o gerenciamento de campos de formulário
  const titulo = useForm();
  const descricao = useForm();
  const categoria = useForm();

  // Obtém o contexto de usuário
  const { getUser } = useContext(UserContext);

  // Hook de requisição HTTP personalizado
  const { data, error, setError, loading, request } = useFetch();
  // Hook para navegação em rotas
  const navigate = useNavigate();
  // Opções de categorias para o select
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

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();
    if (files.length === 0) {
      setError("Pelo menos uma foto é necessária para enviar o anúncio.");
    } else {
      // Realiza a verificação do usuário antes de fazer a postagem
      fetchUserData(request, navigate, setError, error, getUser, useFetch);

      // Cria um objeto FormData para enviar os dados do formulário
      const formData = new FormData();
      formData.append("titulo", titulo.value);
      formData.append("descricao", descricao.value);
      formData.append("categoria", categoria.value);
      formData.append("outros", outrosValue);

      // Adiciona as fotos selecionadas ao FormData
      for (let i = 0; i < files.raw.length; i++) {
        formData.append(`foto${i}`, files.raw[i]);
      }

      // Define a categoria com base na seleção ou no valor inserido em "outros"
      formData.append(
        "categoria",
        categoriaSelecionada !== "outros" ? categoriaSelecionada : outrosValue,
      );

      // Chama a função para fazer a postagem do anúncio
      fazerPostagemAnuncio(formData, request, navigate, error, setError);
    }
  }

  // Função para lidar com a mudança da opção no select de categoria
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(event.target.value);
    setCategoriaSelecionada(selectedValue);
  };

  return (
    <section className={`${styles.anuncioPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        {/* Componente de input para o título */}
        <Input label="Titulo" type="text" name="titulo" required {...titulo} />

        {/* Componente de input para a descrição */}
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
          {/* Componente de select para a categoria */}
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
              {/* Componente de input para inserir categoria personalizada */}
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
              // Verifica se algum arquivo foi selecionado
              if (!e.target.files.length) {
                return;
              }

              // Verifica o número de fotos selecionadas ao adicionar fotos
              if (
                e.target.files.length + (files.raw ? files.raw.length : 0) >
                MAX_PHOTOS
              ) {
                setError("Cada anúncio pode ter no máximo 3 fotos.");

                return;
              } else {
                // Adiciona as fotos selecionadas ao estado
                setError(null);
                setFiles((prevFiles) => ({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: [
                    ...(prevFiles.raw ? prevFiles.raw : []),
                    ...e.target.files,
                  ],
                }));
              }
            }}
            multiple
          />
        </label>
        <p className={styles.fotosLimite}>
          Máximo 6 fotos, Dimensão (Recomendado 1080 x 1080)
        </p>

        {/* Botão de envio do formulário */}
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Anunciar</Button>
        )}

        {/* Exibe mensagem de erro, se houver */}
        <Error error={error} />
      </form>
      <div>
        {/* Exibe as fotos selecionadas em um carousel */}
        {files.raw && files.raw.length > 0 && (
          <Carousel className={styles.containerPreview}>
            {Array.from(files.raw)
              .slice(0, MAX_PHOTOS) // Usa slice para limitar a quantidade de fotos
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

/*
Neste código:

Importam-se os componentes e hooks necessários, bem como estilos e outras dependências.

Define-se o componente AnuncioPost, que é uma parte do formulário de criação de anúncios.

Usam-se estados para controlar as opções selecionadas e os valores inseridos no formulário.

São criados objetos de hook para os campos de título, descrição e categoria.

O estado files é usado para armazenar as fotos selecionadas para o anúncio.

O hook useFetch é usado para fazer solicitações HTTP.

Usa-se o hook useNavigate para navegar para outras rotas.

Define-se o estado postLimitExceeded para controlar se o limite máximo de postagens foi excedido.

As opções de categoria são definidas em um array.

handleSubmit é uma função para lidar com o envio do formulário. Ela valida a entrada do usuário, faz uma verificação de limite de postagens e, em seguida, envia os dados do formulário.

handleSelectChange é uma função para lidar com a mudança na seleção de categoria.

O formulário é renderizado com campos de entrada, seleção de categoria e upload de fotos.

Um carousel é exibido para mostrar as fotos selecionadas.

Os componentes Input, TextArea, Select, Button, e Error são componentes personalizados usados para criar os elementos do formulário.

Este comentário deve ajudar a entender o que cada parte do código faz no componente AnuncioPost.
*/
