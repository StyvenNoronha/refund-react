import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import fileSvg from "../assets/file.svg";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { data, useNavigate, useParams } from "react-router";

import { api } from "../services/api";
import { Axios, AxiosError } from "axios";

import { z, ZodError } from "zod";
import { formatCurrency } from "../utils/formatCurrency";
const refundSchema = z.object({
  name: z.string().min(3, { message: "informe o nome" }),
  category: z.string().min(1, { message: "informe a categoria" }),
  amount: z.coerce
    .number({ message: "informe o valor válido" })
    .positive({ message: "informe o valor válido" }),
});

export function Refund() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filename, setFilename] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [fileURL, setFileURL] = useState<string | null>(null)
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);
      
      if(!filename){
        alert("colocar o comprovante")
      }else{
        const fileUploadForm = new FormData()
        fileUploadForm.append("file",filename)
        const response = await api.post("/uploads", fileUploadForm)
        const data = refundSchema.parse({
          name,
          category,
          amount: amount.replace(",", "."),
        });
  
        await api.post("/refunds", { ...data, filename: response.data.filename });
      }

      




      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("não foi possível realizar a solicitação");
    } finally {
      setIsLoading(false);
    }
  }


  async function feachRefund(id:string) {
    try {
      const response = await api.get<RefundAPIResponse>(`/refunds/${id}`)
      setName(response.data.name)
      setCategory(response.data.category)
      setAmount(formatCurrency(response.data.amount))
      setFileURL(response.data.filename)
    } catch (error) {
      console.log(error)
      if(error instanceof AxiosError){
        return alert(error.response?.data.message)
      }
      alert("não foi possível carregar ")
    }
  }

  useEffect(()=>{
    if(params.id){
      feachRefund(params.id)
    }
  },[params.id])

  return (
    <form
      onSubmit={onSubmit}
      action=""
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso
        </p>
      </header>
      <Input
        required
        legend="Nome da solicitação "
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />
      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>
        <Input
          type="string"
          legend="Valor"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>
      {params.id ? (
        <a
          className="flex text-sm text-green-100  font-semibold items-center justify-center gap-2 my-6 hover:opacity-75 transition ease-linear"
          href="https://www.google.com"
          target="_blank"
        >
          <img src={fileSvg} alt="ícone de arquivo" />
          Abrir o comprovante
        </a>
      ) : (
        <Upload
          filename={filename && filename.name}
          onChange={(e) => e.target.files && setFilename(e.target.files[0])}
          disabled={!!params.id}
        />
      )}

      <Button isLoading={isLoading} type="submit">
        {params.id ? "Voltar" : "Enviar"}
      </Button>
    </form>
  );
}
