import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

import { z, ZodError } from "zod";

//validação com zod
const signUpSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.string().email({ message: "E-mail invalido" }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 dígitos" }),
    passwordConfirm: z.string({ message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "as senhas não são iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      alert("nao foi possível cadastrar");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col  gap-4">
      <Input
        required
        legend="Nome"
        placeholder="Digite seu nome"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        required
        legend="E-mail"
        placeholder="Digite seu E-mail"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        required
        type="password"
        legend="Senha"
        placeholder="Digite sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        required
        type="password"
        legend="Confirme sua Senha"
        placeholder="Confirme sua senha"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button isLoading={isLoading} type="submit">
        Cadastrar
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho conta
      </a>
    </form>
  );
}
