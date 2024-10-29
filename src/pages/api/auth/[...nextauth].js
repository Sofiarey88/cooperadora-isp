import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (!res.ok) {
            throw new Error(user.error || "Credenciales incorrectas");
          }

          // el login es exitoso
          return user;
        } catch (error) {
          console.error("Error en la autenticación:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.nombre = user.nombre;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.nombre = token.nombre;
      return session;
    },
  },
};

export default NextAuth(authOptions);
