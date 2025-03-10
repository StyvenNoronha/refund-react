import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useActionState } from "react";


export function SignIn() {
    const [state, formAction,isLoading] = useActionState(onAction, null)

  async function onAction(prevState: any,formData: FormData) {
      const email = formData.get("email")
      const password = formData.get("password")

      alert(email)
      alert(password)

      await new Promise((resolve)=>{

      })
  }


  return (
    <form action={formAction} className="w-full flex flex-col  gap-4">
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
