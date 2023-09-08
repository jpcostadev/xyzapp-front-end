import React, { useEffect, useContext, useState } from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "../user/UserHeader.module.css";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../userContext";
import useFetch from "../../Hooks/useFetch";
import { LIMIT_GET, USER_GET } from "../../Api";
import useMedia from "../../Hooks/useMedia";
import FeedModal from "../feed/FeedModal";
import FeedPost from "../feed/FeedPost";

/**
 * Componente de cabeçalho do usuário.
 */
const UserHeader = () => {
  // Estado para armazenar o título da página
  const [title, setTitle] = React.useState("");

  // Obtém a localização atual da rota
  const location = useLocation();

  // Obtém os dados do usuário do contexto
  const { data: userData, setData } = useContext(UserContext);

  // Hook personalizado para fazer requisições HTTP
  const { data, error, loading, request } = useFetch();

  // Define o título da página com base na localização atual

  const mobile = useMedia("(max-width: 800px");

  React.useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      case "/conta/anunciar":
        setTitle("Criar um anúncio");
        break;
      default:
        setTitle("Meus Anúncios");
    }

    // Atualiza o título se a localização for "/conta/estatisticas"
    if ("/conta/estatisticas" === location.pathname) setTitle("Estatísticas");

    // Obtém o token de autenticação do usuário
    const token = window.localStorage.getItem("token");

    // Cria a URL e as opções para a requisição GET usando a função USER_GET
    const { url, options } = USER_GET(token);

    // Faz a requisição HTTP para obter os dados do usuário
    request(url, options);
  }, [location, request]);

  // Efeito colateral que pode ser usado para verificar se os dados do usuário foram atualizados
  useEffect(() => {
    // Implemente a lógica de verificação, se necessário
  }, [data]);

  return (
    <header className={styles.header}>
      <h1 className="titulo">{title}</h1>
      {!mobile ? (
        <span className={styles.containerPlanoAtivo}>
          <p className={styles.plano}>
            Plano Ativo:{" "}
            <span>{data ? data.plano_ativo : "Carregando..."}</span>
          </p>
          <p className={styles.plano}>
            Postagens:{" "}
            <span>
              {data
                ? data.contador_postagens + "/" + data.limite_postagens
                : "Carregando..."}
            </span>
          </p>
          <p className={styles.plano}>
            Tempo Restante:{" "}
            <span>
              {data
                ? `${data.tempo_restante} ${
                    data.tempo_restante === 1 ? "Dia" : "Dias"
                  }`
                : "Carregando..."}
            </span>
          </p>
        </span>
      ) : (
        ""
      )}

      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;

/*
Aqui está o que o componente UserHeader faz:

Mantém um estado title para armazenar o título da página.

Usa o hook useLocation para obter a localização atual da rota.

Usa o contexto UserContext para obter os dados do usuário.

Usa o hook personalizado useFetch para realizar requisições HTTP.

Usa o hook useEffect para definir o título da página com base na localização atual.

Faz uma requisição HTTP para obter os dados do usuário usando a função USER_GET e atualiza o estado data com os dados obtidos.

Implementa um efeito colateral (outro useEffect) que pode ser usado para verificar se os dados do usuário foram atualizados.

Renderiza o cabeçalho do usuário com o título da página, informações do plano ativo, contagem de postagens e tempo restante.

Renderiza o componente UserHeaderNav para a navegação do usuário.

Os comentários explicam cada parte do código, o que facilita a compreensão do que o componente faz e como funciona.
*/
