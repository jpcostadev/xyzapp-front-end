import React from "react";
import { UserContext } from "../../userContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  // Obtém o estado de login do contexto do usuário
  const { login } = React.useContext(UserContext);

  // Se o usuário estiver autenticado (login === true), renderize os componentes filhos
  if (login === true) {
    return children;
  }
  // Se o usuário não estiver autenticado (login === false), redirecione para a página de login
  else if (login === false) {
    return <Navigate to={"/login"} />;
  }
  // Se o estado de login não estiver definido (login === null), não renderize nada (componente vazio)
  else {
    return <></>;
  }
};

export default ProtectedRouter;

/*
Neste código:

O componente ProtectedRouter recebe children como propriedade, que representa os componentes/filhos que devem ser renderizados se o usuário estiver autenticado.

É obtido o estado de login a partir do contexto do usuário (UserContext). O contexto do usuário deve conter uma variável login, que é true se o usuário estiver autenticado, false se não estiver autenticado e null se o estado de autenticação ainda estiver sendo verificado.

O componente verifica o estado de login:

Se o usuário estiver autenticado (login === true), ele renderiza os componentes filhos (ou seja, permite o acesso à rota protegida).
Se o usuário não estiver autenticado (login === false), ele redireciona o usuário para a página de login usando o componente Navigate do React Router.
Se o estado de login não estiver definido (login === null), ele não renderiza nada (componente vazio) até que o estado de autenticação seja verificado.
Este componente é útil para proteger rotas que requerem autenticação. Quando um usuário não autenticado tenta acessar uma rota protegida, ele é redirecionado para a página de login. Quando um usuário autenticado acessa a rota protegida, os componentes filhos são renderizados.
*/
