import Topo from "@/components/Topo/Topo";

export default function Carteira(){
    return(
        <div className="bebas-neue-regular min-h-screen flex justify-center items-center bg-[#9ACFCB]">
            <Topo />
            <div className="div-container flex flex-col align-center justify-center h-[600px] container mx-auto bg-[#D2EDEB] mt-20 mb-52">
                <h1 className="text-[110px] tracking-[45px] text-[#02b4a4] text-center"> SALDO: 00,00</h1>
                <div className="tarefas-input flex justify-center items-center">
                    <p className="px-[40px]">+</p>
                    <input 
                        type="number" 
                        placeholder="DIGITE UM VALOR..."
                    />
                    <p className="px-[45px]">-</p>
                </div>
            </div>
        </div>
    );
}