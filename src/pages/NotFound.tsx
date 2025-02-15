export function NotFound(){
    return(
        <div  className="w-screen h-screen flex justify-center items-center flex-col ">
            <h1 className="text-gray-950 font-bold text-2xl mb-10">Essa página não existe</h1>
            <a href="/" className="font-semibold text-center text-green-100 hover:text-green-200 transition ease-linear"> Clique para voltar a página inicial</a>
        </div>
    )
}