import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  function onAction(formData: FormData) {
    alert(formData.get("email"))
    alert(formData.get("password"))
  }
  return (
    <form action={onAction} className="w-full flex flex-col  gap-4">
      <Input
        name="email"
        required
        legend="E - mail"
        placeholder="Digite seu E-mail"
      />
      <Input
        name="password"
        required
        type="password"
        legend="Senha"
        placeholder="Digite sua senha"
      />
      <Button isLoading={isLoading} type="submit">
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar Conta
      </a>
    </form>
  );
}
