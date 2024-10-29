"use client";

import { signIn } from "next-auth/client";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Utiliza la función signIn de NextAuth
    const result = await signIn("credentials", {
      redirect: false, // No redirige automáticamente al login exitoso
      email,
      password,
    });

    if (result.error) {
      setError(result.error); // Mostrar el error en caso de que falle el login
    } else {
      window.location.href = "/"; // Redirige si el login es exitoso
    }
  };
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
