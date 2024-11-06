
import Link from "next/link";
import Image from 'next/image';


export default function Premium() {
    return(
        <div className="bebas-neue-regular min-h-screen bg-gradient-to-t from-[#175651] to-[#02B4A4]">
            <Link href={'/Perfil'}>
                <Image 
                src="/arrow.png" 
                alt="ARROW"       
                width={100}
                height={50}
                />
            </Link>
            <div className="flex gap-[2%] justify-center">
                <div className="div-premium box-shadow-lg bg-[#C1F4CE] pt-12 text-center flex flex-col items-center w-[30%] mb-40">
                    <h1 className="text-[#044915] text-[10rem] tracking-widest leading-none">FREE</h1>
                    <p className="text-[#48A15E] text-[3rem] tracking-wide leading-none">R$00,00</p>
                    <ul className="text-left mt-5">
                        <li className="flex text-[#7FAA65] text-[2.2rem] ">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            adição limitada de 5 metas
                        </li>
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            
                            />
                            adição limitada de 5 tarefas
                        </li>
                        <li className="flex text-[#BE4A31] text-[2.2rem]">
                            <Image 
                            src="/close.png" 
                            alt="close"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            dicas ilimitadas
                        </li>
                        <li className="flex text-[#BE4A31] text-[2.2rem]">
                            <Image 
                            src="/close.png" 
                            alt="close"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            anúncios free
                        </li>
                    </ul>
                    <button className="text-[6rem] mt-[12.3rem] text-[#34904B] bg-[#044915] w-full rounded-b-[30px] duration-100 hover:text-[#044915] hover:bg-[#34904B]">
                        QUERO!
                    </button>
                </div>

                <div className="div-premium2 box-shadow-lg bg-[#B2FFC6] pt-12 text-center flex flex-col items-center w-[30%] mb-40">
                    <h1 className="text-[#02B42E] text-[10rem] tracking-wide leading-none">PREMIUM</h1>
                    <p className="text-[#239D41] text-[3rem] tracking-wide leading-none">R$50,00</p>
                    <ul className="text-left mt-5">
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            adição ilimitada metas
                        </li>
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            adição ilimitada tarefas
                        </li>
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            dicas ilimitadas
                        </li>
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            acesso a conteúdos exclusivos
                        </li>
                        <li className="flex text-[#7FAA65] text-[2.2rem]">
                            <Image 
                            src="/done.png" 
                            alt="done"       
                            width={40}
                            height={10}
                            className=" mr-2"
                            />
                            anúncios free
                        </li>
                    </ul>
                    <button className="text-[6rem] mt-36 text-[#78EA94] bg-[#009F28] w-full rounded-b-[30px] duration-100 hover:text-[#009F28] hover:bg-[#78EA94]">
                        QUERO!
                    </button>
                </div>
            </div>
            
        </div>
    );
}