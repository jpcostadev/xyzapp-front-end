// useAuthValidation.js

import { useState } from "react";

const useAuth = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const validateCredentials = () => {
    if (!credentials.username || !credentials.password) {
      setError("Por favor, preencha todos os campos.");
      return false;
    }
    setError(null);
    return true;
  };

  return {
    credentials,
    error,
    handleInputChange,
    validateCredentials,
  };
};

export default useAuth;
