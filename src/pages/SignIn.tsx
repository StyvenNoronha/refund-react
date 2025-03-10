import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useActionState } from "react";
import { z, ZodError } from "zod";

const signInSchema = z.object({
  email: z.string().email({ message: "e-mail invalido" }),
  password: z.string().trim().min(1, { message: "informe a senha" }),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onAction, null);

  async function onAction(prevState: any, formData: FormData) {
    try {
      const data = signInSchema.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      return { message: "nao foi possível entrar" };
    }
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

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>
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
