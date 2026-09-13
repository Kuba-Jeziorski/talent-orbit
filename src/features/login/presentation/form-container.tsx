import { useState, type FormEvent } from "react";
import { useLogin } from "../api/use-login";

export const FormContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col">
      <h1>form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};