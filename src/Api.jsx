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

// Função que gera uma requisição POST para criar um novo serviço
export function SERVICO_POST(body) {
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

// Função que gera uma requisição GET para buscar informações de serviços
export function SERVICO_GET(token) {
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
