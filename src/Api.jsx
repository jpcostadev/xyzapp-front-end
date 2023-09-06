// URL base da API
export const API_URL = "https://igrcode.com.br/apixyz/json";

// Função que gera uma requisição POST para obter um token de autenticação
export function TOKEN_POST(body) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

// Função que gera uma requisição POST para validar um token de autenticação
export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// Função que gera uma requisição POST para criar um novo usuário
export function USER_POST(body) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

// Função que gera uma requisição GET para buscar informações de um usuário
export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// Função que gera uma requisição GET para buscar informações de limites de serviço
export function LIMIT_GET(token) {
  return {
    url: API_URL + "/api/servico",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

// Função que gera uma requisição POST para criar um novo limite de serviço
export function LIMIT_POST(body) {
  return {
    url: API_URL + "/api/servico",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

// Função que gera uma requisição POST para criar um novo serviço
export function SERVICO_POST(body, token) {
  return {
    url: API_URL + "/api/servico",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  };
}

// Função que gera uma requisição GET para buscar informações de serviços
export function SERVICO_GET(token, id) {
  return {
    url: `${API_URL}/api/servico?usuario_id=${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}
export function POST_GET(id) {
  return {
    url: `${API_URL}/api/servico?${id}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
}

// Busca as postagens de um usuário específico
export function SERVICO_GET_ALL() {
  return {
    url: `${API_URL}/api/user/posts`,
    options: {
      method: "GET",
    },
  };
}

// API PARA VERIFICAR CEP
export async function BUSCAR_CEP(cep) {
  const urlCep = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await fetch(urlCep);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o CEP:", error);
    return null;
  }
}

/*
Neste código:

É definida a URL base da API como API_URL.

As funções de requisição HTTP são exportadas como módulos. Essas funções retornam objetos contendo a URL da API, opções de solicitação e outras informações necessárias para realizar as solicitações.

TOKEN_POST gera uma solicitação POST para obter um token de autenticação, TOKEN_VALIDATE_POST gera uma solicitação POST para validar um token, USER_POST cria um novo usuário, USER_GET busca informações de um usuário, LIMIT_GET busca informações de limites de serviço, LIMIT_POST cria um novo limite de serviço, SERVICO_POST cria um novo serviço, SERVICO_GET busca informações de serviços e SERVICO_GET_ALL busca informações de todos os serviços.

Cada função define a URL da API correspondente e as opções de solicitação necessárias, como método HTTP, cabeçalhos e corpo (quando aplicável).

Estas funções são úteis para realizar solicitações HTTP na API a partir de vários componentes da sua aplicação, mantendo o código organizado e reutilizável. Elas são utilizadas em diferentes partes do código para realizar diferentes tipos de solicitações.
*/
