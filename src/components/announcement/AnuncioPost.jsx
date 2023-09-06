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
import ContainerMid from "../global/ContainerMid";
import GeolocationApp from "../localizacao/geolocation";

const AnuncioPost = () => {
  // Estado para armazenar a opção selecionada no formulário
  const [selectedOption, setSelectedOption] = React.useState("");

  // Estado para armazenar a categoria selecionada
  const [categoriaSelecionada, setCategoriaSelecionada] = React.useState("");

  // Estado para controlar o limite máximo de postagens
  // const [postLimitExceeded, setPostLimitExceeded] = useState(false);

  // Define o número máximo de fotos

  // Hooks personalizados para o gerenciamento de campos de formulário
  const titulo = useForm();
  const categoria = useForm();

  // Obtém o contexto de usuário
  const { getUser } = useContext(UserContext);

  // Hook de requisição HTTP personalizado
  const { data, error, setError, loading, setLoading, request } = useFetch();
  // Hook para navegação em rotas
  const navigate = useNavigate();
  // Opções de categorias para o select
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [selectedSubcategoria, setSelectedSubcategoria] = React.useState("");

  const turnos = [
    { value: "manha", label: "Manhã" },
    { value: "tarde", label: "Tarde" },
    { value: "noite", label: "Noite" },
    { value: "24horas", label: "24 Horas" },
  ];
  const categorias = [
    {
      label: "Selecione o Serviço",
      subcategorias: ["Selecione o Serviço"],
    },
    {
      label: "Arte e Cultura",
      subcategorias: [
        "Artista Plástico",
        "Dublador(a)",
        "Escritor(a) e Redator(a)",
        "Fotógrafo(a) de Arte",
        "Guia Turístico",
        "Historiador(a) da Arte",
        "Músico(a) de Rua",
      ],
    },

    {
      label: "Automotivo",
      subcategorias: [
        "Eletricista Automotivo",
        "Funileiro",
        "Instalador de Som Automotivo",
        "Lavagem e Polimento",
        "Mecânico de Automóveis",
        "Pintura Automotiva",
        "Serviço de Guincho",
      ],
    },

    {
      label: "Beleza e Cuidados Pessoais",
      subcategorias: [
        "Barbeiro",
        "Cabeleireiro(a)",
        "Depilador(a)",
        "Esteticista",
        "Manicure e Pedicure",
        "Maquiador(a)",
        "Massoterapeuta",
        "Consultor(a) de Moda",
      ],
    },

    {
      label: "Construção Civil",
      subcategorias: [
        "Carpinteiro",
        "Encanador",
        "Eletricista",
        "Gesseiro",
        "Marceneiro",
        "Montador de Móveis",
        "Pedreiro",
        "Serralheiro",
        "Tapeceiro",
        "Telhadista",
        "Vidraceiro",
        "Serralheiro",
      ],
    },

    {
      label: "Culinária e Alimentação",
      subcategorias: [
        "Bartender",
        "Chef de Cozinha",
        "Churrasqueiro",
        "Confeiteiro(a)",
        "Consultor(a) de Alimentos",
        "Nutricionista",
        "Personal Chef",
        "Sommelier",
      ],
    },

    {
      label: "Educação e Aulas Particulares",
      subcategorias: [
        "Aulas de Artes",
        "Aulas de Música",
        "Coach de Estudos",
        "Preparador(a) para Concursos",
        "Professor(a) de Dança",
        "Professor(a) de Inglês",
        "Tutor(a) Acadêmico",
      ],
    },

    {
      label: "Eventos e Entretenimento",
      subcategorias: [
        "Bartender",
        "Buffet",
        "Decorador de Eventos",
        "DJ",
        "Fotógrafo",
        "Iluminação e Som",
        "Mestre de Cerimônias",
        "Organizador de Eventos",
        "Palhaços e Animadores",
        "Segurança de Eventos",
      ],
    },

    {
      label: "Saúde e Bem-Estar",
      subcategorias: [
        "Acupunturista",
        "Consultor(a) de Saúde",
        "Enfermeiro(a) Domiciliar",
        "Fisioterapeuta",
        "Massagista",
        "Personal Trainer",
        "Psicólogo(a)",
        "Quiropraxista",
        "Terapeuta Holístico",
      ],
    },
    {
      label: "Serviços Domésticos",
      subcategorias: [
        "Assistente Pessoal",
        "Babá",
        "Cuidador de Idosos",
        "Cozinheiro(a) Particular",
        "Dog Walker",
        "Faxineira",
        "Jardineiro",
        "Lavanderia",
        "Motorista Particular",
        "Personal Organizer",
      ],
    },
    {
      label: "Tecnologia e Informática",
      subcategorias: [
        "Analista de Dados",
        "Consultor(a) de TI",
        "Desenvolvedor(a) Web",
        "Designer Gráfico",
        "Especialista em Redes",
        "Especialista em Segurança Cibernética",
        "Programador(a)",
        "Suporte Técnico",
        "Técnico de Informática",
      ],
    },
    {
      label: "Limpeza e Organização",
      subcategorias: [
        "Organizador(a) Profissional",
        "Limpeza Pós-Obra",
        "Limpeza de Carpetes e Estofados",
        "Limpeza de Dutos de Ar Condicionado",
        "Limpeza de Vidros e Fachadas",
        "Serviço de Faxina Pesada",
        "Limpeza de Piscinas",
      ],
    },
    {
      label: "Design e Decoração",
      subcategorias: [
        "Designer de Interiores",
        "Consultor(a) de Decoração",
        "Paisagista",
        "Consultor(a) de Feng Shui",
        "Estilista de Eventos",
        "Consultor(a) de Moda",
      ],
    },
    {
      label: "Pets e Animais de Estimação",
      subcategorias: [
        "Groomer (Tosa e Banho)",
        "Treinador(a) de Cães",
        "Veterinário(a) Domiciliar",
        "Adestrador(a) de Gatos",
        "Pet Sitter",
        "Serviço de Creche para Cães",
        "Nutricionista de Pets",
      ],
    },
    {
      label: "Consultoria Financeira",
      subcategorias: [
        "Planejador(a) Financeiro",
        "Consultor(a) de Investimentos",
        "Contador(a) Pessoal",
        "Especialista em Impostos",
        "Consultor(a) de Finanças Pessoais",
        "Advogado(a) de Direito Financeiro",
      ],
    },
    {
      label: "Serviços Jurídicos",
      subcategorias: [
        "Advogado(a) de Família",
        "Advogado(a) Criminal",
        "Advogado(a) de Imigração",
        "Advogado(a) de Direito do Trabalho",
        "Advogado(a) de Direito Imobiliário",
        "Advogado(a) de Direito Empresarial",
        "Mediador(a) de Conflitos",
      ],
    },
    {
      label: "Marketing e Publicidade:",
      subcategorias: [
        "Consultor(a) de Marketing",
        "Social Media Manager",
        "Consultor(a) de SEO",
        "Copywriter",
        "Designer Gráfico para Marketing",
        "Analista de Dados de Marketing",
      ],
    },
    {
      label: "Transporte e Logística",
      subcategorias: [
        "Transportadora de Mudanças",
        "Motorista de Caminhão",
        "Transporte de Mercadorias",
        "Serviço de Entrega Rápida",
        "Serviço de Moto Frete",
        "Consultor(a) Logístico",
        "Aluguel de Veículos",
      ],
    },
  ];

  // Função para lidar com o envio do formulário
  async function handleSubmit(event) {
    event.preventDefault();

    const userData = await fetchUserData(
      request,
      navigate,
      setError,
      error,
      getUser,
      useFetch,
    );
    const turno_atendimento = turnosSelecionados.join(", "); // Junta os turnos selecionados em uma única string separada por vírgulas

    // Dentro da função handleSubmit
    const body = {
      titulo: titulo.value,
      categoria: selectedOption,
      sub_categoria: selectedSubcategoria,
      turno_atendimento: turno_atendimento,
      // email: userData.email || "",
      // whatsapp: userData.whatsapp || "",
      // telefone: userData.telefone || "",
    };

    // Desabilita o botão de envio
    setSubmitButtonDisabled(true);

    // Chama a função para fazer a postagem do anúncio
    fazerPostagemAnuncio(body, request, navigate, setError, loading);

    // Após o envio bem-sucedido, aguarde 3 segundos e reabilite o botão
    setTimeout(() => {
      setSubmitButtonDisabled(false);
    }, 3000);
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Defina a categoria selecionada
    setCategoriaSelecionada(selectedValue);

    // Se a categoria selecionada não for "Selecione a categoria", defina a subcategoria para vazio
    if (selectedValue !== "Selecione a categoria") {
      setSelectedSubcategoria("");
    }
  };

  useEffect(() => {
    // Define o título como a subcategoria selecionada
    if (selectedSubcategoria) {
      titulo.setValue(selectedSubcategoria);
    }
  }, [selectedSubcategoria, titulo]);

  // No início do componente, declaro um estado para armazenar as opções de turno selecionadas.
  const [turnosSelecionados, setTurnosSelecionados] = React.useState([]);

  const handleTurnoChange = (event, turnoValue) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Se o checkbox estiver marcado, adicione o valor do turno aos turnos selecionados.
      setTurnosSelecionados([...turnosSelecionados, turnoValue]);
    } else {
      // Se o checkbox estiver desmarcado, remova o valor do turno dos turnos selecionados.
      const updatedTurnos = turnosSelecionados.filter(
        (value) => value !== turnoValue,
      );
      setTurnosSelecionados(updatedTurnos);
    }
  };
  return (
    <ContainerMid>
      <div className={styles.mid}>
        <section className={`${styles.anuncioPost} animeLeft`}>
          <div className={styles.anuncio}>
            <h1>Anuncio</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Componente de input para o título */}
            <h5 className={`${styles.h5} subTitulo`}>Título</h5>
            <Input
              disabled
              name="titulo"
              {...titulo}
              value={selectedSubcategoria}
            />

            {/* Componente de input para a Categoria */}
            <div>
              <Select
                name="categoria"
                required
                className={styles.select}
                options={categorias.map((categoria) => ({
                  value: categoria.label,
                  label: categoria.label,
                }))}
                onChange={handleSelectChange}
              />

              {/* Verifique se categoriaSelecionada é definido corretamente */}
              <Select
                name="sub_categoria"
                required
                className={styles.select}
                options={
                  categoriaSelecionada
                    ? categorias
                        .find(
                          (categoria) =>
                            categoria.label === categoriaSelecionada,
                        )
                        ?.subcategorias.map((subcategoria) => ({
                          value: subcategoria,
                          label: subcategoria,
                        })) || []
                    : []
                }
                value={selectedSubcategoria}
                onChange={(event) =>
                  setSelectedSubcategoria(event.target.value)
                }
              />
            </div>

            <h5 className={`${styles.h5} subTitulo`}>Horários disponíveis</h5>

            <div className={styles.checkboxContainer}>
              {turnos.map((turno) => (
                <label className={styles.checkboxLabel} key={turno.value}>
                  <input
                    className={styles.customCheckbox}
                    type="checkbox"
                    value={turno.value}
                    checked={turnosSelecionados.includes(turno.value)}
                    onChange={(event) => handleTurnoChange(event, turno.value)}
                  />
                  {turno.label}
                </label>
              ))}
            </div>
            {/* Renderize o botão com base no estado de loading */}
            <Button type="submit" disabled={loading || submitButtonDisabled}>
              {loading || submitButtonDisabled ? "Enviando..." : "Anunciar"}
            </Button>
            {/* Exibe mensagem de erro, se houver */}
            {error && <Error error={error} />}
          </form>

          <div className={styles.anuncio}>
            <h1>Anuncio</h1>
          </div>
        </section>
      </div>
    </ContainerMid>
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
