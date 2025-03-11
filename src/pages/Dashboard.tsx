import { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem, RefundItemProps } from "../components/RefundItem";
import { Pagination } from "../components/Pagination";
import searchSvg from "../assets/search.svg";
import { CATEGORIES } from "../utils/categories";
import { formatCurrency } from "../utils/formatCurrency";

import { api } from "../services/api";
import { AxiosError } from "axios";

const REFUND_EXAMPLE = {
  id: "123",
  name: "Styven",
  category: "Trasporte",
  amount: formatCurrency(34.4),
  categoryImg: CATEGORIES["transport"].icon,
};

const PER_PAGE = 5;
export function Dashboard() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [refund, setRefund] = useState<RefundItemProps[]>([]);

  async function fetchRefunds() {
    try {
      const response = await api.get<RefundsPaginationAPIResponse>(
        `/refunds?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`
      );
      setRefund(
        response.data.refunds.map((refund)=>({
            id: refund.id,
            name: refund.user.name,
            category: refund.name,
            amount: formatCurrency(refund.amount),
            categoryImg: CATEGORIES[refund.category].icon
        }))
      )


      setTotalPage(response.data.pagination.totalPages)
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError){
        return alert(error.response?.data.message)
      }
    }
    
  }

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalPage) {
        return prevPage + 1;
      }
      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }
      return prevPage;
    });
  }

  useEffect(() => {
    fetchRefunds();
  }, []);
  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="ícone do pesquisar" className="w-5" />
        </Button>
      </form>
      <div className="my-6 flex flex-col gap-4 maz-h-[342px] overflow-y-scroll max-h-[342px]">
        {refund.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
        ))}
      </div>
      <Pagination
        current={page}
        total={totalPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
